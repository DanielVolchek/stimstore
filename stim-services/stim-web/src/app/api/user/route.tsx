import { NextRequest, NextResponse } from "next/server";
import { authenticationFlow } from "@/utils/auth";

export async function GET(req: NextRequest) {
  // const sessionToken = req.headers.get("set-cookie");
  // const session = parseSessionCookie(sessionToken) as string;

  const session = req.cookies.get("session")?.value;

  let user;
  try {
    user = await authenticationFlow(session);
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized: " + error },
      { status: 401 }
    );
  }

  let { passwordHash, ...safeUser } = user;
  return NextResponse.json({ user: safeUser }, { status: 200 });
}

function parseSessionCookie(cookieString: string | null) {
  // wish I didn't have to use this
  if (!cookieString) {
    return null;
  }
  const cookieRegex = /(^| )session=([^;]+)/;
  // const cookieRegex = /session=([^;]+);.*SameSite=Strict;.*Secure/;
  const match = cookieString.match(cookieRegex);
  if (match) {
    return match[2];
  }
  return null;
}
