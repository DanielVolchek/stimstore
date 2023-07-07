import Link from "next/link";
import { getUserSession } from "@/utils/auth";
import LoginActionsContainer from "./Auth/LoginActionsContainer";
import Slug from "./Icons/Slug";

export default async function Nav() {
  const user = await getUserSession();
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="h-18 bg-celadon text-alabaster">
      <nav className="flex items-center justify-between px-8 py-2">
        <Link href="/">
          <Slug className="w-12 -scale-x-100 fill-copper transition-colors duration-[25ms] hover:fill-alabaster" />
        </Link>
        {isAdmin && <a href="/admin">Admin</a>}
        <div className="flex">
          <LoginActionsContainer />
        </div>
      </nav>
    </header>
  );
}
