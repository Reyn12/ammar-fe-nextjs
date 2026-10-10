import Image from "next/image";

import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";

import { HomeMenuQuantityStepper } from "./HomeMenuQuantityStepper";

type HomeMenuListItemProps = {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  isAvailable?: boolean;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function HomeMenuListItem({
  imageUrl,
  name,
  price,
  quantity,
  isAvailable = true,
  onAdd,
  onIncrement,
  onDecrement,
}: HomeMenuListItemProps) {
  const isInCart = quantity > 0;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onAdd}
        aria-label={`Lihat detail ${name}`}
        className="flex flex-col text-left"
      >
        <div className="relative aspect-[242/208] w-full">
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="(max-width: 430px) 50vw, 215px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 pb-0">
          <h3 className="text-xs font-bold leading-4 text-zinc-900">{name}</h3>
          <p className="text-sm font-bold text-zinc-900">
            {formatMenuPrice(price)}
          </p>
        </div>
      </button>

      <div className="flex flex-1 flex-col p-3 pt-2">
        {!isAvailable ? (
          <button
            type="button"
            disabled
            className="mt-auto w-full cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-100 py-1.5 text-sm font-medium text-zinc-400"
          >
            Habis
          </button>
        ) : isInCart ? (
          <HomeMenuQuantityStepper
            quantity={quantity}
            itemName={name}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
            className="mt-auto flex items-center justify-center gap-4 py-1"
          />
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="mt-auto w-full rounded-lg border border-[#FA52A8] py-1.5 text-sm font-medium text-[#FA52A8] transition hover:bg-[#FA52A8]/5"
          >
            Tambah
          </button>
        )}
      </div>
    </article>
  );
}
