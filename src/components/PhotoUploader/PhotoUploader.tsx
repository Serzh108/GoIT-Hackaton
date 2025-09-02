import { ChangeEvent, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import PenIcon from '@/icons/pen.svg';
import PlussIcon from '@/icons/pluss.svg';

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
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    registration.onChange(event);
  };
  return (
    <div className=" relative mr-auto w-[408px] h-[212px]">
      <label
        htmlFor={id}
        className="flex items-center justify-center w-full h-full bg-white border border-dashed border-black rounded-[22px] overflow-hidden cursor-pointer"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="flex flex-row gap-4 items-center justify-center">
            <PlussIcon />
            <p className="font-semibold text-2xl leading-normal ">
              Додати зображення
            </p>
          </div>
        )}
      </label>
      {preview && (
        <label
          htmlFor={id}
          className="absolute top-0 right-[-82%]  font-semibold text-2xl leading-normal cursor-pointer flex flex-row gap-4 items-center justify-center "
        >
          <PenIcon /> Змінити зображення
        </label>
      )}
      <input
        {...rest}
        id={id}
        type="file"
        {...registration}
        accept="image/*"
        className="hidden "
        onChange={handleChange}
      />
      {label && (
        <>
          {/* задати через svgr  */}
          <p className="font-semibold text-2xl leading-normal">{label}</p>
        </>
      )}
      {error && (
        <span className="text-xs font-normal text-red-600">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default PhotoUploader;
