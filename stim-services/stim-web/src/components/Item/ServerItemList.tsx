import { SafeUser, getUserSession } from "@/utils/auth";
import prisma from "@/utils/prisma";
import ClientItemList from "./ClientItemList";

export default async function ItemList() {
  let user = await getUserSession();

  const items = await prisma.item.findMany({
    include: { image: true, currentRentEvent: true },
  });

  user =
    user &&
    (await prisma.user.findFirst({
      where: { id: user.id },
      include: { rentEvent: true },
    }));

  return <ClientItemList items={items} user={user} />;
}
