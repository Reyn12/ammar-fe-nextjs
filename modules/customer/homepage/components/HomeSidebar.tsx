"use client";

import { useEffect, useState } from "react";

import { cn } from "@/shared/lib/cn";

type HomeSidebarProps = {
  isOpen: boolean;
  nameStore: string;
  onClose: () => void;
  onClickOrderHistory: () => void;
};

function OrderHistoryIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </svg>
  );
}

export function HomeSidebar({
  isOpen,
  nameStore,
  onClose,
  onClickOrderHistory,
}: HomeSidebarProps) {
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

  if (!isRendered) return null;

  return (
    <div className="absolute inset-0 z-[60]">
      <button
        type="button"
        aria-label="Tutup sidebar"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="absolute inset-y-0 right-0 w-[280px] max-w-[85%] overflow-hidden">
        <aside
          aria-hidden={!isVisible}
          className={cn(
            "flex h-full w-full flex-col bg-zinc-50 shadow-2xl transition-transform duration-300 ease-out",
            isVisible ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="bg-[#FA52A8] px-4 pb-6 pt-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">
                  Menu
                </p>
                <p className="mt-1 truncate text-base font-bold leading-snug text-white">
                  {nameStore}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="mt-3 flex flex-col gap-2 px-4">
            <button
              type="button"
              onClick={onClickOrderHistory}
              className="group flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 text-left shadow-sm transition hover:border-[#FA52A8]/30 hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FA52A8]/10 text-[#FA52A8] transition group-hover:bg-[#FA52A8]/15">
                <OrderHistoryIcon className="h-5 w-5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-zinc-900">
                  Riwayat Pesanan
                </span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  Lihat pesanan kamu
                </span>
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:text-[#FA52A8]"
                aria-hidden
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </nav>

          <div className="mt-auto border-t border-zinc-200 px-4 py-4">
            <p className="text-center text-[11px] font-medium text-zinc-400">
              RM Ayam Bakar Ammar
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
