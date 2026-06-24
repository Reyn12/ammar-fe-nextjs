type HomeSearchEmptyStateProps = {
  variant: "idle" | "not-found";
};

export function HomeSearchEmptyState({ variant }: HomeSearchEmptyStateProps) {
  if (variant === "not-found") {
    return (
      <div className="flex flex-col items-center px-6 py-16 text-center">
        <p className="text-base font-semibold text-zinc-900">
          Menu tidak ditemukan
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Coba kata kunci lain ya
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <p className="text-base font-semibold text-zinc-900">
        Cari menu favoritmu
      </p>
      <p className="mt-2 text-sm text-zinc-500">
        Ketik nama menu di kolom pencarian
      </p>
    </div>
  );
}
