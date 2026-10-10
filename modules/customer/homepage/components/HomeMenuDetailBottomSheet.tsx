"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { calculateCartUnitPrice } from "@/modules/customer/homepage/lib/cart";
import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";
import {
  createDefaultCartSelection,
  isCartSelectionValid,
  setVariantChoice,
  toggleAddonChoice,
} from "@/modules/customer/homepage/lib/menu-selection";
import type { CartSelection } from "@/modules/customer/homepage/types/cart";
import type {
  MenuAddonGroup,
  MenuOptionChoice,
  MenuVariantGroup,
} from "@/modules/customer/homepage/types/menu-customization";
import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";
import { CUSTOMER_MAX_WIDTH } from "@/shared/constants/layout";
import { cn } from "@/shared/lib/cn";

import { HomeMenuQuantityStepper } from "./HomeMenuQuantityStepper";
import { HomeOrderTypeRadio } from "./HomeOrderTypeRadio";

type HomeMenuDetailBottomSheetProps = {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selection: CartSelection, quantity: number) => void;
};

function formatPriceDelta(priceDelta: number) {
  if (priceDelta <= 0) return null;
  return `+${formatMenuPrice(priceDelta)}`;
}

function VariantOption({
  choice,
  isActive,
  onSelect,
}: {
  choice: MenuOptionChoice;
  isActive: boolean;
  onSelect: () => void;
}) {
  const priceLabel = formatPriceDelta(choice.priceDelta);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition-all",
        isActive
          ? "border-[#FA52A8] bg-[#FA52A8]/5"
          : "border-zinc-200 hover:border-zinc-300",
      )}
    >
      <span
        className={cn(
          "text-sm font-medium",
          isActive ? "text-[#FA52A8]" : "text-zinc-900",
        )}
      >
        {choice.label}
        {priceLabel && (
          <span className="ml-1 text-xs font-normal text-zinc-500">
            {priceLabel}
          </span>
        )}
      </span>
      <HomeOrderTypeRadio isActive={isActive} />
    </button>
  );
}

function AddonOption({
  choice,
  isActive,
  onToggle,
}: {
  choice: MenuOptionChoice;
  isActive: boolean;
  onToggle: () => void;
}) {
  const priceLabel = formatPriceDelta(choice.priceDelta);

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition-all",
        isActive
          ? "border-[#FA52A8] bg-[#FA52A8]/5"
          : "border-zinc-200 hover:border-zinc-300",
      )}
    >
      <span
        className={cn(
          "text-sm font-medium",
          isActive ? "text-[#FA52A8]" : "text-zinc-900",
        )}
      >
        {choice.label}
        {priceLabel && (
          <span className="ml-1 text-xs font-normal text-zinc-500">
            {priceLabel}
          </span>
        )}
      </span>

      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
          isActive
            ? "border-[#FA52A8] bg-[#FA52A8]"
            : "border-zinc-300 bg-white",
        )}
        aria-hidden
      >
        {isActive && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
    </button>
  );
}

function OptionGroupSection({
  title,
  required,
  children,
}: {
  title: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold text-zinc-900">{title}</h3>
        {required && (
          <span className="rounded bg-[#FA52A8]/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#FA52A8]">
            Wajib
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

export function HomeMenuDetailBottomSheet({
  item,
  isOpen,
  onClose,
  onConfirm,
}: HomeMenuDetailBottomSheetProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selection, setSelection] = useState<CartSelection>({
    variants: {},
    addons: {},
  });
  const [quantity, setQuantity] = useState(1);

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
    if (!isOpen || !item) return;
    setSelection(createDefaultCartSelection(item));
    setQuantity(1);
  }, [isOpen, item]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const unitPrice = useMemo(() => {
    if (!item) return 0;
    return calculateCartUnitPrice(item, selection);
  }, [item, selection]);

  const totalPrice = unitPrice * quantity;
  const canConfirm = item ? isCartSelectionValid(item, selection) : false;

  const handleConfirm = () => {
    if (!item || !canConfirm) return;
    onConfirm(selection, quantity);
  };

  if (!isRendered || !item?.customization) return null;

  const { variantGroups, addonGroups } = item.customization;

  return (
    <div className="fixed inset-0 z-[80] flex justify-center">
      <div
        className="relative h-full w-full"
        style={{ maxWidth: CUSTOMER_MAX_WIDTH }}
      >
        <button
          type="button"
          aria-label="Tutup detail menu"
          onClick={onClose}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out",
            isVisible ? "opacity-100" : "opacity-0",
          )}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex max-h-[90dvh] flex-col">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Detail ${item.name}`}
            className={cn(
              "pointer-events-auto flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl transition-transform duration-300 ease-in-out",
              isVisible ? "translate-y-0" : "translate-y-full",
            )}
          >
            <div className="flex justify-center pt-3">
              <span className="h-1 w-10 rounded-full bg-zinc-200" aria-hidden />
            </div>

            <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold leading-snug text-zinc-900">
                  {item.name}
                </h2>
                <p className="mt-1 text-sm font-bold text-[#FA52A8]">
                  {formatMenuPrice(item.price)}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-5">
                {variantGroups.map((group: MenuVariantGroup) => (
                  <OptionGroupSection
                    key={group.id}
                    title={group.label}
                    required
                  >
                    {group.choices.map((choice) => (
                      <VariantOption
                        key={choice.id}
                        choice={choice}
                        isActive={selection.variants[group.id] === choice.id}
                        onSelect={() =>
                          setSelection((current) =>
                            setVariantChoice(current, group.id, choice.id),
                          )
                        }
                      />
                    ))}
                  </OptionGroupSection>
                ))}

                {addonGroups.map((group: MenuAddonGroup) => (
                  <OptionGroupSection key={group.id} title={group.label}>
                    {group.choices.map((choice) => {
                      const selectedAddons = selection.addons[group.id] ?? [];

                      return (
                        <AddonOption
                          key={choice.id}
                          choice={choice}
                          isActive={selectedAddons.includes(choice.id)}
                          onToggle={() =>
                            setSelection((current) =>
                              toggleAddonChoice(current, group.id, choice.id),
                            )
                          }
                        />
                      );
                    })}
                  </OptionGroupSection>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-200 bg-white px-4 py-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-700">Jumlah</p>
                <HomeMenuQuantityStepper
                  quantity={quantity}
                  itemName={item.name}
                  onDecrement={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  onIncrement={() => setQuantity((current) => current + 1)}
                />
              </div>

              <button
                type="button"
                disabled={!canConfirm}
                onClick={handleConfirm}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl bg-[#FA52A8] px-4 py-3 text-white transition",
                  !canConfirm && "cursor-not-allowed opacity-50",
                )}
              >
                <span className="text-sm font-bold">Tambah ke Keranjang</span>
                <span className="text-sm font-bold">
                  {formatMenuPrice(totalPrice)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
