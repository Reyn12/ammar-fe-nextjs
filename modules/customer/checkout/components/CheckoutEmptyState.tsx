type CheckoutEmptyStateProps = {
  onBackToMenu: () => void;
};

export function CheckoutEmptyState({ onBackToMenu }: CheckoutEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold text-zinc-900">Keranjang kosong</p>
      <p className="mt-1 text-sm text-zinc-500">
        Yuk pilih menu favoritmu dulu.
      </p>
      <button
        type="button"
        onClick={onBackToMenu}
        className="mt-4 rounded-xl bg-[#FA52A8] px-5 py-2.5 text-sm font-semibold text-white"
      >
        Lihat Menu
      </button>
    </div>
  );
}
