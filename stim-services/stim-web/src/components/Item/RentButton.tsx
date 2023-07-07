"use client";

import { Item, RentEvent } from "@prisma/client";
import { Image as ImageType } from "@prisma/client";
import { SafeUser } from "@/utils/auth";
import { MouseEventHandler, useEffect, useState } from "react";
import baseURL from "@/utils/url";
import { fetchWithMessageHandling } from "@/utils/fetch/fetchUtils";
import useClientMessageStore from "@/utils/useClientMessageStore";

export default function RentButton({
  item,
  user,
}: {
  item: Item & {
    image: ImageType | null;
    currentRentEvent: RentEvent | null;
  };
  user: SafeUser | null;
}) {
  const [action, setAction] = useState<"RENT" | "RETURN" | "RENTED">("RENT");

  const { updateClientMessage } = useClientMessageStore();

  const actionHandler = async () => {
    if (action === "RENTED") {
      return null;
    }

    const data = await fetchWithMessageHandling(
      {
        route: `${baseURL()}/api/items/rent`,
        withAuth: true,
        successMessage: "Succesfully rented Item",
      },
      {
        method: "POST",
        body: JSON.stringify({ action, itemID: item.id }),
      }
    );

    console.log(data);
    if (!data.error) {
      setAction(action === "RENT" ? "RETURN" : "RENT");
    }
  };

  useEffect(() => {
    if (item?.currentRentEvent) {
      setAction(
        user && item.currentRentEvent.rentedByID === user.id
          ? "RETURN"
          : "RENTED"
      );
    }
  }, [item, user]);

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (action === "RENTED") {
      updateClientMessage({
        type: "ERROR",
        message: "Sorry, this item is already rented",
      });
    } else {
      actionHandler();
    }
  };

  return user ? (
    <button
      onClick={onClickHandler}
      className="absolute bottom-0 rounded-xl border-2 border-copper px-2"
    >
      {action === "RENTED" ? (
        <span>Sorry this is already rented :(</span>
      ) : (
        <span>{action}</span>
      )}
    </button>
  ) : null;
}
