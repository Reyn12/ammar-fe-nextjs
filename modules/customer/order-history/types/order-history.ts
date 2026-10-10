import type { OrderType } from "@/modules/customer/homepage/types/order";

export type OrderHistoryStatus = "completed" | "cancelled";

export type OrderHistoryItem = {
  name: string;
  quantity: number;
  /** Ringkasan variant/addon, mis. "Bakar, Lv 1" */
  note?: string;
  /** Harga satuan termasuk variant/addon */
  unitPrice: number;
};

export type OrderHistory = {
  id: string;
  code: string;
  /** ISO date string */
  createdAt: string;
  orderType: OrderType;
  status: OrderHistoryStatus;
  items: OrderHistoryItem[];
  total: number;
};
