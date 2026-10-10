import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Index hari ini (0 = Senin ... 6 = Minggu) di WIB; null saat SSR */
export function useTodayIndex() {
  return useSyncExternalStore<number | null>(
    subscribe,
    () => {
      const weekday = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "Asia/Jakarta",
      });
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(weekday);
    },
    () => null,
  );
}
