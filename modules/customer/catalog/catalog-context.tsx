"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ApiBranch,
  ApiMenuCategory,
} from "@/modules/customer/catalog/api-types";
import { mapBranch } from "@/modules/customer/catalog/map-store";
import { mapMenuCategories } from "@/modules/customer/catalog/map-menu";
import type { MenuSection } from "@/modules/customer/homepage/types/menu-section";
import type { StoreDetail } from "@/modules/customer/store-detail/types/store-detail";
import { apiGet, BRANCH_ID } from "@/shared/lib/api-client";

type CatalogStatus = "loading" | "ready" | "error";

type CatalogContextValue = {
  sections: MenuSection[];
  /** null selama menu/toko belum selesai dimuat */
  store: StoreDetail | null;
  status: CatalogStatus;
  reload: () => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

/** Menu + info toko dari API Laravel. */
export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [store, setStore] = useState<StoreDetail | null>(null);
  const [status, setStatus] = useState<CatalogStatus>("loading");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      apiGet<{ data: ApiBranch }>(`/branches/${BRANCH_ID}`, controller.signal),
      apiGet<{ data: ApiMenuCategory[] }>(
        `/branches/${BRANCH_ID}/menu`,
        controller.signal,
      ),
    ])
      .then(([branch, menu]) => {
        setStore(mapBranch(branch.data));
        setSections(mapMenuCategories(menu.data));
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [reloadKey]);

  const reload = useCallback(() => {
    setStatus("loading");
    setReloadKey((key) => key + 1);
  }, []);

  const value = useMemo(
    () => ({ sections, store, status, reload }),
    [sections, store, status, reload],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog harus dipakai di dalam CatalogProvider");
  }
  return context;
}
