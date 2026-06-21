"use client";

import { useState } from "react";
import { gooeyToast } from "goey-toast";

import { HOME_MENU_CATEGORIES } from "@/modules/customer/homepage/constants/menu-categories";
import { HOME_MENU_SECTIONS } from "@/modules/customer/homepage/constants/menu-sections";
import type { OrderType } from "@/modules/customer/homepage/types/order";

import { HomeCategoryTabs } from "./components/HomeCategoryTabs";
import { HomeHeader } from "./components/HomeHeader";
import { HomeMenuListBuilder } from "./components/HomeMenuListBuilder";
import { HomeOrderTypeCard } from "./components/HomeOrderTypeCard";

export function HomePage() {
  const [orderType] = useState<OrderType>("dine-in");
  const [activeCategoryId, setActiveCategoryId] = useState(
    HOME_MENU_CATEGORIES[0].id,
  );

  return (
    <div className="flex flex-1 flex-col">
      <HomeHeader
        nameStore="RM Ayam Bakar Ammar – Bandung Kota"
        openHours="Buka hari ini, 00:00-23:59"
        onClickSearch={() => gooeyToast.info("Fitur Search Coming Soon!")}
        onClickHumburger={() => gooeyToast.info("Fitur Sidebar Coming Soon!")}
        onClickDetail={() => gooeyToast.info("Fitur Detail Toko Coming Soon!")}
      />

      <main className="mt-4 flex flex-1 flex-col gap-4 px-4 pb-6">
        <HomeOrderTypeCard
          orderType={orderType}
          tableNumber={10}
          onClickOrderType={() =>
            gooeyToast.info("Fitur Pilih Tipe Pemesanan Coming Soon!")
          }
        />

        <HomeCategoryTabs
          categories={HOME_MENU_CATEGORIES}
          activeCategoryId={activeCategoryId}
          onSelectCategory={setActiveCategoryId}
        />

        <HomeMenuListBuilder
          sections={HOME_MENU_SECTIONS}
          onAddItem={() =>
            gooeyToast.info("Fitur Tambah Menu Coming Soon!")
          }
        />
      </main>
    </div>
  );
}
