"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/meta-pixel";

export function ViewContentTracker({
  id,
  name,
  price,
  currency,
}: {
  id: string;
  name: string;
  price: number;
  currency: string;
}) {
  useEffect(() => {
    trackEvent("ViewContent", {
      content_ids: [id],
      content_name: name,
      content_type: "product",
      value: price,
      currency,
    });
  }, [id, name, price, currency]);

  return null;
}
