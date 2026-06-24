"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { HOME_MENU_SECTIONS } from "@/modules/customer/homepage/constants/menu-sections";

import { HomeSearchBar } from "./components/HomeSearchBar";
import { HomeSearchEmptyState } from "./components/HomeSearchEmptyState";
import { HomeSearchResults } from "./components/HomeSearchResults";
import { filterMenuItemsByQuery } from "./lib/filter-menu-items-by-query";

export function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const results = useMemo(
    () => filterMenuItemsByQuery(HOME_MENU_SECTIONS, query),
    [query],
  );

  const handleAddItem = (itemId: string) => {
    setQuantities((current) => ({
      ...current,
      [itemId]: (current[itemId] ?? 0) + 1,
    }));
  };

  const handleIncrementItem = (itemId: string) => {
    setQuantities((current) => ({
      ...current,
      [itemId]: (current[itemId] ?? 0) + 1,
    }));
  };

  const handleDecrementItem = (itemId: string) => {
    setQuantities((current) => {
      const nextQuantity = (current[itemId] ?? 0) - 1;
      if (nextQuantity <= 0) {
        const { [itemId]: _, ...rest } = current;
        return rest;
      }

      return {
        ...current,
        [itemId]: nextQuantity,
      };
    });
  };

  const trimmedQuery = query.trim();
  const showIdleState = trimmedQuery.length === 0;
  const showNotFoundState = trimmedQuery.length > 0 && results.length === 0;

  return (
    <div className="flex flex-1 flex-col">
      <HomeSearchBar
        value={query}
        onChange={setQuery}
        onBack={() => router.back()}
      />

      <main className="flex-1 px-4 py-4">
        {showIdleState && <HomeSearchEmptyState variant="idle" />}

        {showNotFoundState && <HomeSearchEmptyState variant="not-found" />}

        {!showIdleState && !showNotFoundState && (
          <HomeSearchResults
            items={results}
            query={query}
            quantities={quantities}
            onAddItem={handleAddItem}
            onIncrementItem={handleIncrementItem}
            onDecrementItem={handleDecrementItem}
          />
        )}
      </main>
    </div>
  );
}
