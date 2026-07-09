import React, { FC, useEffect, useState } from "react";
import Logo from "./Logo";
import { headerData } from "@/Constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOutsideClick } from "@/hooks";
import { cn } from "@/lib/utils";
import SocialMediaIcons from "./SocialMediaIcons";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SideBarProps> = ({ isOpen, onClose }) => {
  console.log("SideMenu render. isOpen:", isOpen);
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose, isOpen);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <>
      {/* Background Overlay */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />

      {/* Sidebar Drawer */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-black h-[100dvh] overflow-y-auto px-6 py-8 border-r border-r-ushop-magenta flex flex-col gap-6 hoverEffect text-white/70 shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-5">
          <Logo />
          <button
            onClick={onClose}
            className="text-2xl hover:text-white hoverEffect"
          >
            X
          </button>
        </div>
        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              onClick={onClose}
              className={cn(
                "hover:text-ushop-pink hoverEffect",
                pathname === item.href && "text-white",
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Mobile Auth options */}
        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-gray-800">
          {isMounted && (
            <>
              <SignedOut>
                <SignInButton mode="modal">
                  <SignIn />
                </SignInButton>
                <SignUpButton mode="modal">
                  <SignUp />
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          )}
        </div>

        <SocialMediaIcons />
      </div>
    </>
  );
};

export default SideMenu;
