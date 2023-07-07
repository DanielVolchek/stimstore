import { getUserSession } from "@/utils/auth";
import LoginOrRegisterButtons from "./LoginButtons";
import LogoutButton from "./LogoutButton";

export default async function LoginActionsContainer() {
  const user = await getUserSession();

  return <div>{user ? <LogoutButton /> : <LoginOrRegisterButtons />}</div>;
}
