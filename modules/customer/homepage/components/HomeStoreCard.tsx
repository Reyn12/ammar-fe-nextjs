type HomeStoreCardProps = {
  nameStore: string;
  openHours: string;
  onClickDetail: () => void;
};

export function HomeStoreCard({
  nameStore,
  openHours,
  onClickDetail,
}: HomeStoreCardProps) {
  return (
    <button
      type="button"
      onClick={onClickDetail}
      className="flex w-full items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 text-left shadow-md"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-zinc-900">{nameStore}</p>
        <p className="mt-0.5 text-xs text-zinc-500">{openHours}</p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 shrink-0 text-zinc-400"
        aria-hidden
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
}
