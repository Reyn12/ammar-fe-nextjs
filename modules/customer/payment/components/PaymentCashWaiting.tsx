"use client";

import { gooeyToast } from "goey-toast";

import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";
import type { OrderContact } from "@/modules/customer/homepage/types/payment";
import type { ApiOrder } from "@/modules/customer/order/api-types";

const STEPS = [
  "Tunjukkan kode pesanan ke kasir",
  "Bayar tunai sesuai total pesanan",
  "Pesananmu langsung diproses dapur",
];

function SvgIcon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function PaymentCashWaiting({
  order,
  contact,
}: {
  order: ApiOrder;
  contact?: OrderContact;
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(order.code);
      gooeyToast.success("Kode pesanan disalin");
    } catch {
      gooeyToast.info("Gagal menyalin, catat kodenya manual ya");
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="flex flex-col items-center pt-2 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#FA52A8]/20" />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#FA52A8] text-white shadow-lg shadow-[#FA52A8]/30">
            <SvgIcon className="h-9 w-9">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <circle cx="12" cy="12" r="2.5" />
              <path d="M6 12h.01M18 12h.01" />
            </SvgIcon>
          </span>
        </div>
        <h2 className="mt-4 text-xl font-bold text-zinc-900">Bayar di Kasir</h2>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Menunggu pembayaran
        </span>
        <p className="mt-2 text-xs text-zinc-400">
          Halaman ini otomatis berubah setelah kasir mengonfirmasi.
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100">
        <div className="px-5 py-5 text-center">
          <p className="text-xs text-zinc-500">Nomor antrean</p>
          <p className="mt-1 text-5xl font-bold tracking-widest text-zinc-900">
            {order.queue_number}
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Kode pesanan{" "}
            <span className="font-semibold text-zinc-700">{order.code}</span>
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-[#FA52A8] hover:text-[#FA52A8]"
          >
            <SvgIcon className="h-3.5 w-3.5">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </SvgIcon>
            Salin kode
          </button>
        </div>

        <div className="relative border-t border-dashed border-zinc-200">
          <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-zinc-50" />
          <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-zinc-50" />
          <div className="flex items-center justify-between bg-[#FA52A8]/5 px-5 py-4">
            <div>
              <p className="text-xs text-zinc-500">Total yang dibayar</p>
              <p className="text-lg font-bold text-[#FA52A8]">
                {formatMenuPrice(order.total_amount)}
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              {contact && <p>{contact.customerName}</p>}
              {order.table_number !== null && <p>Meja {order.table_number}</p>}
            </div>
          </div>
        </div>
      </div>

      <ol className="w-full rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
        {STEPS.map((step, index) => (
          <li key={step} className="flex items-center gap-3 py-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FA52A8]/10 text-xs font-bold text-[#FA52A8]">
              {index + 1}
            </span>
            <span className="text-sm text-zinc-700">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
