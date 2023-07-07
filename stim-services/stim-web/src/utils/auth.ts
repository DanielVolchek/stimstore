import hash from "crypto-js/md5";
import { v4 as uuid } from "uuid";
import { User, Session, RentEvent } from "@prisma/client";

import prisma from "./prisma";
import baseURL from "./url";
import { userSchema } from "./zod";
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";

type SafeUser = Omit<User, "passwordHash"> & {
  rentEvent?: RentEvent | null;
};

const generateSession = () => {
  return uuid();
};

const hashPassword = (pass: string) => {
  return hash(pass).toString();
};

const getSessionByToken = async (token: string) => {
  const session = await prisma.session.findFirst({ where: { token } });
  return session;
};

const getUserBySession = async (session: Session) => {
  const user = await prisma.user.findFirst({
    where: {
      id: {
        equals: session.userID,
      },
    },
  });

  const valid = await validateSessionTime(session);
  if (!valid || !user) {
    return false;
  }

  return user;
};

const createSessionOnUser = async (user: User, sessionToken: string) => {
  await prisma.session.create({
    data: {
      token: sessionToken,
      userID: user.id,
      /* 1 month from now */
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      sessions: {
        connect: {
          token: sessionToken,
        },
      },
    },
  });
};

const validateSessionTime = async (session: Session) => {
  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.session.delete({ where: { id: session.id } });
    return false;
  }
  return true;
};

const unauthorizedResponse = (reason: string) => {
  throw new Error(reason);
};

const authenticationFlow = async (sessionToken: string | undefined) => {
  if (!sessionToken) {
    return unauthorizedResponse("No token provided");
  }

  const session = await getSessionByToken(sessionToken);
  if (!session) {
    return unauthorizedResponse("token invalid");
  }

  const user = await getUserBySession(session);
  if (!user) {
    return unauthorizedResponse("session invalid");
  }

  return user;
};

const getSessionHelper = async (
  sessionToken: string | undefined
): Promise<SafeUser | null> => {
  if (!sessionToken) {
    return null;
  }

  const headers = new Headers();
  headers.append(
    // "Set-Cookie",
    "Cookie",
    `session=${sessionToken};`
  );

  const res = await fetch(`${baseURL()}/api/user`, {
    method: "GET",
    headers,
  });
  const data = await res.json();

  const parse = userSchema.safeParse(data.user);
  if (parse.success) {
    return parse.data;
  }
  console.log(parse.error);
  return null;
};

const getUserSession = async (): Promise<SafeUser | null> => {
  let sessionToken;
  if (typeof window !== "undefined") {
    sessionToken = Cookies.get("session");
  } else {
    sessionToken = cookies().get("session")?.value;
  }

  return await getSessionHelper(sessionToken);
};

const LoginOrRegisterUser = async (
  req: NextRequest,
  type: "LOGIN" | "REGISTER"
) => {
  const body = await req.json();

  const { username, password } = body;

  let user: User | null | undefined;

  user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      rentEvent: type === "LOGIN",
    },
  });

  const passwordHash = hashPassword(password);
  if (type === "LOGIN") {
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (user.passwordHash !== passwordHash) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } else {
    if (user) {
      return NextResponse.json(
        { error: "Username is already in use" },
        { status: 409 }
      );
    }

    const validation = validateUsername(username);
    if (validation.errors) {
      return NextResponse.json(
        {
          error: "Username formatted incorrectly",
          validationErrors: validation.errors,
        },
        { status: 422 }
      );
    }

    user = await prisma.user.create({
      data: { username, passwordHash },
    });
  }

  // generate a new token
  const token = generateSession();

  // add token to user
  await createSessionOnUser(user, token);

  return NextResponse.json(
    {
      message: `Successfully ${type.toLowerCase()}ed user ${username}`,
      session: token,
    },
    { status: 200 }
  );
};

const validateUsername = (username: string) => {
  //todo;
  let errors = "";
  if (username === "") {
    errors += "Cannot be blank; ";
  }
  const noWhiteSpace = /\s/.test(username);
  if (noWhiteSpace) {
    errors += "Cannot contain whitespace; ";
  }
  return { errors };
};

export {
  type SafeUser,
  generateSession,
  hashPassword,
  createSessionOnUser,
  authenticationFlow,
  getUserSession,
  LoginOrRegisterUser,
};
