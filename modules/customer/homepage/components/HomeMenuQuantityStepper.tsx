type HomeMenuQuantityStepperProps = {
  quantity: number;
  itemName: string;
  onDecrement: () => void;
  onIncrement: () => void;
  className?: string;
};

export function HomeMenuQuantityStepper({
  quantity,
  itemName,
  onDecrement,
  onIncrement,
  className,
}: HomeMenuQuantityStepperProps) {
  return (
    <div className={className ?? "flex items-center justify-center gap-4"}>
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Kurangi ${itemName}`}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:border-[#FA52A8] hover:text-[#FA52A8]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="h-4 w-4"
          aria-hidden
        >
          <path d="M5 12h14" />
        </svg>
      </button>

      <span className="min-w-5 text-center text-sm font-semibold text-zinc-900">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Tambah ${itemName}`}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:border-[#FA52A8] hover:text-[#FA52A8]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="h-4 w-4"
          aria-hidden
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
