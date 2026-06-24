"use client";

import { useEffect, useState } from "react";

import {
  ORDER_TYPE_DESCRIPTION,
  ORDER_TYPE_LABEL,
  ORDER_TYPES,
  type OrderType,
} from "@/modules/customer/homepage/types/order";
import { CUSTOMER_MAX_WIDTH } from "@/shared/constants/layout";
import { cn } from "@/shared/lib/cn";

import { HomeOrderTypeDineInIcon } from "./HomeOrderTypeDineInIcon";
import { HomeOrderTypeRadio } from "./HomeOrderTypeRadio";
import { HomeOrderTypeTakeawayIcon } from "./HomeOrderTypeTakeawayIcon";
import { gooeyToast } from "goey-toast";

type HomeOrderTypeBottomSheetProps = {
  isOpen: boolean;
  value: OrderType;
  onClose: () => void;
  onChange: (orderType: OrderType) => void;
};

const ORDER_TYPE_ICON: Record<
  OrderType,
  typeof HomeOrderTypeDineInIcon
> = {
  "dine-in": HomeOrderTypeDineInIcon,
  takeaway: HomeOrderTypeTakeawayIcon,
};

export function HomeOrderTypeBottomSheet({
  isOpen,
  value,
  onClose,
  onChange,
}: HomeOrderTypeBottomSheetProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timer = setTimeout(() => setIsRendered(false), 300);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = (orderType: OrderType) => {
    onChange(orderType);
    onClose();
    gooeyToast.success("Tipe pemesanan berhasil diubah");
  };

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-center">
      <div
        className="relative h-full w-full"
        style={{ maxWidth: CUSTOMER_MAX_WIDTH }}
      >
        <button
          type="button"
          aria-label="Tutup pilih tipe pemesanan"
          onClick={onClose}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out",
            isVisible ? "opacity-100" : "opacity-0",
          )}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Pilih tipe pemesanan"
            className={cn(
              "pointer-events-auto w-full overflow-hidden rounded-t-2xl bg-white shadow-2xl transition-transform duration-300 ease-in-out",
              isVisible ? "translate-y-0" : "translate-y-full",
            )}
          >
          <div className="flex justify-center pt-3">
            <span className="h-1 w-10 rounded-full bg-zinc-200" aria-hidden />
          </div>

          <div className="px-4 pb-2 pt-3">
            <h2 className="text-base font-bold text-zinc-900">Tipe Pemesanan</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Pilih cara kamu mau pesan hari ini
            </p>
          </div>

          <div
            role="radiogroup"
            aria-label="Tipe pemesanan"
            className="flex flex-col gap-3 px-4 pb-5 pt-2"
          >
            {ORDER_TYPES.map((orderType) => {
              const isActive = value === orderType;
              const Icon = ORDER_TYPE_ICON[orderType];

              return (
                <button
                  key={orderType}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => handleSelect(orderType)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                    isActive
                      ? "border-[#FA52A8] bg-[#FA52A8]/5 shadow-sm"
                      : "border-zinc-200 bg-white hover:border-zinc-300",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors",
                      isActive
                        ? "bg-[#FA52A8]/15 text-[#FA52A8]"
                        : "bg-zinc-100 text-zinc-500",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-sm font-semibold",
                        isActive ? "text-[#FA52A8]" : "text-zinc-900",
                      )}
                    >
                      {ORDER_TYPE_LABEL[orderType]}
                    </span>
                    <span className="mt-0.5 block text-xs text-zinc-500">
                      {ORDER_TYPE_DESCRIPTION[orderType]}
                    </span>
                  </span>

                  <HomeOrderTypeRadio isActive={isActive} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
