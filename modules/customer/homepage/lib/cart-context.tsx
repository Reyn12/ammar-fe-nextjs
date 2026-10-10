"use client";

import { createContext, Suspense, useContext, useState } from "react";

import { TableQrSync } from "@/modules/customer/homepage/lib/table-qr-sync";
import { useCartState } from "@/modules/customer/homepage/lib/use-cart";
import type { OrderType } from "@/modules/customer/homepage/types/order";
import type { OrderContact } from "@/modules/customer/homepage/types/payment";

export type TableInfo = {
  token: string;
  number: number;
};

type CartContextValue = ReturnType<typeof useCartState> & {
  orderType: OrderType;
  setOrderType: (orderType: OrderType) => void;
  /** Kontak pemesan dari pesanan terakhir */
  orderContact: OrderContact | null;
  setOrderContact: (contact: OrderContact | null) => void;
  /** Terisi dari QR meja (?t=token), divalidasi ke backend */
  table: TableInfo | null;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Menyimpan cart + tipe pesanan + meja supaya tetap ada saat pindah halaman customer */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartState = useCartState();
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [orderContact, setOrderContact] = useState<OrderContact | null>(null);
  const [table, setTable] = useState<TableInfo | null>(null);

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        orderType,
        setOrderType,
        orderContact,
        setOrderContact,
        table,
      }}
    >
      <Suspense fallback={null}>
        <TableQrSync onTable={setTable} />
      </Suspense>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext harus dipakai di dalam CartProvider");
  }
  return context;
}
