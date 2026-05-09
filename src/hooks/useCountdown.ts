"use client";

import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isExpired: boolean;
};

function calculate(endMs: number): TimeLeft {
  const now = Date.now();
  const totalMs = endMs - now;
  if (totalMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isExpired: true,
    };
  }
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const seconds = Math.floor((totalMs / 1000) % 60);
  return { days, hours, minutes, seconds, totalMs, isExpired: false };
}

export function useCountdown(target: Date): TimeLeft {
  const endMs = target.getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculate(endMs));

  useEffect(() => {
    const initial = calculate(endMs);
    setTimeLeft(initial);
    if (initial.isExpired) return undefined;

    const interval = window.setInterval(() => {
      const next = calculate(endMs);
      setTimeLeft(next);
      if (next.isExpired) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [endMs]);

  return timeLeft;
}
