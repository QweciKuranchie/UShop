"use client";

import React, { useEffect } from "react";
import { useAuthModal } from "@/hooks/useAuthModal";
import SlidingAuthContainer from "./SlidingAuthContainer";
import { X } from "lucide-react";

export default function AuthModal() {
  const { isOpen, mode, closeAuthModal } = useAuthModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeAuthModal]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop overlay click handler */}
      <div
        className="absolute inset-0"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div className="relative z-10 w-full max-w-[900px] flex items-center justify-center">
        {/* Prominent High-Contrast Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute -top-12 right-2 sm:-top-14 sm:right-0 z-[150] inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-purple-950 font-bold text-xs shadow-2xl border border-purple-100 hover:bg-purple-50 hover:text-ushop-pink hover:scale-105 transition-all cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4 text-ushop-pink stroke-[2.5]" />
          <span>Close</span>
        </button>

        {/* Sliding Auth Panel */}
        <SlidingAuthContainer key={mode} initialMode={mode} isModal={true} />
      </div>
    </div>
  );
}
