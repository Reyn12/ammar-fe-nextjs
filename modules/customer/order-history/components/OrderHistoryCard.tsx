import Link from "next/link";

import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";
import { ORDER_TYPE_LABEL } from "@/modules/customer/homepage/types/order";
import type { ApiOrder } from "@/modules/customer/order/api-types";
import { formatOrderDate } from "@/modules/customer/order-history/lib/format-order-date";
import { getOrderStatusView } from "@/modules/customer/order-history/lib/order-status";
import { cn } from "@/shared/lib/cn";

type OrderHistoryCardProps = {
  order: ApiOrder;
};

export function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  const status = getOrderStatusView(order);
  const orderTypeLabel =
    ORDER_TYPE_LABEL[order.order_type === "dine_in" ? "dine-in" : "takeaway"];
  const isWaitingPayment =
    order.payment_status === "unpaid" && order.status !== "cancelled";

  return (
    <li className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-900">
            {order.code}
          </p>
          <p className="mt-0.5 text-xs text-zinc-500">
            {formatOrderDate(order.created_at)} · {orderTypeLabel}
            {order.table_number !== null && ` · Meja ${order.table_number}`}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
            status.className,
          )}
        >
          {status.label}
        </span>
      </div>

      <ul className="mt-3 space-y-2 border-t border-dashed border-zinc-200 pt-3">
        {order.items.map((item, index) => {
          const note = [...item.addons.map((addon) => addon.name), item.notes]
            .filter(Boolean)
            .join(", ");
          const unitPrice =
            item.price + item.addons.reduce((sum, addon) => sum + addon.price, 0);

          return (
            <li
              key={`${item.product_name}-${index}`}
              className="flex items-start justify-between gap-3 text-sm"
            >
              <div className="min-w-0">
                <p className="text-zinc-900">
                  {item.qty}x {item.product_name}
                </p>
                {note && <p className="text-xs text-zinc-500">{note}</p>}
              </div>
              <p className="shrink-0 text-zinc-700">
                {formatMenuPrice(unitPrice * item.qty)}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-3">
        <p className="text-sm text-zinc-500">Total</p>
        <p className="text-sm font-semibold text-zinc-900">
          {formatMenuPrice(order.total_amount)}
        </p>
      </div>

      {isWaitingPayment && (
        <Link
          href={`/payment?code=${encodeURIComponent(order.code)}`}
          className="mt-3 block rounded-lg bg-[#FA52A8] py-2 text-center text-sm font-semibold text-white"
        >
          Lanjut pembayaran
        </Link>
      )}
    </li>
  );
}
