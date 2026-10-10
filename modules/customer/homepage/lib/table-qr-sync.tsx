"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type TableQrSyncProps = {
  onTableNumber: (tableNumber: number) => void;
};

/** Baca nomor meja dari URL QR (?table=12) lalu simpan ke cart context */
export function TableQrSync({ onTableNumber }: TableQrSyncProps) {
  const searchParams = useSearchParams();
  const rawTable = searchParams.get("table");

  useEffect(() => {
    const tableNumber = Number(rawTable);
    if (Number.isInteger(tableNumber) && tableNumber > 0) {
      onTableNumber(tableNumber);
    }
  }, [rawTable, onTableNumber]);

  return null;
}
