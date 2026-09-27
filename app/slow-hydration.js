"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Shows "hydrating..." until React commits the first render, then "hydrated".
export function HydrationStatus() {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  return <p>Status: {hydrated ? "hydrated" : "hydrating..."}</p>;
}

// 200 components that each block for 20 ms in the browser. React yields
// between them, so hydration takes several seconds and other tasks, such as
// HMR messages, run in the gaps. This stands in for a large page on a slow
// machine; it only widens a window that exists on every page load.
function Block() {
  if (typeof window !== "undefined") {
    const end = performance.now() + 20;
    while (performance.now() < end) {}
  }
  return null;
}

export function SlowHydration() {
  return Array.from({ length: 200 }, (_, i) => <Block key={i} />);
}
