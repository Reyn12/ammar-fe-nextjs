"use client";

type LoadingDialogProps = {
  open: boolean;
  message?: string;
};

/** Dialog loading layar penuh: menahan klik user selama aksi penting (bayar, login) berjalan. */
export function LoadingDialog({ open, message = "Memproses..." }: LoadingDialogProps) {
  if (!open) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-busy="true"
      aria-label={message}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6"
    >
      <div className="flex w-full max-w-[260px] flex-col items-center gap-3 rounded-2xl bg-white px-6 py-6 shadow-xl">
        <span
          className="h-9 w-9 animate-spin rounded-full border-4 border-[#FA52A8]/20 border-t-[#FA52A8]"
          aria-hidden
        />
        <p className="text-center text-sm font-medium text-zinc-900">{message}</p>
      </div>
    </div>
  );
}
