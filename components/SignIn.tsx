"use client";

import React, { ButtonHTMLAttributes } from 'react';
import { useAuthModal } from '@/hooks/useAuthModal';

const SignIn = React.forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => {
    const { openAuthModal } = useAuthModal();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      openAuthModal("sign-in");
      if (onClick) onClick(e);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        {...props}
        className='text-ushop-purple border border-ushop-pink px-6 py-2 rounded-full hover:bg-ushop-pink hover:text-white hoverEffect cursor-pointer'
      >
        Login
      </button>
    );
  }
);

SignIn.displayName = "SignIn";

export default SignIn;