import { authenticationFlow } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

  await prisma.session.delete({ where: { token: session } });
  return NextResponse.json(
    { message: "Successfully logged out user" },
    { status: 200 }
  );
}
