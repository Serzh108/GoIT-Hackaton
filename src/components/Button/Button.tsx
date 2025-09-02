'use client';
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`cursor-pointer ${rest.className || ''}  ${
        disabled && 'bg-neutral-500 text-neutral-700'
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
