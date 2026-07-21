"use client";

import React from "react";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
  className?: string;
  label?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  className,
  label = "Premium",
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-ushop-purple to-ushop-pink text-white shadow-sm",
        className
      )}
    >
      <Crown className="w-3 h-3" />
      {label}
    </span>
  );
};

export { PremiumBadge };
export default PremiumBadge;
