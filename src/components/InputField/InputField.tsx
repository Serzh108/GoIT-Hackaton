'use client';
import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label?: string;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  important?: boolean;
  className?: string;
  id: string;
  registration: UseFormRegisterReturn;
};

function InputField({
  label,
  id,
  error,
  type = 'text',
  placeholder,
  registration,
  important,
  ...rest
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {important
        ? label && (
            <label
              htmlFor={id}
              className="block font-semibold text-base leading-[137%]"
            >
              <span className="after:content-['*'] after:ml-2 after:text-current block ">
                {label}
              </span>
            </label>
          )
        : label && (
            <label
              className="font-semibold text-base leading-[137%]"
              htmlFor={id}
            >
              {label}
            </label>
          )}
      <input
        {...rest}
        type={type}
        placeholder={placeholder}
        {...registration}
        id={id}
        className={`border rounded-md py-3 px-4 border-neutral-600 placeholder:text-base placeholder:leading-[137%] placeholder:font-normal ${
          rest.className || ''
        }`}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
}

export default InputField;
