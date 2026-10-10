"use client";

import { useCallback, useMemo, useState } from "react";

import {
  addMenuItemToCart,
  decrementCartLine,
  replaceCartLine,
  decrementMenuItemByMenuItemId,
  getCartQuantityByMenuItemId,
  getCartSummary,
} from "@/modules/customer/homepage/lib/cart";
import type { CartSelection, CartState } from "@/modules/customer/homepage/types/cart";
import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";

const INITIAL_CART: CartState = { lines: {} };

export function useCartState() {
  const [cart, setCart] = useState<CartState>(INITIAL_CART);

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

  return {
    cart,
    summary,
    getQuantity,
    addItem,
    incrementItem,
    decrementItem,
    decrementLine,
    updateLine,
    clearCart,
  };
}
