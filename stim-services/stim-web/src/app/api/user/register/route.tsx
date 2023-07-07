import { LoginOrRegisterUser } from "@/utils/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await LoginOrRegisterUser(req, "REGISTER");
}
