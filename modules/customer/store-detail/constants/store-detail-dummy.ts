import type { StoreDetail } from "@/modules/customer/store-detail/types/store-detail";

export const DUMMY_STORE_DETAIL: StoreDetail = {
  name: "RM Ayam Bakar Ammar – Bandung Kota",
  description:
    "Rumah makan ayam bakar dan goreng dengan bumbu khas, cocok untuk makan bersama keluarga.",
  address: "Jl. Asia Afrika No. 100, Braga, Kec. Sumur Bandung, Kota Bandung",
  phone: "0812-3456-7890",
  openingHours: [
    { day: "Senin", hours: "00:00-23:59" },
    { day: "Selasa", hours: "00:00-23:59" },
    { day: "Rabu", hours: "00:00-23:59" },
    { day: "Kamis", hours: "00:00-23:59" },
    { day: "Jumat", hours: "00:00-23:59" },
    { day: "Sabtu", hours: "00:00-23:59" },
    { day: "Minggu", hours: "00:00-23:59" },
  ],
  orderTypes: ["dine-in", "takeaway"],
};
