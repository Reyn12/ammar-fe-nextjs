import {
  ORDER_TYPE_LABEL,
  type OrderType,
} from "@/modules/customer/homepage/types/order";

type HomeOrderTypeCardProps = {
  orderType: OrderType;
  tableNumber: string | number;
  onClickOrderType: () => void;
};

export function HomeOrderTypeCard({
  orderType,
  tableNumber,
  onClickOrderType,
}: HomeOrderTypeCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="flex items-center justify-between gap-3 px-4 py-2">
        <p className="text-sm text-zinc-900">Tipe Pemesanan</p>

        <button
          type="button"
          onClick={onClickOrderType}
          className="flex items-center gap-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-900"
        >
          <span>{ORDER_TYPE_LABEL[orderType]}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-zinc-500"
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {orderType === "dine-in" && (
        <div className="bg-[#FFF0E6] px-4 py-2 text-center">
          <p className="text-sm text-zinc-900">Nomor Meja</p>
          <p className="mt-1 text-xl font-semibold text-zinc-900">
            {tableNumber}
          </p>
        </div>
      )}
    </div>
  );
}
