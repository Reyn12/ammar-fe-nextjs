"use client";

import { useMemo, useState } from "react";
import { gooeyToast } from "goey-toast";
import { useRouter } from "next/navigation";

import { HOME_MENU_CATEGORIES } from "@/modules/customer/homepage/constants/menu-categories";
import { useCatalog } from "@/modules/customer/catalog/catalog-context";
import { useTodayIndex } from "@/modules/customer/store-detail/lib/use-today-index";
import { findMenuItemById } from "@/modules/customer/homepage/lib/find-menu-item-by-id";
import { useCartContext } from "@/modules/customer/homepage/lib/cart-context";
import { filterMenuSectionsByCategory } from "@/modules/customer/homepage/lib/filter-menu-sections-by-category";
import { useShowWhenScrolledPast } from "@/modules/customer/homepage/lib/use-show-when-scrolled-past";
import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";
import type { CartSelection } from "@/modules/customer/homepage/types/cart";
import { cn } from "@/shared/lib/cn";

import { HomeCategoryTabs } from "./components/HomeCategoryTabs";
import { HomeCheckoutBar } from "./components/HomeCheckoutBar";
import { HomeHeader } from "./components/HomeHeader";
import { HomeMenuDetailBottomSheet } from "./components/HomeMenuDetailBottomSheet";
import { HomeMenuListBuilder } from "./components/HomeMenuListBuilder";
import { HomeOrderTypeBottomSheet } from "./components/HomeOrderTypeBottomSheet";
import { HomeOrderTypeCard } from "./components/HomeOrderTypeCard";
import { HomeSidebar } from "./components/HomeSidebar";
import { HomeStickyNavbar } from "./components/HomeStickyNavbar";

export function HomePage() {
  const router = useRouter();
  const [activeCategoryId, setActiveCategoryId] = useState("semua");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOrderTypeSheetOpen, setIsOrderTypeSheetOpen] = useState(false);
  const [menuDetailItem, setMenuDetailItem] = useState<MenuItem | null>(null);
  const {
    summary,
    getQuantity,
    addItem,
    incrementItem,
    decrementItem,
    orderType,
    setOrderType,
    table,
  } = useCartContext();
  const { sentinelRef, isPast: showStickyNavbar } = useShowWhenScrolledPast();
  const { sections, store, status, reload } = useCatalog();
  const todayIndex = useTodayIndex();
  const todayHours =
    todayIndex === null ? undefined : store?.openingHours[todayIndex]?.hours;
  const openHoursLabel = !todayHours
    ? "Lihat jam operasional"
    : todayHours === "Tutup"
      ? "Tutup hari ini"
      : `Buka hari ini, ${todayHours}`;

  const filteredSections = useMemo(
    () => filterMenuSectionsByCategory(sections, activeCategoryId),
    [sections, activeCategoryId],
  );
  const handleClickSearch = () => router.push("/search");

  const openMenuDetail = (item: MenuItem) => setMenuDetailItem(item);
  const closeMenuDetail = () => setMenuDetailItem(null);

  const handleAddItem = (itemId: string) => {
    const item = findMenuItemById(sections, itemId);
    if (!item || item.isAvailable === false) return;

    openMenuDetail(item);
  };

  const handleIncrementItem = (itemId: string) => {
    const item = findMenuItemById(sections, itemId);
    if (!item) return;

    if (item.kind === "configurable") {
      openMenuDetail(item);
      return;
    }

    incrementItem(item);
  };

  const handleConfirmMenuDetail = (
    selection: CartSelection,
    quantity: number,
  ) => {
    if (!menuDetailItem) return;

    addItem(menuDetailItem, selection, quantity);
    closeMenuDetail();
    gooeyToast.success(`${menuDetailItem.name} ditambahkan ke keranjang`);
  };

  const handleDecrementItem = (itemId: string) => {
    decrementItem(itemId);
  };

  return (
    <div className="flex flex-1 flex-col">
      <HomeHeader
        nameStore={store?.name ?? ""}
        openHours={openHoursLabel}
        onClickSearch={handleClickSearch}
        onClickHumburger={() => setIsSidebarOpen(true)}
        onClickDetail={() => router.push("/store-detail")}
      />

      <main className="mt-4 flex flex-1 flex-col gap-4 px-4 pb-24">
        <HomeOrderTypeCard
          orderType={orderType}
          tableNumber={table?.number ?? "-"}
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
                nameStore={store?.name ?? ""}
                orderType={orderType}
                tableNumber={table?.number ?? "-"}
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

        {status === "loading" && (
          <p className="py-10 text-center text-sm text-zinc-500">
            Memuat menu...
          </p>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <p className="text-sm text-zinc-600">
              Menu gagal dimuat. Periksa koneksi lalu coba lagi.
            </p>
            <button
              type="button"
              onClick={reload}
              className="rounded-xl bg-[#FA52A8] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Coba lagi
            </button>
          </div>
        )}

        {status === "ready" && (
          <HomeMenuListBuilder
            sections={filteredSections}
            getQuantity={getQuantity}
            onAddItem={handleAddItem}
            onIncrementItem={handleIncrementItem}
            onDecrementItem={handleDecrementItem}
          />
        )}
      </main>

      <HomeCheckoutBar
        itemCount={summary.itemCount}
        total={summary.total}
        onClick={() => router.push("/checkout")}
      />

      <HomeSidebar
        isOpen={isSidebarOpen}
        nameStore={store?.name ?? ""}
        onClose={() => setIsSidebarOpen(false)}
        onClickOrderHistory={() => router.push("/order-history")}
      />

      <HomeOrderTypeBottomSheet
        isOpen={isOrderTypeSheetOpen}
        value={orderType}
        onClose={() => setIsOrderTypeSheetOpen(false)}
        onChange={setOrderType}
      />

      <HomeMenuDetailBottomSheet
        item={menuDetailItem}
        isOpen={menuDetailItem !== null}
        onClose={closeMenuDetail}
        onConfirm={handleConfirmMenuDetail}
      />
    </div>
  );
}
