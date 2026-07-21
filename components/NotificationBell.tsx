"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useUserData } from "@/contexts/UserDataContext";

export default function NotificationBell() {
  const { isSignedIn } = useUser();
  const { unreadNotifications } = useUserData();

  if (!isSignedIn) {
    return null;
  }

  const displayCount = unreadNotifications > 9 ? "9+" : unreadNotifications;

  return (
    <Link href="/user/notifications" className="group relative">
      <Bell className="w-6 h-6 group-hover:text-ushop-purple hoverEffect" />
      {unreadNotifications > 0 ? (
        <span
          className={`absolute -top-1 -right-1 bg-ushop-red text-white rounded-full text-xs font-semibold flex items-center justify-center min-w-[14px] h-[14px] ${
            unreadNotifications > 9 ? "px-1" : ""
          }`}
        >
          {displayCount}
        </span>
      ) : (
        <span
          className={`absolute -top-1 -right-1 bg-ushop-red text-white rounded-full text-xs font-semibold flex items-center justify-center min-w-[14px] h-[14px]`}
        >
          0
        </span>
      )}
    </Link>
  );
}
