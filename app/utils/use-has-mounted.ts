import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/*
  Returns false during server rendering and hydration, then true on the client.
  Use it to render theme-dependent UI only after hydration, avoiding mismatches.
*/
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
