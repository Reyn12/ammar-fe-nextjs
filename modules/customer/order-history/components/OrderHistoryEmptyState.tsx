export function OrderHistoryEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold text-zinc-900">
        Belum ada pesanan
      </p>
      <p className="mt-1 text-sm text-zinc-500">
        Pesanan yang sudah kamu buat bakal muncul di sini.
      </p>
    </div>
  );
}
