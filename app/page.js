import { HydrationStatus, SlowHydration } from "./slow-hydration";

export default function Page() {
  return (
    <main>
      <p>Server text: v1</p>
      <HydrationStatus />
      <SlowHydration />
    </main>
  );
}
