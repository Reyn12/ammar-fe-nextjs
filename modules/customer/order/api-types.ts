/** Bentuk response API Laravel untuk pesanan (OrderResource). */

export type ApiPaymentStatus = "unpaid" | "paid" | "expired";

export type ApiOrderPayment = {
  method: string | null;
  status: "unpaid" | "paid" | "expired" | "failed" | "refund";
  qr_url: string | null;
  qr_string: string | null;
  checkout_url: string | null;
  amount: number;
  fee_amount: number;
  total_to_pay: number;
  expires_at: string | null;
};

export type ApiOrderItem = {
  product_name: string;
  qty: number;
  price: number;
  notes: string | null;
  addons: { name: string; price: number }[];
};

export type ApiOrder = {
  code: string;
  /** 3 angka belakang kode, dipanggil dapur (mis. "021") */
  queue_number: string;
  order_type: "dine_in" | "takeaway";
  status: "pending" | "cooking" | "ready" | "completed" | "cancelled";
  table_number: number | null;
  payment_method: "qris" | "cash";
  payment_status: ApiPaymentStatus;
  total_amount: number;
  tax_amount: number;
  paid_at: string | null;
  expires_at: string | null;
  created_at: string;
  items: ApiOrderItem[];
  payment: ApiOrderPayment | null;
};
