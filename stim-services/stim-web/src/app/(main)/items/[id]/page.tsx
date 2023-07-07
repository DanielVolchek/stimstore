import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import prisma from "@/utils/prisma";
import useUserStore from "@/utils/useUserStore";
import RentEventComponent from "@/components/RentEventComponent";
import { getUserSession } from "@/utils/auth";

type Props = { params: { id: string } };

export default async function ItemPage({ params: { id } }: Props) {
  const item = await prisma.item.findUnique({
    where: { id: parseInt(id) },
    include: { currentRentEvent: true, image: true },
  });

  if (!item) {
    redirect("/404");
  }

  const user = await getUserSession();

  const rentEvent = item.currentRentEvent;
  const image = item.image;

  const rented = !!rentEvent;
  const rentedByUser = rented && rentEvent.rentedByID === user?.id;

  // on item page check if an item has been rented by the current user
  // if that is the case render a return item button
  // otherwise check if the item is rented
  // if it isn't add a rent button
  // if it is add text that says currently rented

  return (
    <div>
      <h1>{item.name}</h1>
      {image && (
        <Image src={image.url} alt={item.name} width={100} height={100} />
      )}
      <p>{item.desc}</p>
      <RentEventComponent rented={rented} rentedByUser={rentedByUser} />
      <Link href={item.purchaseLink}>Link to Purchase</Link>
    </div>
  );
}
