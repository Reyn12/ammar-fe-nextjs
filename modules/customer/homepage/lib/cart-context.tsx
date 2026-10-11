"use client";

import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";

import { useCatalog } from "@/modules/customer/catalog/catalog-context";
import { TableQrSync } from "@/modules/customer/homepage/lib/table-qr-sync";
import { useCartState } from "@/modules/customer/homepage/lib/use-cart";
import type { OrderType } from "@/modules/customer/homepage/types/order";
import type { OrderContact } from "@/modules/customer/homepage/types/payment";
import { readStored, writeStored } from "@/shared/lib/safe-storage";

export type TableInfo = {
  token: string;
  number: number;
};

const SESSION_STORAGE_KEY = "ammar:session";
/** Meja & tipe pesanan disimpan selama pelanggan masih di restoran. */
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000;

type StoredSession = {
  orderType: OrderType;
  table: TableInfo | null;
  orderContact: OrderContact | null;
};

type CartContextValue = ReturnType<typeof useCartState> & {
  orderType: OrderType;
  setOrderType: (orderType: OrderType) => void;
  /** Kontak pemesan dari pesanan terakhir */
  orderContact: OrderContact | null;
  setOrderContact: (contact: OrderContact | null) => void;
  /** false sampai cart & sesi dipulihkan dari localStorage */
  isHydrated: boolean;
  /** Terisi dari QR meja (?t=token), divalidasi ke backend */
  table: TableInfo | null;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Menyimpan cart + tipe pesanan + meja supaya tetap ada saat pindah halaman customer */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartState = useCartState();
  const { sections, status: catalogStatus } = useCatalog();
  const { isHydrated: isCartHydrated, syncWithMenu } = cartState;
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [orderContact, setOrderContact] = useState<OrderContact | null>(null);
  const [table, setTable] = useState<TableInfo | null>(null);
  const [isSessionHydrated, setIsSessionHydrated] = useState(false);

  // Cart tersimpan disamakan dengan menu terbaru begitu menu selesai dimuat.
  useEffect(() => {
    if (isCartHydrated && catalogStatus === "ready") syncWithMenu(sections);
  }, [isCartHydrated, catalogStatus, sections, syncWithMenu]);

  // Pulihkan meja, tipe pesanan, dan kontak setelah refresh / buka lagi web-nya.
  useEffect(() => {
    const saved = readStored<StoredSession>(SESSION_STORAGE_KEY, SESSION_MAX_AGE_MS);
    if (saved) {
      /* eslint-disable react-hooks/set-state-in-effect -- pulihkan data dari localStorage setelah mount */
      if (saved.orderType === "dine-in" || saved.orderType === "takeaway") {
        setOrderType(saved.orderType);
      }
      // Hasil scan QR (?t=) yang masuk belakangan menimpa meja tersimpan ini.
      setTable((current) => current ?? saved.table);
      setOrderContact(saved.orderContact);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
    setIsSessionHydrated(true);
  }, []);

  useEffect(() => {
    if (isSessionHydrated) {
      writeStored<StoredSession>(SESSION_STORAGE_KEY, {
        orderType,
        table,
        orderContact,
      });
    }
  }, [isSessionHydrated, orderType, table, orderContact]);

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        isHydrated: cartState.isHydrated && isSessionHydrated,
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
