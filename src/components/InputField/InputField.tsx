'use client';
import { cn } from '@/services/cn';
import React, { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  important?: boolean;
  className?: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

function InputField({
  label,
  id,
  error,
  type = 'text',
  placeholder,
  registration,
  important,
  className,
  ...rest
}: Props) {
  return (
    <div className="flex flex-col gap-4 ">
      {label && (
        <label
          htmlFor={id}
          className="flex font-semibold text-base leading-[137%]"
        >
          {label}
          {important && <span className="ml-1 text-current block ">*</span>}
        </label>
      )}
      <div className="relative ">
        <input
          {...rest}
          type={type}
          placeholder={placeholder}
          {...registration}
          id={id}
          className={cn(
            'focus:ring-1 focus:ring-primary outline-0 border rounded-md py-3 px-4 border-neutral-600 placeholder:text-base placeholder:leading-[137%] placeholder:font-normal',
            className || 'w-full'
          )}
        />
        {error && (
          <span className="absolute -bottom-6 left-1  text-xs font-normal text-error">
            {error?.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default InputField;
