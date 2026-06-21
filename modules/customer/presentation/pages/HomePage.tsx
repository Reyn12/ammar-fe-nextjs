"use client";

import { gooeyToast } from "goey-toast";

import { HomeHeader } from "../components/HomeHeader";

export function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <HomeHeader
        onClickSearch={() =>
          gooeyToast.info("Fitur Search Coming Soon!")
        }
        onClickHumburger={() =>
          gooeyToast.info("Fitur Sidebar Coming Soon!")
        }
      />

      <main className="flex flex-1 flex-col gap-4 px-4 py-6">
        <section className="rounded-2xl bg-zinc-900 px-4 py-5 text-white">
          <p className="text-sm text-zinc-300">Selamat datang</p>
          <p className="mt-1 text-lg font-semibold">
            Base page customer siap dikembangkan per modul.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 p-4">
          <h2 className="text-sm font-semibold text-zinc-900">Quick info</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Layout ini mobile-first. Kalau dibuka di web, lebar maksimum tetap
            seperti layar HP.
          </p>
        </section>
      </main>
    </div>
  );
}
