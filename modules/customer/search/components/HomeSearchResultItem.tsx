import Image from "next/image";

import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";
import {
  getSearchResultSectionLabel,
  type SearchMenuResult,
} from "@/modules/customer/search/lib/filter-menu-items-by-query";
import { cn } from "@/shared/lib/cn";

type HomeSearchResultItemProps = {
  item: SearchMenuResult;
  query: string;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

function highlightQuery(text: string, query: string) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return text;

  const regex = new RegExp(`(${normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === normalizedQuery.toLowerCase()) {
      return (
        <span key={`${part}-${index}`} className="text-[#FA52A8]">
          {part}
        </span>
      );
    }

    return part;
  });
}

export function HomeSearchResultItem({
  item,
  query,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: HomeSearchResultItemProps) {
  const sectionLabel = getSearchResultSectionLabel(item.sectionTitle);
  const isInCart = quantity > 0;

  return (
    <article
      className={cn(
        "relative flex gap-3 border-b border-zinc-200 px-4 py-3",
        isInCart && "bg-[#FA52A8]/[0.03]",
      )}
    >
      {isInCart && (
        <span
          className="absolute inset-y-0 left-0 w-1 bg-[#FA52A8]"
          aria-hidden
        />
      )}

      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-sm leading-5">
          <span className="font-bold text-[#FA52A8]">{sectionLabel}</span>
          <span className="font-bold text-zinc-900"> {item.name}</span>
        </h3>

        <p className="mt-1 line-clamp-2 text-xs leading-4 text-zinc-500">
          {highlightQuery(item.sectionTitle, query)}
        </p>

        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="text-sm font-bold text-zinc-900">
            {formatMenuPrice(item.price)}
          </p>

          {isInCart ? (
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={onDecrement}
                aria-label={`Kurangi ${item.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:border-[#FA52A8] hover:text-[#FA52A8]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  className="h-3.5 w-3.5"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                </svg>
              </button>

              <span className="min-w-4 text-center text-sm font-semibold text-zinc-900">
                {quantity}
              </span>

              <button
                type="button"
                onClick={onIncrement}
                aria-label={`Tambah ${item.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:border-[#FA52A8] hover:text-[#FA52A8]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  className="h-3.5 w-3.5"
                  aria-hidden
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onAdd}
              className="shrink-0 rounded-lg border border-[#FA52A8] px-4 py-1.5 text-sm font-medium text-[#FA52A8] transition hover:bg-[#FA52A8]/5"
            >
              Tambah
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
