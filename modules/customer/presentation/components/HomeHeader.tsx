"use client";

import Image from "next/image";

type HomeHeaderProps = {
  onClickSearch: () => void;
  onClickHumburger: () => void;
};

export function HomeHeader({ onClickSearch, onClickHumburger }: HomeHeaderProps) {
  return (
    <header className="relative w-full">
      <Image
        src="/images/bg_homepage.png"
        alt="RM Ayam Bakar AMMAR"
        width={623}
        height={350}
        priority
        className="h-auto w-full"
      />

      <div className="absolute right-3 top-3 flex items-center gap-4">
        <button
          type="button"
          onClick={onClickSearch}
          aria-label="Search"
          className="shrink-0"
        >
          <Image
            src="/images/ic_search.png"
            alt=""
            width={42}
            height={42}
            className="h-10 w-10"
          />
        </button>

        <button
          type="button"
          onClick={onClickHumburger}
          aria-label="Menu"
          className="shrink-0"
        >
          <Image
            src="/images/ic_humburger.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
          />
        </button>
      </div>
    </header>
  );
}
