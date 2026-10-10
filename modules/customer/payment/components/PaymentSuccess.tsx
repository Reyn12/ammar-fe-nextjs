"use client";

import { motion } from "framer-motion";

import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";
import {
  PAYMENT_METHOD_LABEL,
  type OrderContact,
} from "@/modules/customer/homepage/types/payment";
import type { ApiOrder } from "@/modules/customer/order/api-types";

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

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-zinc-500">{label}</span>
      <span className="text-right font-medium text-zinc-900">{value}</span>
    </div>
  );
}

function NotifyRow({
  icon,
  title,
  target,
}: {
  icon: React.ReactNode;
  title: string;
  target: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#FA52A8] shadow-sm">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-zinc-900">{title}</p>
        <p className="truncate text-xs text-zinc-600">{target}</p>
      </div>
    </li>
  );
}

export function PaymentSuccess({
  order,
  contact,
}: {
  order: ApiOrder;
  contact?: OrderContact;
}) {
  const itemCount = order.items.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="flex flex-col items-center pt-2 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
        >
          <SvgIcon className="h-10 w-10">
            <path d="M20 6 9 17l-5-5" />
          </SvgIcon>
        </motion.div>
        <h2 className="mt-4 text-xl font-bold text-zinc-900">
          Pembayaran Berhasil!
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Pesananmu sedang kami siapkan
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-100">
        <div className="bg-[#FA52A8] px-5 py-4 text-center text-white">
          <p className="text-xs text-white/80">Total dibayar</p>
          <p className="mt-0.5 text-2xl font-bold">
            {formatMenuPrice(order.payment?.total_to_pay ?? order.total_amount)}
          </p>
        </div>

        <div className="relative flex flex-col gap-2.5 px-5 py-4">
          <ReceiptRow label="Kode pesanan" value={order.code} />
          {contact && (
            <ReceiptRow label="Atas nama" value={contact.customerName} />
          )}
          {order.table_number !== null && (
            <ReceiptRow label="Nomor meja" value={`Meja ${order.table_number}`} />
          )}
          <ReceiptRow label="Jumlah item" value={`${itemCount} item`} />
          <ReceiptRow
            label="Metode bayar"
            value={PAYMENT_METHOD_LABEL[order.payment_method]}
          />
        </div>
      </div>

      <div className="w-full rounded-2xl bg-[#FA52A8]/5 p-4 ring-1 ring-[#FA52A8]/10">
        <p className="text-sm font-semibold text-zinc-900">
          Struk pesanan dikirim ke WhatsApp
        </p>
        <p className="mt-0.5 text-xs text-zinc-600">
          Detail pesanan dan bukti pembayaran dikirim ke nomor ini.
        </p>
        {contact && (
        <ul className="mt-3 flex flex-col gap-3">
          <NotifyRow
            icon={
              <SvgIcon className="h-5 w-5">
                <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5Z" />
              </SvgIcon>
            }
            title="WhatsApp"
            target={contact.customerPhone}
          />
        </ul>
        )}
      </div>
    </div>
  );
}
