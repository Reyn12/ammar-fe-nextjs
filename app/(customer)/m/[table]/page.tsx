import { redirect } from "next/navigation";

/**
 * Link di QR meja: /m/{nomor meja}?t={token}. Nomor di URL hanya penanda;
 * yang dipercaya adalah token, jadi cukup diteruskan ke beranda.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;

  redirect(t ? `/?t=${encodeURIComponent(t)}` : "/");
}
