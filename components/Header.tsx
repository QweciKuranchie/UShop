"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./common/Logo";
import HeaderTopBar from "./HeaderTopBar";
import HeaderNavBar from "./HeaderNavBar";
import SearchBar from "./common/SearchBar";
import CartIcon from "./CartIcon";
import WhishListIcon from "./WhishListIcon";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MobileMenu from "./layout/MobileMenu";
import {
  ClerkLoaded,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <>
      {/* ── Row 1: Top bar ── */}
      <HeaderTopBar />

      {/* ── Sticky Row 2: Menu bar & Mobile search bar ── */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 hoverEffect">
        <Container className="flex items-center justify-between py-5 text-lightColor">
          {/* logo, Mobile Menu Icon */}
          <div className="w-auto flex items-center gap-2.5 justify-start">
            <MobileMenu />
            <Logo />
          </div>

          {/* Search bar — hidden on mobile, shown on md+ */}
          <div className="hidden md:block flex-1 mx-6">
            <SearchBar />
          </div>

          {/* cart, wishlist, profile */}
          <div className="flex items-center justify-end gap-3.5 md:gap-5">
            <CartIcon />
            <WhishListIcon />

            {/* Auth buttons — hidden on mobile, shown on md+ */}
            <div className="hidden md:flex items-center gap-3">
              {isMounted && (
                <ClerkLoaded>
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
                </ClerkLoaded>
              )}
            </div>
          </div>
        </Container>

        {/* Mobile search bar — visible only on mobile */}
        <div className="px-4 pb-4 md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* ── Row 3: Navigation bar (Desktop only) ── */}
      <HeaderNavBar />
    </>
  );
};

export default Header;
