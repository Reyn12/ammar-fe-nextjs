"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useCartContext } from "@/modules/customer/homepage/lib/cart-context";
import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";
import { useOrder } from "@/modules/customer/order/lib/use-order";

import { PaymentCashWaiting } from "./components/PaymentCashWaiting";
import { PaymentSuccess } from "./components/PaymentSuccess";

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function CenteredMessage({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold text-zinc-900">{title}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-4 rounded-xl bg-[#FA52A8] px-5 py-2.5 text-sm font-semibold text-white"
      >
        {actionLabel}
      </button>
    </div>
  );
}

export function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { orderContact, setOrderContact } = useCartContext();
  const code = searchParams.get("code");
  const { order, error } = useOrder(code);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const backToMenu = () => {
    setOrderContact(null);
    router.replace("/");
  };

  if (!code) {
    return (
      <CenteredMessage
        title="Belum ada pesanan"
        actionLabel="Lihat Menu"
        onAction={backToMenu}
      />
    );
  }

  if (error && !order) {
    return (
      <CenteredMessage
        title={error}
        actionLabel="Kembali ke Menu"
        onAction={backToMenu}
      />
    );
  }

  if (!order) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-zinc-500">
        Memuat pesanan...
      </div>
    );
  }

  const contact = orderContact?.code === order.code ? orderContact : undefined;
  const isQris = order.payment_method === "qris";
  const isPaid = order.payment_status === "paid";
  const isExpired =
    order.payment_status === "expired" || order.status === "cancelled";
  const expiresAt = order.payment?.expires_at ?? order.expires_at;
  const remainingMs = expiresAt ? Date.parse(expiresAt) - now : 0;
  const qrUrl = order.payment?.qr_url;
  const totalToPay = order.payment?.total_to_pay ?? order.total_amount;

  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-4 py-4 text-center shadow-sm">
        <h1 className="text-base font-semibold text-zinc-900">Pembayaran</h1>
      </header>

      <main className="flex flex-1 flex-col items-center gap-4 px-4 py-6">
        {isPaid ? (
          <PaymentSuccess order={order} contact={contact} />
        ) : isExpired ? (
          <div className="w-full rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-zinc-100">
            <h2 className="text-lg font-bold text-zinc-900">
              Pembayaran kedaluwarsa
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Waktu pembayaran untuk {order.code} habis. Silakan buat pesanan
              lagi.
            </p>
          </div>
        ) : isQris ? (
          <div className="w-full rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-zinc-100">
            <p className="text-xs text-zinc-500">QRIS</p>
            <h2 className="mt-1 text-lg font-bold text-zinc-900">
              Scan untuk membayar
            </h2>
            <p className="mt-1 text-2xl font-bold text-[#FA52A8]">
              {formatMenuPrice(totalToPay)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {order.code}
              {contact && ` · Atas nama ${contact.customerName}`}
              {order.table_number !== null && ` · Meja ${order.table_number}`}
            </p>

            {qrUrl ? (
              <div className="mt-4 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element -- QR dari Tripay, domain eksternal */}
                <img
                  src={qrUrl}
                  alt="Kode QRIS"
                  className="h-52 w-52 rounded-lg bg-white object-contain"
                />
              </div>
            ) : (
              <p className="mt-4 text-sm text-zinc-500">QR belum tersedia.</p>
            )}

            {order.payment && order.payment.fee_amount > 0 && (
              <p className="mt-2 text-xs text-zinc-500">
                Termasuk biaya layanan{" "}
                {formatMenuPrice(order.payment.fee_amount)}
              </p>
            )}

            {expiresAt && (
              <p className="mt-3 text-sm text-zinc-600">
                Bayar dalam{" "}
                <span className="font-semibold text-zinc-900">
                  {formatCountdown(remainingMs)}
                </span>
              </p>
            )}
            <p className="mt-2 text-xs text-zinc-400">
              Halaman ini otomatis berubah setelah pembayaran berhasil.
            </p>
          </div>
        ) : (
          <PaymentCashWaiting order={order} contact={contact} />
        )}
      </main>

      <div className="sticky bottom-0 flex gap-3 border-t border-zinc-200 bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => router.push("/order-history")}
          className="flex-1 rounded-xl border border-[#FA52A8] py-3 text-sm font-semibold text-[#FA52A8]"
        >
          Riwayat Pesanan
        </button>
        <button
          type="button"
          onClick={backToMenu}
          className="flex-1 rounded-xl bg-[#FA52A8] py-3 text-sm font-semibold text-white"
        >
          Kembali ke Menu
        </button>
      </div>
    </div>
  );
}
