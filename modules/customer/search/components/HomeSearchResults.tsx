import type { SearchMenuResult } from "@/modules/customer/search/lib/filter-menu-items-by-query";

import { HomeSearchResultItem } from "./HomeSearchResultItem";

type HomeSearchResultsProps = {
  items: SearchMenuResult[];
  query: string;
  quantities: Record<string, number>;
  onAddItem: (itemId: string) => void;
  onIncrementItem: (itemId: string) => void;
  onDecrementItem: (itemId: string) => void;
};

export function HomeSearchResults({
  items,
  query,
  quantities,
  onAddItem,
  onIncrementItem,
  onDecrementItem,
}: HomeSearchResultsProps) {
  return (
    <div className="-mx-4 flex flex-col">
      {items.map((item) => (
        <HomeSearchResultItem
          key={item.id}
          item={item}
          query={query}
          quantity={quantities[item.id] ?? 0}
          onAdd={() => onAddItem(item.id)}
          onIncrement={() => onIncrementItem(item.id)}
          onDecrement={() => onDecrementItem(item.id)}
        />
      ))}
    </div>
  );
}
