/**
 * Tiny readiness signal. Text reveals wait for it, so they play after the
 * splash lifts or after a route curtain starts to open.
 */
declare global {
  interface Window {
    __brandReady?: boolean;
  }
}

export function setReady(value: boolean): void {
  if (typeof window === "undefined") return;
  window.__brandReady = value;
  if (value) window.dispatchEvent(new Event("brand:ready"));
}

export function whenReady(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || window.__brandReady) {
      resolve();
      return;
    }
    window.addEventListener("brand:ready", () => resolve(), { once: true });
  });
}
