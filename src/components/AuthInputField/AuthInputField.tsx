'use client';
import { cn } from '@/services/cn';
import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import OpenedEyeIcon from '@/icons/view=open.svg';
import ClosedEyeIcon from '@/icons/view=close.svg';

type AuthInputFieldProps = {
  label?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  isPassword?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function AuthInputField({
  label,
  error,
  registration,
  isPassword,
  type = 'text',
  ...rest
}: AuthInputFieldProps) {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const toggleVisibilityPassword = () => {
    setIsVisiblePassword(prev => !prev);
  };

  const inputType = isPassword
    ? isVisiblePassword
      ? 'text'
      : 'password'
    : type;

  return (
    <div className="relative">
      <input
        type={inputType}
        {...rest}
        {...registration}
        className={cn(
          'w-full h-[60px] outline-0  border rounded-3xl p-[20px]  ',
          error ? 'border-red-500 ' : 'border-gray-900'
        )}
      />
      {label && (
        <label
          htmlFor={rest.id}
          className="absolute left-5 top-[-12px] bg-white text-base font-body leading-[22px] text-black px-1"
        >
          {label}
        </label>
      )}
      {isPassword && (
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={toggleVisibilityPassword}
        >
          {isVisiblePassword ? <OpenedEyeIcon /> : <ClosedEyeIcon />}
        </div>
      )}
      {error && (
        <span className="absolute -bottom-6 left-1  text-xs font-normal text-error">
          {error?.message}
        </span>
      )}
    </div>
  );
}
