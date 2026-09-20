import React, { useState, useEffect } from 'react';

/**
 * Helper function to retrieve Indian Standard Time (IST) components
 * Timezone: Asia/Kolkata
 * Format: 12-hour clock with hours, minutes, seconds and AM/PM
 * Example: "11:45:30 PM"
 */
function getFormattedIST() {
  const now = new Date();

  // Primary 12-hour IST string formatter
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const partsFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const parts = partsFormatter.formatToParts(now);
  const hour = parts.find((p) => p.type === 'hour')?.value || '12';
  const minute = parts.find((p) => p.type === 'minute')?.value || '00';
  const second = parts.find((p) => p.type === 'second')?.value || '00';
  const dayPeriod = parts.find((p) => p.type === 'dayPeriod')?.value || 'PM';

  return {
    fullTimeString: formatter.format(now),
    hoursMinutes: `${hour}:${minute}`,
    seconds: second,
    period: dayPeriod,
  };
}

/**
 * IndianTimeClock Component
 * 
 * Displays a live Indian Standard Time (IST) clock at the very top of the website/header:
 * “🇮🇳 भारतीय समय (IST) — 11:45:30 PM”
 * 
 * Features:
 * - Real-time continuous second-by-second updates via Asia/Kolkata timezone.
 * - Monospace tabular figures to completely eliminate layout shifts when digits tick.
 * - Glassmorphism card styling with subtle spiritual red and golden amber accents.
 * - Responsive layout smoothly centered across mobile, tablet, and desktop.
 * - Subtle smooth pulsing animation without moving surrounding components.
 */
export const IndianTimeClock: React.FC = () => {
  const [istTime, setIstTime] = useState(getFormattedIST);

  useEffect(() => {
    // Initial sync
    setIstTime(getFormattedIST());

    // Continuous 1-second interval
    const timer = setInterval(() => {
      setIstTime(getFormattedIST());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="ist-live-clock-topbar"
      className="w-full relative z-20 bg-gradient-to-r from-[#1c0505]/95 via-[#2b0808]/95 to-[#1c0505]/95 backdrop-blur-xl border-b border-amber-500/25 py-1 px-2 sm:px-4 text-white shadow-2xs select-none"
      aria-live="polite"
      aria-label="भारतीय मानक समय (Indian Standard Time)"
    >
      {/* Subtle top golden hairline sheen */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-0.5 rounded-full bg-stone-950/40 border border-amber-400/30 shadow-[0_0_12px_rgba(245,158,11,0.08)] backdrop-blur-md">
          {/* Pulsing Live Dot Beacon */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-amber-400 to-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
          </span>

          {/* Clock Text & Time Display */}
          <div className="flex items-center font-medium text-xs sm:text-[13px] tracking-wide text-amber-100/95 whitespace-nowrap">
            <span>🇮🇳 भारतीय समय (IST) —&nbsp;</span>

            {/* Monospace Tabular Clock Digits (Strictly Prevents Layout Shifts) */}
            <span className="font-mono tabular-nums font-bold tracking-wider inline-flex items-center text-white">
              <span>{istTime.hoursMinutes}</span>
              <span className="text-amber-400/90 mx-[1px] animate-pulse">:</span>
              <span className="text-amber-200 transition-opacity duration-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]">
                {istTime.seconds}
              </span>
              <span className="ml-1 text-[10px] sm:text-xs font-semibold text-amber-300/90">
                {istTime.period}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
