import {
  ORDER_TYPE_LABEL,
} from "@/modules/customer/homepage/types/order";
import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";
import { formatOrderDate } from "@/modules/customer/order-history/lib/format-order-date";
import type {
  OrderHistory,
  OrderHistoryStatus,
} from "@/modules/customer/order-history/types/order-history";
import { cn } from "@/shared/lib/cn";

const STATUS_LABEL: Record<OrderHistoryStatus, string> = {
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

const STATUS_CLASS: Record<OrderHistoryStatus, string> = {
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-600",
};

type OrderHistoryCardProps = {
  order: OrderHistory;
};

export function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  return (
    <li className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-900">
            {order.code}
          </p>
          <p className="mt-0.5 text-xs text-zinc-500">
            {formatOrderDate(order.createdAt)} · {ORDER_TYPE_LABEL[order.orderType]}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
            STATUS_CLASS[order.status],
          )}
        >
          {STATUS_LABEL[order.status]}
        </span>
      </div>

      <ul className="mt-3 space-y-2 border-t border-dashed border-zinc-200 pt-3">
        {order.items.map((item) => (
          <li
            key={`${item.name}-${item.note ?? ""}`}
            className="flex items-start justify-between gap-3 text-sm"
          >
            <div className="min-w-0">
              <p className="text-zinc-900">
                {item.quantity}x {item.name}
              </p>
              {item.note && (
                <p className="text-xs text-zinc-500">{item.note}</p>
              )}
            </div>
            <p className="shrink-0 text-zinc-700">
              {formatMenuPrice(item.unitPrice * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-3">
        <p className="text-sm text-zinc-500">Total</p>
        <p className="text-sm font-semibold text-zinc-900">
          {formatMenuPrice(order.total)}
        </p>
      </div>
    </li>
  );
}
