import AuthenticationForm from "@/components/Form/AuthenticationForm";
import { getUserSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUserSession();

  if (user) {
    redirect("/");
  }

  return (
    <main className="h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl">Login</h1>
        <AuthenticationForm type={"login"} />
      </div>
    </main>
  );
}
