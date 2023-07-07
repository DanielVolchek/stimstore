import ServerItemList from "@/components/Item/ServerItemList";

export default async function Home() {
  return (
    <main>
      <h1 className="mt-2 text-center text-6xl">StimStore</h1>
      <ServerItemList />
    </main>
  );
}
