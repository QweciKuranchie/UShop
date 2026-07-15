"use client";

import React, { useState } from "react";
import { AlignLeft } from "lucide-react";
import SideMenu from "./SideMenu";

const MobileMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button onClick={toggleSidebar}>
        <AlignLeft className="hover:text-hoverColor hoverEffect md:hidden hover:cursor-pointer" />
      </button>
      <div className="md:hidden">
        {/* SideMenu */}
        <SideMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  );
};

export default MobileMenu;
