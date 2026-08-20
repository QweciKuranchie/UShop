"use client";

import React from "react";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
  className?: string;
  label?: string;
  membershipType?: string;
  size?: "sm" | "md" | "lg" | string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  className,
  label,
  membershipType,
  size = "md",
}) => {
  const displayLabel = label || (membershipType ? `${membershipType.charAt(0).toUpperCase() + membershipType.slice(1)}` : "Premium");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold bg-gradient-to-r from-ushop-purple to-ushop-pink text-white shadow-sm",
        size === "sm" ? "px-2 py-0.5 text-xs" : size === "lg" ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs",
        className
      )}
    >
      <Crown className={cn(size === "sm" ? "w-2.5 h-2.5" : size === "lg" ? "w-3.5 h-3.5" : "w-3 h-3")} />
      {displayLabel}
    </span>
  );
};

export { PremiumBadge };
export default PremiumBadge;
