"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/modules/customer/auth/auth-context";
import { GoogleSignInButton } from "@/modules/customer/auth/GoogleSignInButton";
import type { ApiOrder } from "@/modules/customer/order/api-types";

import { OrderHistoryCard } from "./components/OrderHistoryCard";
import { OrderHistoryEmptyState } from "./components/OrderHistoryEmptyState";
import { OrderHistoryHeader } from "./components/OrderHistoryHeader";
import { fetchMyOrders } from "./lib/my-orders";

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; orders: ApiOrder[] };

export function OrderHistoryPage() {
  const router = useRouter();
  const { user, status: authStatus } = useAuth();
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [reloadKey, setReloadKey] = useState(0);
  const isSignedIn = user !== null;

  useEffect(() => {
    if (!isSignedIn) return;

    const controller = new AbortController();

    fetchMyOrders(controller.signal)
      .then((orders) => setState({ status: "ready", orders }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error" });
      });

    return () => controller.abort();
  }, [isSignedIn, reloadKey]);

  const retry = () => {
    setState({ status: "loading" });
    setReloadKey((key) => key + 1);
  };

  return (
    <div className="flex flex-1 flex-col">
      <OrderHistoryHeader onBack={() => router.back()} />

      <main className="flex-1 bg-zinc-50 px-4 py-4">
        {authStatus === "loading" && (
          <p className="py-10 text-center text-sm text-zinc-500">Memuat...</p>
        )}

        {authStatus === "signedOut" && (
          <div className="flex flex-col items-center gap-4 px-2 py-14 text-center">
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Masuk untuk melihat riwayat pesanan
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Pesananmu tersimpan di akun Google yang kamu pakai.
              </p>
            </div>
            <GoogleSignInButton className="max-w-xs" />
          </div>
        )}

        {isSignedIn && state.status === "loading" && (
          <p className="py-10 text-center text-sm text-zinc-500">
            Memuat pesanan...
          </p>
        )}

        {isSignedIn && state.status === "error" && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <p className="text-sm text-zinc-600">
              Riwayat pesanan gagal dimuat.
            </p>
            <button
              type="button"
              onClick={retry}
              className="rounded-xl bg-[#FA52A8] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Coba lagi
            </button>
          </div>
        )}

        {isSignedIn && state.status === "ready" &&
          (state.orders.length === 0 ? (
            <OrderHistoryEmptyState />
          ) : (
            <ul className="space-y-3">
              {state.orders.map((order) => (
                <OrderHistoryCard key={order.code} order={order} />
              ))}
            </ul>
          ))}
      </main>
    </div>
  );
}
