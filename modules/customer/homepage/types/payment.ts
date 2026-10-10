export type PaymentMethod = "qris" | "cash";

export const PAYMENT_METHODS: PaymentMethod[] = ["qris", "cash"];

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  qris: "QRIS",
  cash: "Tunai di Kasir",
};

export const PAYMENT_METHOD_DESCRIPTION: Record<PaymentMethod, string> = {
  qris: "Scan & bayar online, otomatis terverifikasi",
  cash: "Bayar langsung ke kasir dengan kode pesanan",
};

export type PlacedOrderStatus = "pending" | "paid" | "expired";

/** Pesanan yang baru dibuat dari checkout (dummy, belum ke backend) */
export type PlacedOrder = {
  code: string;
  customerName: string;
  customerPhone: string;
  /** Kosong kalau user tidak mengisi email */
  customerEmail: string;
  /** null untuk takeaway */
  tableNumber: number | null;
  paymentMethod: PaymentMethod;
  total: number;
  itemCount: number;
  status: PlacedOrderStatus;
  /** epoch ms; hanya dipakai untuk QRIS */
  expiresAt: number;
};
