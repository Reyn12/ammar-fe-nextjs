export type OrderType = "dine-in" | "takeaway";

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  "dine-in": "Makan di Tempat",
  takeaway: "Bawa Pulang",
};
