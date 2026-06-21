"use client";

import { useState } from "react";
import { gooeyToast } from "goey-toast";

import type { OrderType } from "@/modules/customer/domain/types/order";

import { HomeHeader } from "../components/HomeHeader";
import { HomeOrderTypeCard } from "../components/HomeOrderTypeCard";

export function HomePage() {
  const [orderType] = useState<OrderType>("dine-in");

  return (
    <div className="flex flex-1 flex-col">
      {/* Header Section */}
      <HomeHeader
        nameStore="RM Ayam Bakar Ammar – Bandung Kota"
        openHours="Buka hari ini, 00:00-23:59"
        onClickSearch={() => gooeyToast.info("Fitur Search Coming Soon!")}
        onClickHumburger={() =>
          gooeyToast.info("Fitur Sidebar Coming Soon!")
        }
        onClickDetail={() =>
          gooeyToast.info("Fitur Detail Toko Coming Soon!")
        }
      />

      <main className="flex flex-1 flex-col gap-4 px-4 pb-6 mt-4">

        {/* Order Type Card */}
        <HomeOrderTypeCard
          orderType={orderType}
          tableNumber={10}
          onClickOrderType={() =>
            gooeyToast.info("Fitur Pilih Tipe Pemesanan Coming Soon!")
          }
        />
      </main>
    </div>
  );
}
