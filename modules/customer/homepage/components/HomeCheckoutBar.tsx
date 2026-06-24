"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { formatMenuPrice } from "@/modules/customer/homepage/lib/format-menu-price";
import { cn } from "@/shared/lib/cn";

type HomeCheckoutBarProps = {
  itemCount: number;
  total: number;
  onClick: () => void;
  className?: string;
};

export function HomeCheckoutBar({
  itemCount,
  total,
  onClick,
  className,
}: HomeCheckoutBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (itemCount <= 0) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4",
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`Checkout ${itemCount} item`}
        className={cn(
          "pointer-events-auto flex w-full max-w-[398px] overflow-hidden rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out",
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0",
        )}
      >
        <div className="flex w-[72px] shrink-0 items-center justify-center bg-white py-4">
          <div className="relative">
            <Image
              src="/images/ic_cart.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FA52A8] px-1 text-[10px] font-bold text-white">
              {itemCount}
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between gap-3 bg-[#FA52A8] px-4 py-3">
          <div className="text-left">
            <p className="text-xs text-white">Total</p>
            <p className="text-lg font-bold leading-tight text-white">
              {formatMenuPrice(total)}
            </p>
          </div>

          <p className="shrink-0 text-sm font-bold uppercase tracking-wide text-white">
            Check Out ({itemCount})
          </p>
        </div>
      </button>
    </div>
  );
}
