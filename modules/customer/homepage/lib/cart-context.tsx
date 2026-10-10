"use client";

import { createContext, Suspense, useContext, useState } from "react";

import { TableQrSync } from "@/modules/customer/homepage/lib/table-qr-sync";
import { useCartState } from "@/modules/customer/homepage/lib/use-cart";
import type { OrderType } from "@/modules/customer/homepage/types/order";
import type { PlacedOrder } from "@/modules/customer/homepage/types/payment";

type CartContextValue = ReturnType<typeof useCartState> & {
  orderType: OrderType;
  setOrderType: (orderType: OrderType) => void;
  placedOrder: PlacedOrder | null;
  setPlacedOrder: (order: PlacedOrder | null) => void;
  /** Terisi otomatis dari QR meja (?table=12) */
  tableNumber: number | null;
  setTableNumber: (tableNumber: number | null) => void;
};

/** Nomor meja sementara sampai QR meja dipasang; ditimpa oleh ?table= */
const DUMMY_TABLE_NUMBER = 10;

const CartContext = createContext<CartContextValue | null>(null);

/** Menyimpan cart + tipe pesanan supaya tetap ada saat pindah halaman customer */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartState = useCartState();
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [tableNumber, setTableNumber] = useState<number | null>(
    DUMMY_TABLE_NUMBER,
  );

  return (
    <CartContext.Provider value={{
        ...cartState,
        orderType,
        setOrderType,
        placedOrder,
        setPlacedOrder,
        tableNumber,
        setTableNumber,
      }}>
      <Suspense fallback={null}>
        <TableQrSync onTableNumber={setTableNumber} />
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
