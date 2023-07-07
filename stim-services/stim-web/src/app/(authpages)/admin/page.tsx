import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Admin() {
  return (
    <main>
      <h1 className="mb-5">ADMIN</h1>
      <Link
        href="/items/add"
        className="hoverEffect ${className} rounded-3xl border border-copper bg-alabaster px-12 py-2  text-copper hover:shadow-copper"
      >
        Add item
      </Link>
    </main>
  );
}
