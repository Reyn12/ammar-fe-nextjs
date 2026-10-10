"use client";

import { useRouter } from "next/navigation";

import { DUMMY_ORDER_HISTORIES } from "./constants/order-history-dummy";
import { OrderHistoryCard } from "./components/OrderHistoryCard";
import { OrderHistoryEmptyState } from "./components/OrderHistoryEmptyState";
import { OrderHistoryHeader } from "./components/OrderHistoryHeader";

export function OrderHistoryPage() {
  const router = useRouter();
  const orders = DUMMY_ORDER_HISTORIES;

  return (
    <div className="flex flex-1 flex-col">
      <OrderHistoryHeader onBack={() => router.back()} />

      <main className="flex-1 bg-zinc-50 px-4 py-4">
        {orders.length === 0 ? (
          <OrderHistoryEmptyState />
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <OrderHistoryCard key={order.id} order={order} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
