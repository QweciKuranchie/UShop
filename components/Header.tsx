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

const Header = () => {
  return (
    <header className="bg-white">
      {/* ── Row 1: Top bar ── */}
      <HeaderTopBar />
      <Container className="flex items-center justify-between py-5 text-lightColor">  
        {/* ── Row 2: Menu bar ── */}
        {/* logo, Mobile Menu Icon */}
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
        <MobileMenu />
        <Logo />
        </div>
        {/* Search bar — hidden on mobile, shown on md+ */} 
            <SearchBar />
        {/* cart, wishlist, profile, Auth buttons */} 
        <div  className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <CartIcon />
          <WhishListIcon /> 
          <SignIn />
          <SignUp />

        </div>
      </Container>
      {/* ── Row 3: Navigation bar ── */}
      <HeaderNavBar />
    </header>
  );
};

export default Header;
