"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCartContext } from "@/modules/customer/homepage/lib/cart-context";
import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";
import { PAYMENT_METHOD_LABEL } from "@/modules/customer/homepage/types/payment";

import { PaymentQrCode } from "./components/PaymentQrCode";

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function PaymentPage() {
  const router = useRouter();
  const { placedOrder, setPlacedOrder } = useCartContext();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!placedOrder) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold text-zinc-900">
          Belum ada pesanan
        </p>
        <button
          type="button"
          onClick={() => router.replace("/")}
          className="mt-4 rounded-xl bg-[#FA52A8] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Lihat Menu
        </button>
      </div>
    );
  }

  const isQris = placedOrder.paymentMethod === "qris";
  const remainingMs = placedOrder.expiresAt - now;
  const isExpired =
    placedOrder.status === "expired" ||
    (isQris && placedOrder.status === "pending" && remainingMs <= 0);
  const isPaid = placedOrder.status === "paid";

  const markPaid = () => setPlacedOrder({ ...placedOrder, status: "paid" });

  const title = isPaid
    ? "Pembayaran berhasil"
    : isExpired
      ? "Pembayaran kedaluwarsa"
      : isQris
        ? "Scan untuk membayar"
        : "Bayar di kasir";

  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-4 py-4 text-center shadow-sm">
        <h1 className="text-base font-semibold text-zinc-900">Pembayaran</h1>
      </header>

      <main className="flex flex-1 flex-col items-center gap-4 px-4 py-6">
        <div className="w-full rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-zinc-100">
          <p className="text-xs text-zinc-500">{PAYMENT_METHOD_LABEL[placedOrder.paymentMethod]}</p>
          <h2 className="mt-1 text-lg font-bold text-zinc-900">{title}</h2>
          <p className="mt-1 text-2xl font-bold text-[#FA52A8]">
            {formatMenuPrice(placedOrder.total)}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Atas nama {placedOrder.customerName}
            {placedOrder.tableNumber !== null &&
              ` · Meja ${placedOrder.tableNumber}`}
          </p>

          {!isPaid && !isExpired && isQris && (
            <>
              <div className="mt-4 flex justify-center">
                <PaymentQrCode value={placedOrder.code} />
              </div>
              <p className="mt-3 text-sm text-zinc-600">
                Bayar dalam{" "}
                <span className="font-semibold text-zinc-900">
                  {formatCountdown(remainingMs)}
                </span>
              </p>
            </>
          )}

          {!isPaid && !isExpired && !isQris && (
            <div className="mt-4 rounded-xl bg-zinc-50 py-4">
              <p className="text-xs text-zinc-500">Kode pesanan</p>
              <p className="mt-1 text-xl font-bold tracking-wider text-zinc-900">
                {placedOrder.code}
              </p>
              <p className="mt-2 px-4 text-sm text-zinc-600">
                Tunjukkan kode ini ke kasir lalu bayar sesuai total di atas.
              </p>
            </div>
          )}

          {isPaid && (
            <>
              <p className="mt-4 text-sm text-zinc-600">
                Pesananmu{" "}
                <span className="font-semibold">{placedOrder.code}</span> sudah
                dibayar dan sedang diproses.
              </p>
              <div className="mt-4 rounded-xl bg-[#FA52A8]/5 p-3 text-left text-sm text-zinc-700">
                <p className="font-semibold text-zinc-900">
                  Cek WhatsApp{placedOrder.customerEmail && " dan email"} kamu
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Detail pesanan dan bukti transaksi dikirim ke WhatsApp{" "}
                  <span className="font-medium">{placedOrder.customerPhone}</span>
                  {placedOrder.customerEmail && (
                    <>
                      {" "}
                      dan email{" "}
                      <span className="font-medium">
                        {placedOrder.customerEmail}
                      </span>
                    </>
                  )}
                  .
                </p>
              </div>
            </>
          )}

          {isExpired && (
            <p className="mt-4 text-sm text-zinc-600">
              Waktu pembayaran habis. Silakan buat pesanan lagi.
            </p>
          )}
        </div>

        {!isPaid && !isExpired && (
          <button
            type="button"
            onClick={markPaid}
            className="w-full rounded-xl border border-dashed border-zinc-300 py-2.5 text-xs text-zinc-500"
          >
            Simulasi (dummy):{" "}
            {isQris ? "pembayaran QRIS berhasil" : "kasir sudah terima uang"}
          </button>
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
          onClick={() => {
            setPlacedOrder(null);
            router.replace("/");
          }}
          className="flex-1 rounded-xl bg-[#FA52A8] py-3 text-sm font-semibold text-white"
        >
          Kembali ke Menu
        </button>
      </div>
    </div>
  );
}
