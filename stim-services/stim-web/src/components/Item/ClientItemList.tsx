"use client";

import { Item, RentEvent, User, Image } from "@prisma/client";
import ItemCard from "./ItemCard";
import { useMemo, useRef, useState } from "react";
import Filter from "./Filter";

type Props = {
  items: (Item & {
    image: Image | null;
    currentRentEvent: RentEvent | null;
  })[];

  user: User & { rentEvent: RentEvent };
};

export type FilterSettings = {
  showOnlyAvailable: boolean;
  search: string;
};

export default function ClientItemList({ items, user }: Props) {
  let rentedItem: JSX.Element | undefined = undefined;

  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    showOnlyAvailable: false,
    search: "",
  });

  const modifyFilterSettings = (changedSettings: FilterSettings) => {
    setFilterSettings(() => ({ ...changedSettings }));
  };

  const itemsRendered = useMemo(() => {
    return items.map((item) => {
      const renderedItem = <ItemCard key={item.id} item={item} user={user} />;

      // if (user.rentEvent && item.id === user.rentEvent.itemID)
      //   // usersRentedItem.current = renderedItem;
      //   return;

      if (filterSettings.showOnlyAvailable && item.currentRentEvent) {
        return null;
      }

      if (
        filterSettings.search &&
        !item.name.toLowerCase().includes(filterSettings.search.toLowerCase())
      ) {
        return null;
      }

      return renderedItem;
    });
  }, [items, user, filterSettings]);

  return (
    <section className="mx-auto my-4 flex w-2/3 flex-col gap-4">
      <Filter
        filterChangeEvent={modifyFilterSettings}
        filterSettings={filterSettings}
      />
      <div className="flex flex-col gap-4">
        {rentedItem && (
          <>
            <h2 className="text-2xl">Rented: </h2>
            <div className="mb-6">{rentedItem}</div>
          </>
        )}
        <h2 className="text-2xl">Items:</h2>
        {itemsRendered}
      </div>
    </section>
  );
}
