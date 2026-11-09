import type Lenis from "lenis";

declare global {
  interface Window {
    /** Live Lenis instance — exposed for e2e tests and debugging. */
    __lenis?: Lenis;
  }
}

export {};
