"use client";

import Image from "next/image";

import { HomeStoreCard } from "./HomeStoreCard";

type HomeHeaderProps = {
  nameStore: string;
  openHours: string;
  onClickSearch: () => void;
  onClickHumburger: () => void;
  onClickDetail: () => void;
};

export function HomeHeader({
  nameStore,
  openHours,
  onClickSearch,
  onClickHumburger,
  onClickDetail,
}: HomeHeaderProps) {
  return (
    <header className="relative z-10 mb-8 w-full">
      <div className="relative">
        <Image
          src="/images/bg_homepage.png"
          alt="RM Ayam Bakar AMMAR"
          width={623}
          height={350}
          priority
          className="h-auto w-full"
        />

        {/* Button Search dan Humburger */}
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

        {/* Card Toko */}
        <div className="absolute inset-x-4 bottom-0 z-10 translate-y-1/2">
          <HomeStoreCard
            nameStore={nameStore}
            openHours={openHours}
            onClickDetail={onClickDetail}
          />
        </div>
      </div>
    </header>
  );
}
