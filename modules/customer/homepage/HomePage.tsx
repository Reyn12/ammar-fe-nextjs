"use client";

import { useMemo, useState } from "react";
import { gooeyToast } from "goey-toast";

import {
  HOME_MENU_ALL_CATEGORY_ID,
  HOME_MENU_CATEGORIES,
} from "@/modules/customer/homepage/constants/menu-categories";
import { HOME_MENU_SECTIONS } from "@/modules/customer/homepage/constants/menu-sections";
import { filterMenuSectionsByCategory } from "@/modules/customer/homepage/lib/filter-menu-sections-by-category";
import { useShowWhenScrolledPast } from "@/modules/customer/homepage/lib/use-show-when-scrolled-past";
import type { OrderType } from "@/modules/customer/homepage/types/order";
import { cn } from "@/shared/lib/cn";

import { HomeCategoryTabs } from "./components/HomeCategoryTabs";
import { HomeCheckoutBar } from "./components/HomeCheckoutBar";
import { HomeHeader } from "./components/HomeHeader";
import { HomeMenuListBuilder } from "./components/HomeMenuListBuilder";
import { HomeOrderTypeCard } from "./components/HomeOrderTypeCard";
import { HomeStickyNavbar } from "./components/HomeStickyNavbar";

export function HomePage() {
  const [orderType] = useState<OrderType>("dine-in");
  const [activeCategoryId, setActiveCategoryId] = useState(
    HOME_MENU_ALL_CATEGORY_ID,
  );
  const { sentinelRef, isPast: showStickyNavbar } = useShowWhenScrolledPast();

  const filteredSections = useMemo(
    () => filterMenuSectionsByCategory(HOME_MENU_SECTIONS, activeCategoryId),
    [activeCategoryId],
  );

  const handleClickSearch = () => gooeyToast.info("Fitur Search Coming Soon!");

  return (
    <div className="flex flex-1 flex-col">
      <HomeHeader
        nameStore="RM Ayam Bakar Ammar – Bandung Kota"
        openHours="Buka hari ini, 00:00-23:59"
        onClickSearch={handleClickSearch}
        onClickHumburger={() => gooeyToast.info("Fitur Sidebar Coming Soon!")}
        onClickDetail={() => gooeyToast.info("Fitur Detail Toko Coming Soon!")}
      />

      <main className="mt-4 flex flex-1 flex-col gap-4 px-4 pb-24">
        <HomeOrderTypeCard
          orderType={orderType}
          tableNumber="10"
          onClickOrderType={() =>
            gooeyToast.info("Fitur Pilih Tipe Pemesanan Coming Soon!")
          }
        />

        <div ref={sentinelRef} aria-hidden className="h-px shrink-0" />

        <div
          className={cn(
            "sticky top-0 z-40 -mx-4 bg-white",
            showStickyNavbar && "shadow-sm",
          )}
        >
          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-200 ease-out",
              showStickyNavbar ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <HomeStickyNavbar
                nameStore="RM Ayam Bakar Ammar – Bandung Kota"
                orderType={orderType}
                tableNumber="10"
                onClickSearch={handleClickSearch}
              />
            </div>
          </div>

          <div className="px-4 pb-2 pt-2">
            <HomeCategoryTabs
              categories={HOME_MENU_CATEGORIES}
              activeCategoryId={activeCategoryId}
              onSelectCategory={setActiveCategoryId}
            />
          </div>
        </div>

        <HomeMenuListBuilder
          sections={filteredSections}
          onAddItem={() =>
            gooeyToast.info("Fitur Tambah Menu Coming Soon!")
          }
        />
      </main>

      <HomeCheckoutBar
        itemCount={1}
        total={125_000}
        onClick={() => gooeyToast.info("Fitur Checkout Coming Soon!")}
      />
    </div>
  );
}
