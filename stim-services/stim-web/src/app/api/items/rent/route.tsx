import { authenticationFlow } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  let user: User;
  try {
    user = await authenticationFlow(session);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
  const { action, itemID } = await req.json();

  if (!action || !itemID) {
    return NextResponse.json({ error: "Missing Data" }, { status: 400 });
  }

  if (action === "RENT") {
    return rentItem(user.id, parseInt(itemID));
  } else if (action === "RETURN") {
    return returnItem(user.id, parseInt(itemID));
  }

  return NextResponse.json(
    {
      error: `Action must be of type RENT or of type RETURN, got ${action} instead`,
    },
    { status: 400 }
  );
}

const rentItem = async (userID: string, itemID: number) => {
  const item = await prisma.item.findUnique({
    where: { id: itemID },
    include: { currentRentEvent: true },
  });

  const user = await prisma.user.findUnique({
    where: { id: userID },
    include: { rentEvent: true },
  });

  if (user?.rentEvent) {
    return NextResponse.json(
      { error: "User has already rented Item of id " + user.rentEvent.itemID },
      { status: 404 }
    );
  }

  if (!item) {
    return NextResponse.json({ error: "Item Not Found" }, { status: 404 });
  }
  if (item.currentRentEvent) {
    return NextResponse.json({ error: "Item already rented" }, { status: 401 });
  }

  await prisma.rentEvent.create({
    data: { itemID: item.id, rentedByID: userID, rentedOn: new Date() },
  });

  return NextResponse.json(
    { message: "Succesfully rented item of id " + item.id },
    { status: 200 }
  );
};

const returnItem = async (userID: string, itemID: number) => {
  const item = await prisma.item.findUnique({
    where: { id: itemID },
    include: { currentRentEvent: true },
  });
  if (!item) {
    return NextResponse.json({ error: "Item Not Found" }, { status: 404 });
  }
  if (!item.currentRentEvent) {
    return NextResponse.json(
      { error: "Item not currently rented" },
      { status: 401 }
    );
  }
  if (item.currentRentEvent.rentedByID !== userID) {
    return NextResponse.json(
      { error: "Item not rented by current user" },
      { status: 401 }
    );
  }

  await prisma.item.update({
    where: { id: item.id },
    data: { currentRentEvent: { delete: true } },
  });

  return NextResponse.json(
    { message: "Succesfully returned item of id" + item.id },
    { status: 200 }
  );
};
