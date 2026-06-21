"use client";

import { useEffect, useRef, useState } from "react";

export function useShowWhenScrolledPast() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPast(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return { sentinelRef, isPast };
}
