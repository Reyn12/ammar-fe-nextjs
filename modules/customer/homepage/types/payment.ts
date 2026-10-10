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

/** Data kontak yang diisi saat checkout; dipakai di halaman pembayaran. */
export type OrderContact = {
  code: string;
  customerName: string;
  customerPhone: string;
  /** Kosong kalau user tidak mengisi email */
  customerEmail: string;
};
