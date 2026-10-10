import type { ApiOrder } from "@/modules/customer/order/api-types";

export type OrderStatusView = {
  label: string;
  className: string;
};

/** Gabungan status pembayaran + status dapur menjadi satu label untuk customer. */
export function getOrderStatusView(order: ApiOrder): OrderStatusView {
  if (order.payment_status === "expired" || order.status === "cancelled") {
    return { label: "Dibatalkan", className: "bg-red-50 text-red-600" };
  }

  if (order.payment_status === "unpaid") {
    return {
      label:
        order.payment_method === "cash"
          ? "Menunggu bayar di kasir"
          : "Menunggu pembayaran",
      className: "bg-amber-50 text-amber-700",
    };
  }

  switch (order.status) {
    case "cooking":
      return { label: "Sedang dimasak", className: "bg-sky-50 text-sky-700" };
    case "ready":
      return { label: "Siap disajikan", className: "bg-sky-50 text-sky-700" };
    case "completed":
      return { label: "Selesai", className: "bg-emerald-50 text-emerald-700" };
    default:
      return { label: "Diproses", className: "bg-sky-50 text-sky-700" };
  }
}
