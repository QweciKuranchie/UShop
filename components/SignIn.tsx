import React, { ButtonHTMLAttributes } from 'react'

const SignIn = React.forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className='text-ushop-purple border border-ushop-purple px-6 py-2 rounded-full hover:bg-ushop-purple hover:text-white hoverEffect cursor-pointer'
      >
        Login
      </button>
    );
  }
);

SignIn.displayName = "SignIn";

export default SignIn