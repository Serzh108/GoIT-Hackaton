import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface PhotoUploaderProps {
  label?: string;
  id: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

function PhotoUploader({
  label,
  registration,
  id,
  error,

  ...rest
}: PhotoUploaderProps) {
  return (
    // <div className="mb-4 flex flex-row-reverse gap-10 mr-auto ">
    <div className=" flex flex-row-reverse gap-10 mr-auto ">
      {label && (
        <>
          {/* задати через svgr  */}
          <p className="font-semibold text-2xl leading-normal">{label}</p>
        </>
      )}
      <label
        htmlFor={id}
        className="flex flex-row gap-4 items-center justify-center w-[408px] h-[212px] border border-dashed border-black rounded-[22px] cursor-pointer"
      >
        {/* задати через svgr  */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0403 1.66663L11.0163 20.3333M1.66699 11H20.3337"
            stroke="black"
            stroke-width="2.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p className="font-semibold text-2xl leading-normal ">
          Додати зображення
        </p>
        <input
          {...rest}
          id={id}
          type="file"
          {...registration}
          accept="image/*"
          className="hidden "
        />
      </label>
    </div>
  );
}

export default PhotoUploader;
