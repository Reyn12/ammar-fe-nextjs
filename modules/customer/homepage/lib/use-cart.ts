"use client";

import { useCallback, useMemo, useState } from "react";

import {
  addMenuItemToCart,
  decrementMenuItemByMenuItemId,
  getCartQuantityByMenuItemId,
  getCartSummary,
} from "@/modules/customer/homepage/lib/cart";
import type { CartSelection, CartState } from "@/modules/customer/homepage/types/cart";
import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";

const INITIAL_CART: CartState = { lines: {} };

export function useCart() {
  const [cart, setCart] = useState<CartState>(INITIAL_CART);

  const summary = useMemo(() => getCartSummary(cart), [cart]);

  const getQuantity = useCallback(
    (menuItemId: string) => getCartQuantityByMenuItemId(cart, menuItemId),
    [cart],
  );

  const addItem = useCallback(
    (item: MenuItem, selection?: CartSelection) => {
      setCart((current) => addMenuItemToCart(current, item, selection));
    },
    [],
  );

  const incrementItem = useCallback((item: MenuItem) => {
    setCart((current) => addMenuItemToCart(current, item));
  }, []);

  const decrementItem = useCallback((menuItemId: string) => {
    setCart((current) => decrementMenuItemByMenuItemId(current, menuItemId));
  }, []);

  return {
    cart,
    summary,
    getQuantity,
    addItem,
    incrementItem,
    decrementItem,
  };
}
