'use client';
import React from 'react';
import PhotoUploader from '../PhotoUploader/PhotoUploader';
import InputField from '../InputField/InputField';
import { useForm } from 'react-hook-form';

type DonationFormValues = {
  image: FileList;
  alt: string;
  title: string;
  desc: string;
  collected: string;
  target: string;
  peopleDonate: string;
  peopleDonate_title: string;
  days: string;
  period: string;
  status: string;
  value: string;
  importance: string;
  long_desc: string;
};

function DonationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationFormValues>();
  const onSubmit = (data: DonationFormValues) => {
    //! поки просто консоль лог
    console.log('Form values:', data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2.5 w-[948px] bg-zinc-50 drop-shadow-2xl rounded-lg p-6"
    >
      <div className="flex flex-row items-end justify-center gap-12">
        <PhotoUploader
          id="image"
          //   label="Фото збору"
          error={errors.image}
          registration={register('image', { required: 'Фото обов’язкове' })}
        />
        <InputField></InputField>
      </div>

      <InputField></InputField>
      <InputField></InputField>
      <InputField></InputField>
      <InputField></InputField>
      <InputField></InputField>
      <InputField></InputField>
      <InputField></InputField>
      <InputField></InputField>
      <InputField></InputField>
      <InputField></InputField>
    </form>
  );
}

export default DonationForm;
