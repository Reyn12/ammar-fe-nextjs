export type OrderType = "dine-in" | "takeaway";

export const ORDER_TYPES: OrderType[] = ["dine-in", "takeaway"];

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  "dine-in": "Makan di Tempat",
  "takeaway": "Bawa Pulang",
};

export const ORDER_TYPE_DESCRIPTION: Record<OrderType, string> = {
  "dine-in": "Pesan dan makan di resto",
  "takeaway": "Pesan lalu bawa pulang",
};
