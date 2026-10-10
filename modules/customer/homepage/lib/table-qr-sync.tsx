"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import type { TableInfo } from "@/modules/customer/homepage/lib/cart-context";
import { apiGet } from "@/shared/lib/api-client";

type TableQrSyncProps = {
  onTable: (table: TableInfo | null) => void;
};

/** Baca token meja dari URL QR (?t=token), validasi ke backend, lalu simpan ke cart context. */
export function TableQrSync({ onTable }: TableQrSyncProps) {
  const searchParams = useSearchParams();
  const token = searchParams.get("t");

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();

    apiGet<{ data: { table_number: number } }>(
      `/tables/${encodeURIComponent(token)}`,
      controller.signal,
    )
      .then((response) =>
        onTable({ token, number: response.data.table_number }),
      )
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        onTable(null); // token tidak valid / meja nonaktif
      });

    return () => controller.abort();
  }, [token, onTable]);

  return null;
}
