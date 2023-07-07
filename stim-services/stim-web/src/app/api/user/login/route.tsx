import { NextRequest } from "next/server";
import { LoginOrRegisterUser } from "@/utils/auth";

export async function POST(req: NextRequest) {
  return await LoginOrRegisterUser(req, "LOGIN");
}
