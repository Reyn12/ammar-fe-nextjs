"use client";

import { useEffect, useState } from "react";

import type { ApiOrder } from "@/modules/customer/order/api-types";
import { fetchOrder } from "@/modules/customer/order/lib/order-api";
import { ApiError } from "@/shared/lib/api-client";

const POLL_INTERVAL_MS = 4000;
const RETRY_INTERVAL_MS = 8000;

/**
 * Ambil pesanan berdasarkan kode dan perbarui terus selama masih menunggu pembayaran,
 * supaya halaman pembayaran berubah sendiri begitu QRIS lunas / kasir konfirmasi tunai.
 */
export function useOrder(code: string | null) {
  const [order, setOrder] = useState<ApiOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const load = async () => {
      try {
        const next = await fetchOrder(code, controller.signal);
        setOrder(next);
        setError(null);

        if (next.payment_status === "unpaid") {
          timer = setTimeout(load, POLL_INTERVAL_MS);
        }
      } catch (caught) {
        if (controller.signal.aborted) return;

        setError(caught instanceof Error ? caught.message : "Gagal memuat pesanan");

        // 404 = kode salah, tidak perlu dicoba lagi; error lain (jaringan) dicoba ulang.
        if (!(caught instanceof ApiError && caught.status === 404)) {
          timer = setTimeout(load, RETRY_INTERVAL_MS);
        }
      }
    };

    load();

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [code]);

  return { order: order?.code === code ? order : null, error };
}
