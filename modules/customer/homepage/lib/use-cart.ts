"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  addMenuItemToCart,
  decrementCartLine,
  replaceCartLine,
  decrementMenuItemByMenuItemId,
  getCartQuantityByMenuItemId,
  getCartSummary,
} from "@/modules/customer/homepage/lib/cart";
import type { CartSelection, CartState } from "@/modules/customer/homepage/types/cart";
import { syncCartWithMenu } from "@/modules/customer/homepage/lib/sync-cart-with-menu";
import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";
import type { MenuSection } from "@/modules/customer/homepage/types/menu-section";
import { readStored, writeStored } from "@/shared/lib/safe-storage";

const INITIAL_CART: CartState = { lines: {} };

const CART_STORAGE_KEY = "ammar:cart";
/** Cart yang lebih lama dari ini dianggap basi (harga/menu bisa sudah berubah). */
const CART_MAX_AGE_MS = 12 * 60 * 60 * 1000;

function isValidCart(value: unknown): value is CartState {
  if (!value || typeof value !== "object") return false;
  const lines = (value as CartState).lines;
  return (
    !!lines &&
    typeof lines === "object" &&
    Object.values(lines).every(
      (line) =>
        typeof line?.menuItemId === "string" &&
        typeof line?.lineKey === "string" &&
        Number.isInteger(line?.quantity) &&
        line.quantity > 0,
    )
  );
}

export function useCartState() {
  const [cart, setCart] = useState<CartState>(INITIAL_CART);
  // localStorage baru bisa dibaca setelah mount, jadi cart dipulihkan di effect.
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = readStored<CartState>(CART_STORAGE_KEY, CART_MAX_AGE_MS);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pulihkan data dari localStorage setelah mount
    if (isValidCart(saved)) setCart(saved);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) writeStored(CART_STORAGE_KEY, cart);
  }, [cart, isHydrated]);

  const summary = useMemo(() => getCartSummary(cart), [cart]);

  const getQuantity = useCallback(
    (menuItemId: string) => getCartQuantityByMenuItemId(cart, menuItemId),
    [cart],
  );

  const addItem = useCallback(
    (item: MenuItem, selection?: CartSelection, quantity = 1) => {
      setCart((current) =>
        addMenuItemToCart(current, item, selection, quantity),
      );
    },
    [],
  );

  const incrementItem = useCallback((item: MenuItem) => {
    setCart((current) => addMenuItemToCart(current, item));
  }, []);

  const decrementItem = useCallback((menuItemId: string) => {
    setCart((current) => decrementMenuItemByMenuItemId(current, menuItemId));
  }, []);

  const decrementLine = useCallback((lineKey: string) => {
    setCart((current) => decrementCartLine(current, lineKey));
  }, []);

  const updateLine = useCallback(
    (
      lineKey: string,
      item: MenuItem,
      selection: CartSelection,
      quantity: number,
    ) => {
      setCart((current) =>
        replaceCartLine(current, lineKey, item, selection, quantity),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setCart(INITIAL_CART), []);

  /** Buang/koreksi baris cart yang sudah tidak cocok dengan menu terbaru. */
  const syncWithMenu = useCallback((sections: MenuSection[]) => {
    setCart((current) => syncCartWithMenu(current, sections));
  }, []);

  return {
    cart,
    isHydrated,
    summary,
    getQuantity,
    addItem,
    incrementItem,
    decrementItem,
    decrementLine,
    updateLine,
    clearCart,
    syncWithMenu,
  };
}
