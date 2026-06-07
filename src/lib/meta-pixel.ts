type FbqArgs = Record<string, unknown>;

export function trackEvent(event: string, params?: FbqArgs) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", event, params);
  }
}
