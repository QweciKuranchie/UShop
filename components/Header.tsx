import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderTopBar from "./HeaderTopBar";
import HeaderNavBar from "./HeaderNavBar";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import WhishListIcon from "./WhishListIcon";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MobileMenu from "./MobileMenu";
import {
  ClerkLoaded,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const Header = () => {
  return (
    <header className="bg-white">
      {/* ── Row 1: Top bar ── */}
      <HeaderTopBar />

      {/* ── Row 2: Menu bar ── */}
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
          </div>
        </div>
      </Container>

      {/* Mobile search bar — visible only on mobile */}
      <div className="px-4 pb-4 md:hidden">
        <SearchBar />
      </div>

      {/* ── Row 3: Navigation bar (Desktop only) ── */}
      <HeaderNavBar />
    </header>
  );
};

export default Header;
