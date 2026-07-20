"use client";

import React from "react";
import { Crown, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface PremiumBannerProps {
  className?: string;
  onRegister?: () => void;
  onDismiss?: () => void;
}

const PremiumBanner: React.FC<PremiumBannerProps> = ({
  className,
  onRegister,
  onDismiss,
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-r from-ushop-purple via-purple-700 to-ushop-purple p-6 text-white shadow-lg mb-6",
        className
      )}
    >
      {/* Background sparkle decoration */}
      <div className="absolute top-2 right-8 opacity-20">
        <Sparkles className="w-24 h-24" />
      </div>

      <div className="relative flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Crown className="h-6 w-6 text-yellow-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Upgrade to Premium</h3>
            <p className="text-sm text-white/80 max-w-md">
              Unlock exclusive discounts, priority support, and premium-only
              deals on U-Shop.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              Maybe Later
            </Button>
          )}
          {onRegister && (
            <Button
              size="sm"
              onClick={onRegister}
              className="bg-white text-ushop-purple hover:bg-white/90 font-semibold"
            >
              Apply Now
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { PremiumBanner };
export default PremiumBanner;
