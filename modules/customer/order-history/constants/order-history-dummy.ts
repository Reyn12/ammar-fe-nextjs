import type { OrderHistory } from "@/modules/customer/order-history/types/order-history";

export const DUMMY_ORDER_HISTORIES: OrderHistory[] = [
  {
    id: "order-1",
    code: "AMR-20261009-003",
    createdAt: "2026-10-09T12:15:00+07:00",
    orderType: "dine-in",
    status: "completed",
    items: [
      {
        name: "Ayam Bakar / Goreng 1 Potong",
        quantity: 2,
        note: "Bakar, Lv 1",
        unitPrice: 30_000,
      },
      { name: "Es Teh Manis", quantity: 2, unitPrice: 6_000 },
    ],
    total: 72_000,
  },
  {
    id: "order-2",
    code: "AMR-20261005-012",
    createdAt: "2026-10-05T19:40:00+07:00",
    orderType: "takeaway",
    status: "completed",
    items: [
      {
        name: "Ayam Bakar / Goreng 1 Potong",
        quantity: 1,
        note: "Goreng, Lv 2",
        unitPrice: 31_000,
      },
    ],
    total: 31_000,
  },
  {
    id: "order-3",
    code: "AMR-20260928-007",
    createdAt: "2026-09-28T13:05:00+07:00",
    orderType: "dine-in",
    status: "cancelled",
    items: [{ name: "Es Teh Manis", quantity: 3, unitPrice: 6_000 }],
    total: 18_000,
  },
];
