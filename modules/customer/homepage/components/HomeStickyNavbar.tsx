"use client";

import Image from "next/image";

import {
  ORDER_TYPE_LABEL,
  type OrderType,
} from "@/modules/customer/homepage/types/order";

type HomeStickyNavbarProps = {
  nameStore: string;
  orderType: OrderType;
  tableNumber: string | number;
  onClickSearch: () => void;
};

export function HomeStickyNavbar({
  nameStore,
  orderType,
  tableNumber,
  onClickSearch,
}: HomeStickyNavbarProps) {
  const topLabel =
    orderType === "dine-in"
      ? `Meja ${tableNumber}`
      : ORDER_TYPE_LABEL[orderType];

  return (
    <div className="bg-white">
      <div className="bg-[#FFF0E6] px-4 py-2 text-center">
        <p className="text-sm font-medium text-zinc-900">{topLabel}</p>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <p className="truncate text-base font-bold text-zinc-900">{nameStore}</p>

        <button
          type="button"
          onClick={onClickSearch}
          aria-label="Search"
          className="shrink-0"
        >
          <Image
            src="/images/ic_search.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
          />
        </button>
      </div>
    </div>
  );
}
