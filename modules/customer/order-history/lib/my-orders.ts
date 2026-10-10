import type { ApiOrder } from "@/modules/customer/order/api-types";
import { apiGet } from "@/shared/lib/api-client";

export async function fetchMyOrders(signal?: AbortSignal) {
  const response = await apiGet<{ data: ApiOrder[] }>("/me/orders", signal);
  return response.data;
}
