"use client";

import { useRouter } from "next/navigation";

import {
  ORDER_TYPE_DESCRIPTION,
  ORDER_TYPE_LABEL,
  type OrderType,
} from "@/modules/customer/homepage/types/order";
import { cn } from "@/shared/lib/cn";

import {
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  ShoppingBagIcon,
  UtensilsIcon,
} from "./components/StoreDetailIcons";
import { StoreDetailHeader } from "./components/StoreDetailHeader";
import { StoreDetailSection } from "./components/StoreDetailSection";
import { DUMMY_STORE_DETAIL } from "./constants/store-detail-dummy";
import { useTodayIndex } from "./lib/use-today-index";

const ORDER_TYPE_ICON: Record<OrderType, typeof UtensilsIcon> = {
  "dine-in": UtensilsIcon,
  takeaway: ShoppingBagIcon,
};

export function StoreDetailPage() {
  const router = useRouter();
  const store = DUMMY_STORE_DETAIL;
  const todayIndex = useTodayIndex();
  const todayHours =
    todayIndex === null ? null : store.openingHours[todayIndex];
  const phoneHref = `tel:${store.phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="flex flex-1 flex-col">
      <StoreDetailHeader onBack={() => router.back()} />

      <main className="flex flex-1 flex-col bg-zinc-50 pb-24">
        <div className="bg-gradient-to-br from-[#FA52A8] to-[#c2307d] px-4 pb-14 pt-6 text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {todayHours ? `Buka hari ini, ${todayHours.hours}` : "Buka"}
          </span>
          <h2 className="mt-3 text-xl font-bold leading-snug">{store.name}</h2>
          <p className="mt-1.5 text-sm text-white/85">{store.description}</p>
        </div>

        <div className="-mt-8 flex flex-col gap-3 px-4">
          <StoreDetailSection
            title="Alamat"
            icon={<MapPinIcon className="h-4.5 w-4.5" />}
          >
            <p>{store.address}</p>
          </StoreDetailSection>

          <StoreDetailSection
            title="Jam Operasional"
            icon={<ClockIcon className="h-4.5 w-4.5" />}
          >
            <ul className="divide-y divide-zinc-100">
              {store.openingHours.map((item, index) => {
                const isToday = index === todayIndex;
                return (
                  <li
                    key={item.day}
                    className={cn(
                      "flex justify-between py-2",
                      isToday && "font-semibold text-zinc-900",
                    )}
                  >
                    <span>
                      {item.day}
                      {isToday && (
                        <span className="ml-2 rounded-full bg-[#FA52A8]/10 px-2 py-0.5 text-[10px] font-medium text-[#FA52A8]">
                          Hari ini
                        </span>
                      )}
                    </span>
                    <span>{item.hours}</span>
                  </li>
                );
              })}
            </ul>
          </StoreDetailSection>

          <StoreDetailSection
            title="Tipe Pesanan"
            icon={<UtensilsIcon className="h-4.5 w-4.5" />}
          >
            <ul className="space-y-3">
              {store.orderTypes.map((type) => {
                const TypeIcon = ORDER_TYPE_ICON[type];
                return (
                  <li key={type} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                      <TypeIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-medium text-zinc-900">
                        {ORDER_TYPE_LABEL[type]}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {ORDER_TYPE_DESCRIPTION[type]}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </StoreDetailSection>
        </div>
      </main>

      <div className="sticky bottom-0 border-t border-zinc-200 bg-white px-4 py-3">
        <a
          href={phoneHref}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FA52A8] py-3 text-sm font-semibold text-white transition active:opacity-90"
        >
          <PhoneIcon className="h-4 w-4" />
          Hubungi Toko · {store.phone}
        </a>
      </div>
    </div>
  );
}
