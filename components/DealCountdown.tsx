"use client";

import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-white/95 rounded-lg p-2 sm:p-3 shadow-lg border border-white/20 min-w-[50px] sm:min-w-[64px]">
    <span className="text-lg sm:text-2xl md:text-3xl font-extrabold text-red-600">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">
      {label}
    </span>
  </div>
);

const DealCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
      <div className="flex items-center gap-1.5 sm:gap-2 text-white">
        <Timer className="w-5 h-5 text-yellow-300 animate-pulse" />
        <span className="text-sm sm:text-base font-bold tracking-wide">
          Deal Ends In:
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

export default DealCountdown;
