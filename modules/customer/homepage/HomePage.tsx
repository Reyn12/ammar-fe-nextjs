"use client";

import { useMemo, useState } from "react";
import { gooeyToast } from "goey-toast";
import { useRouter } from "next/navigation";

import {
  HOME_MENU_CATEGORIES,
} from "@/modules/customer/homepage/constants/menu-categories";
import { HOME_MENU_SECTIONS } from "@/modules/customer/homepage/constants/menu-sections";
import { findMenuItemById } from "@/modules/customer/homepage/lib/find-menu-item-by-id";
import { useCart } from "@/modules/customer/homepage/lib/use-cart";
import { filterMenuSectionsByCategory } from "@/modules/customer/homepage/lib/filter-menu-sections-by-category";
import { useShowWhenScrolledPast } from "@/modules/customer/homepage/lib/use-show-when-scrolled-past";
import type { OrderType } from "@/modules/customer/homepage/types/order";
import { cn } from "@/shared/lib/cn";

import { HomeCategoryTabs } from "./components/HomeCategoryTabs";
import { HomeCheckoutBar } from "./components/HomeCheckoutBar";
import { HomeHeader } from "./components/HomeHeader";
import { HomeMenuListBuilder } from "./components/HomeMenuListBuilder";
import { HomeOrderTypeBottomSheet } from "./components/HomeOrderTypeBottomSheet";
import { HomeOrderTypeCard } from "./components/HomeOrderTypeCard";
import { HomeSidebar } from "./components/HomeSidebar";
import { HomeStickyNavbar } from "./components/HomeStickyNavbar";

export function HomePage() {
  const router = useRouter();
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [activeCategoryId, setActiveCategoryId] = useState(
    "semua",
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOrderTypeSheetOpen, setIsOrderTypeSheetOpen] = useState(false);
  const { summary, getQuantity, addItem, incrementItem, decrementItem } =
    useCart();
  const { sentinelRef, isPast: showStickyNavbar } = useShowWhenScrolledPast();

  const filteredSections = useMemo(
    () => filterMenuSectionsByCategory(HOME_MENU_SECTIONS, activeCategoryId),
    [activeCategoryId],
  );
  const handleClickSearch = () => router.push("/search");

  const handleAddItem = (itemId: string) => {
    const item = findMenuItemById(HOME_MENU_SECTIONS, itemId);
    if (!item) return;

    if (item.kind === "configurable") {
      gooeyToast.info("Fitur Detail Menu Coming Soon!");
      return;
    }

    addItem(item);
  };

  const handleIncrementItem = (itemId: string) => {
    const item = findMenuItemById(HOME_MENU_SECTIONS, itemId);
    if (!item) return;

    if (item.kind === "configurable") {
      gooeyToast.info("Fitur Detail Menu Coming Soon!");
      return;
    }

    incrementItem(item);
  };

  const handleDecrementItem = (itemId: string) => {
    decrementItem(itemId);
  };

  return (
    <div className="flex flex-1 flex-col">
      <HomeHeader
        nameStore="RM Ayam Bakar Ammar – Bandung Kota"
        openHours="Buka hari ini, 00:00-23:59"
        onClickSearch={handleClickSearch}
        onClickHumburger={() => setIsSidebarOpen(true)}
        onClickDetail={() => gooeyToast.info("Fitur Detail Toko Coming Soon!")}
      />

      <main className="mt-4 flex flex-1 flex-col gap-4 px-4 pb-24">
        <HomeOrderTypeCard
          orderType={orderType}
          tableNumber="10"
          onClickOrderType={() => setIsOrderTypeSheetOpen(true)}
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
          getQuantity={getQuantity}
          onAddItem={handleAddItem}
          onIncrementItem={handleIncrementItem}
          onDecrementItem={handleDecrementItem}
        />
      </main>

      <HomeCheckoutBar
        itemCount={summary.itemCount}
        total={summary.total}
        onClick={() => gooeyToast.info("Fitur Checkout Coming Soon!")}
      />

      <HomeSidebar
        isOpen={isSidebarOpen}
        nameStore="RM Ayam Bakar Ammar – Bandung Kota"
        onClose={() => setIsSidebarOpen(false)}
        onClickOrderHistory={() =>
          gooeyToast.info("Fitur Riwayat Pesanan Coming Soon!")
        }
      />

      <HomeOrderTypeBottomSheet
        isOpen={isOrderTypeSheetOpen}
        value={orderType}
        onClose={() => setIsOrderTypeSheetOpen(false)}
        onChange={setOrderType}
      />
    </div>
  );
}
