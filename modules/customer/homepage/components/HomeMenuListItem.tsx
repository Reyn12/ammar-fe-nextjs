import Image from "next/image";

import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";

type HomeMenuListItemProps = {
  imageUrl: string;
  name: string;
  price: number;
  onAdd: () => void;
};

export function HomeMenuListItem({
  imageUrl,
  name,
  price,
  onAdd,
}: HomeMenuListItemProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative aspect-[242/208] w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 430px) 50vw, 215px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="text-xs font-bold leading-4 text-zinc-900">{name}</h3>
        <p className="text-sm font-bold text-zinc-900">
          {formatMenuPrice(price)}
        </p>

        <button
          type="button"
          onClick={onAdd}
          className="mt-auto w-full rounded-full border border-[#FA52A8] py-1.5 text-sm font-medium text-[#FA52A8] transition hover:bg-[#FA52A8]/5"
        >
          Tambah
        </button>
      </div>
    </article>
  );
}
