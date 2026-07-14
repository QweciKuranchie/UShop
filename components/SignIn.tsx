import React, { ButtonHTMLAttributes } from 'react'

const SignIn = React.forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className='text-ushop-purple border border-ushop-pink px-6 py-2 rounded-full hover:bg-ushop-pink hover:text-white hoverEffect cursor-pointer'
      >
        Login
      </button>
    );
  }
);

SignIn.displayName = "SignIn";

export default SignIn