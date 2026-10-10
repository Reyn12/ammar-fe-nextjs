"use client";

import { gooeyToast } from "goey-toast";
import { createOrder } from "@/modules/customer/order/lib/order-api";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCatalog } from "@/modules/customer/catalog/catalog-context";
import { useCartContext } from "@/modules/customer/homepage/lib/cart-context";
import { findMenuItemById } from "@/modules/customer/homepage/lib/find-menu-item-by-id";
import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";
import { HomeMenuDetailBottomSheet } from "@/modules/customer/homepage/components/HomeMenuDetailBottomSheet";
import type { CartLineItem, CartSelection } from "@/modules/customer/homepage/types/cart";
import type { PaymentMethod } from "@/modules/customer/homepage/types/payment";
import { ORDER_TYPE_LABEL } from "@/modules/customer/homepage/types/order";

import { CheckoutEmptyState } from "./components/CheckoutEmptyState";
import { CheckoutPaymentMethod } from "./components/CheckoutPaymentMethod";
import { CheckoutHeader } from "./components/CheckoutHeader";
import { CheckoutLineItem } from "./components/CheckoutLineItem";
import { CheckoutCustomerForm } from "./components/CheckoutCustomerForm";
import {
  EMPTY_CUSTOMER_INFO,
  validateCustomerInfo,
  type CustomerInfo,
} from "./lib/validate-customer";
import { describeSelection } from "./lib/describe-selection";

export function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    summary,
    orderType,
    addItem,
    decrementLine,
    updateLine,
    clearCart,
    setOrderContact,
    table,
  } = useCartContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customer, setCustomer] = useState<CustomerInfo>(EMPTY_CUSTOMER_INFO);
  const [showErrors, setShowErrors] = useState(false);
  const customerErrors = validateCustomerInfo(customer);
  const isDineIn = orderType === "dine-in";
  const isMissingTable = isDineIn && table === null;
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
  const { sections } = useCatalog();
  const [editingLine, setEditingLine] = useState<CartLineItem | null>(null);
  const editingItem = editingLine
    ? findMenuItemById(sections, editingLine.menuItemId)
    : undefined;

  const handleConfirmEdit = (selection: CartSelection, quantity: number) => {
    if (!editingLine || !editingItem) return;
    updateLine(editingLine.lineKey, editingItem, selection, quantity);
    setEditingLine(null);
  };

  const lines = Object.values(cart.lines).flatMap((line) => {
    const item = findMenuItemById(sections, line.menuItemId);
    return item ? [{ line, item }] : [];
  });

  const handlePlaceOrder = async () => {
    if (isSubmitting) return;

    if (Object.keys(customerErrors).length > 0 || isMissingTable) {
      setShowErrors(true);
      gooeyToast.info(
        isMissingTable
          ? "Scan QR di meja untuk mengisi nomor meja"
          : "Lengkapi data pemesan dulu",
      );
      return;
    }

    if (!paymentMethod) {
      gooeyToast.info("Pilih metode pembayaran dulu");
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createOrder({
        orderType,
        tableToken: table?.token ?? null,
        paymentMethod,
        customer,
        lines: lines.map(({ line }) => line),
      });

      setOrderContact({
        code: order.code,
        customerName: customer.name.trim(),
        customerPhone: customer.phone.replace(/[\s-]/g, ""),
        customerEmail: customer.email.trim(),
      });
      clearCart();
      router.replace(`/payment?code=${encodeURIComponent(order.code)}`);
    } catch (error) {
      gooeyToast.error(
        error instanceof Error ? error.message : "Pesanan gagal dibuat",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <CheckoutHeader onBack={() => router.back()} />

      <main className="flex flex-1 flex-col gap-3 bg-zinc-50 px-4 py-4 pb-28">
        {lines.length === 0 ? (
          <CheckoutEmptyState onBackToMenu={() => router.replace("/")} />
        ) : (
          <>
            <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
              <p className="text-xs text-zinc-500">Tipe pesanan</p>
              <p className="mt-0.5 text-sm font-semibold text-zinc-900">
                {ORDER_TYPE_LABEL[orderType]}
                {isDineIn && table !== null && ` · Meja ${table.number}`}
              </p>
              {isMissingTable && (
                <p
                  className={
                    showErrors
                      ? "mt-1 text-xs text-red-500"
                      : "mt-1 text-xs text-zinc-500"
                  }
                >
                  Nomor meja belum terdeteksi. Scan QR di meja kamu.
                </p>
              )}
            </section>

            <section className="rounded-2xl bg-white px-4 shadow-sm ring-1 ring-zinc-100">
              <h2 className="pt-4 text-sm font-semibold text-zinc-900">
                Pesanan kamu
              </h2>
              <ul className="divide-y divide-zinc-100">
                {lines.map(({ line, item }) => (
                  <CheckoutLineItem
                    key={line.lineKey}
                    name={item.name}
                    note={describeSelection(item, line.selection)}
                    userNote={line.selection.note?.trim()}
                    quantity={line.quantity}
                    unitPrice={line.unitPrice}
                    onIncrement={() => addItem(item, line.selection)}
                    onDecrement={() => decrementLine(line.lineKey)}
                    onEdit={() => setEditingLine(line)}
                  />
                ))}
              </ul>
            </section>

            <CheckoutCustomerForm
              value={customer}
              errors={showErrors ? customerErrors : {}}
              onChange={setCustomer}
            />

            <CheckoutPaymentMethod
              value={paymentMethod}
              onChange={setPaymentMethod}
            />

            <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
              <h2 className="text-sm font-semibold text-zinc-900">
                Ringkasan pembayaran
              </h2>
              <div className="mt-3 flex justify-between text-sm text-zinc-600">
                <span>Subtotal ({summary.itemCount} item)</span>
                <span>{formatMenuPrice(summary.total)}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-dashed border-zinc-200 pt-3 text-sm font-semibold text-zinc-900">
                <span>Total</span>
                <span>{formatMenuPrice(summary.total)}</span>
              </div>
            </section>
          </>
        )}
      </main>

      {lines.length > 0 && (
        <div className="sticky bottom-0 border-t border-zinc-200 bg-white px-4 py-3">
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="flex w-full disabled:opacity-60 items-center justify-between rounded-xl bg-[#FA52A8] px-4 py-3 text-sm font-semibold text-white transition active:opacity-90"
          >
            <span>
              {isSubmitting
                ? "Memproses..."
                : paymentMethod
                  ? "Buat Pesanan"
                  : "Pilih metode bayar"}
            </span>
            <span>{formatMenuPrice(summary.total)}</span>
          </button>
        </div>
      )}

      <HomeMenuDetailBottomSheet
        item={editingItem ?? null}
        isOpen={editingLine !== null}
        initialSelection={editingLine?.selection}
        initialQuantity={editingLine?.quantity}
        confirmLabel="Simpan Perubahan"
        onClose={() => setEditingLine(null)}
        onConfirm={handleConfirmEdit}
      />
    </div>
  );
}
