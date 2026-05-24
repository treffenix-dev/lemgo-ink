"use client";

import { useEffect } from "react";

export function ScrollReset() {
  useEffect(() => {
    // Prevent browser from restoring scroll position on reload
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
