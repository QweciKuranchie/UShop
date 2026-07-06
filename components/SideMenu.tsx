import React, { FC } from "react";
import Logo from "./Logo";
import { headerData } from "@/Constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOutsideClick } from "@/hooks";
import { cn } from "@/lib/utils";
import ScoialMediaIcons from "./ScoialMediaIcons";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SideBarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <>
      {/* Background Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Sidebar Drawer */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-black h-screen p-10 border-r border-r-ushop_light_green flex flex-col gap-6 transition-transform duration-300 ease-in-out text-white/70 shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
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
                "hover:text-white hoverEffect",
                pathname === item.href && "text-white"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
        
        {/* Mobile Auth options */}
        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-gray-800">
          <SignIn />
          <SignUp />
        </div>
        
        <ScoialMediaIcons />
      </div>
    </>
  );
};

export default SideMenu;
