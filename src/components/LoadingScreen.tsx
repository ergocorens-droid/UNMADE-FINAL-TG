"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "unmade_intro_seen";
const DISPLAY_MS = 2800;

type Phase = "checking" | "run" | "exit" | "gone";

export function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("checking");

  useEffect(() => {
    let displayTimer: number | undefined;

    const raf = requestAnimationFrame(() => {
      const seen = sessionStorage.getItem(SESSION_KEY) === "true";
      if (seen) {
        setPhase("gone");
        onComplete();
        return;
      }

      setPhase("run");

      displayTimer = window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "true");
        setPhase("exit");
      }, DISPLAY_MS);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (displayTimer !== undefined) window.clearTimeout(displayTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = window.setTimeout(() => {
      setPhase("gone");
      onComplete();
    }, 600);
    return () => window.clearTimeout(t);
  }, [phase, onComplete]);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-all duration-500 ease-out ${
        phase === "checking"
          ? "opacity-100"
          : phase === "exit"
            ? "pointer-events-none opacity-0 -translate-y-4"
            : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Ładowanie UNMADE"
      aria-busy={phase === "run"}
    >
      {phase !== "checking" && (
        <>
          <span className="text-4xl font-light tracking-[0.3em] text-neutral-900 sm:text-5xl md:text-6xl">
            UNMADE
          </span>
          <div className="relative mx-auto mt-10 h-px w-48 overflow-hidden bg-neutral-200 sm:w-64">
            <div className="unmade-load-bar absolute inset-y-0 left-0 w-1/3 bg-neutral-900" />
          </div>
          <p className="mt-6 text-xs tracking-widest text-neutral-500">EST. 2026</p>
        </>
      )}
    </div>
  );
}
