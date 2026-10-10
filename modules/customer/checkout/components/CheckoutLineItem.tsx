import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";

type CheckoutLineItemProps = {
  name: string;
  note: string;
  /** Catatan bebas dari user */
  userNote?: string;
  quantity: number;
  unitPrice: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onEdit: () => void;
};

const stepperButton =
  "flex h-7 w-7 items-center justify-center rounded-full border border-[#FA52A8] text-base font-semibold leading-none text-[#FA52A8] transition active:bg-[#FA52A8]/10";

export function CheckoutLineItem({
  name,
  note,
  userNote,
  quantity,
  unitPrice,
  onIncrement,
  onDecrement,
  onEdit,
}: CheckoutLineItemProps) {
  return (
    <li className="flex items-start justify-between gap-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-900">{name}</p>
        {note && <p className="mt-0.5 text-xs text-zinc-500">{note}</p>}
        {userNote && (
          <p className="mt-0.5 text-xs italic text-zinc-500">
            Catatan: {userNote}
          </p>
        )}
        <div className="mt-1 flex items-center gap-2">
          <p className="text-sm text-zinc-700">
            {formatMenuPrice(unitPrice * quantity)}
          </p>
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Ubah catatan atau pilihan ${name}`}
            className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-[#FA52A8]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          aria-label={`Kurangi ${name}`}
          className={stepperButton}
        >
          −
        </button>
        <span className="min-w-4 text-center text-sm font-semibold text-zinc-900">
          {quantity}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          aria-label={`Tambah ${name}`}
          className={stepperButton}
        >
          +
        </button>
      </div>
    </li>
  );
}
