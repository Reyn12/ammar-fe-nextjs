import type { ApiOrder } from "@/modules/customer/order/api-types";
import type { CartLineItem } from "@/modules/customer/homepage/types/cart";
import type { OrderType } from "@/modules/customer/homepage/types/order";
import type { PaymentMethod } from "@/modules/customer/homepage/types/payment";
import { apiGet, apiPost, BRANCH_ID } from "@/shared/lib/api-client";

type CreateOrderInput = {
  orderType: OrderType;
  tableToken: string | null;
  paymentMethod: PaymentMethod;
  customer: { name: string; phone: string; email: string };
  lines: CartLineItem[];
};

/** Variant dan addon yang dipilih, dikirim sebagai daftar id addon. */
function toAddonIds(line: CartLineItem) {
  return [
    ...Object.values(line.selection.variants),
    ...Object.values(line.selection.addons).flat(),
  ].map(Number);
}

export async function createOrder(input: CreateOrderInput) {
  const response = await apiPost<{ data: ApiOrder }>("/orders", {
    branch_id: Number(BRANCH_ID),
    order_type: input.orderType === "dine-in" ? "dine_in" : "takeaway",
    table_token: input.orderType === "dine-in" ? input.tableToken : null,
    payment_method: input.paymentMethod,
    customer: {
      name: input.customer.name.trim(),
      phone: input.customer.phone.replace(/[\s-]/g, ""),
      email: input.customer.email.trim() || null,
    },
    items: input.lines.map((line) => ({
      product_id: Number(line.menuItemId),
      qty: line.quantity,
      notes: line.selection.note?.trim() || null,
      addon_ids: toAddonIds(line),
    })),
  });

  return response.data;
}

export async function fetchOrder(code: string, signal?: AbortSignal) {
  const response = await apiGet<{ data: ApiOrder }>(
    `/orders/${encodeURIComponent(code)}`,
    signal,
  );

  return response.data;
}
