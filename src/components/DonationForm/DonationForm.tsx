'use client';
import React from 'react';
import PhotoUploader from '../PhotoUploader/PhotoUploader';
import InputField from '../InputField/InputField';
import { useForm } from 'react-hook-form';
import RadioGroup from '../RadioGroup/RadioGroup';

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
  quantity: string;
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
    setValue,
    watch,
    formState: { errors },
  } = useForm<DonationFormValues>();
  const onSubmit = (data: DonationFormValues) => {
    //! поки просто консоль лог
    console.log('Form values:', data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2.5 max-w-237 bg-zinc-50 drop-shadow-2xl rounded-lg p-6"
    >
      <div className="flex flex-row items-end justify-center gap-12">
        <PhotoUploader
          id="image"
          //   label="Фото збору"
          error={errors.image}
          registration={register('image', { required: 'Фото обов’язкове' })}
        />
        <InputField
          important={true}
          id="alt"
          type="text"
          placeholder="Текст має містити не більше 24 символів"
          label="Alt текст для картинки"
          className="w-[357px]"
          registration={register('alt', {
            required: 'Опис фото обов’язковий',
          })}
        />
      </div>
      <InputField
        important={true}
        id="title"
        type="text"
        placeholder="Заголовок"
        label="Заголовок"
        registration={register('title', { required: 'Назва обов’язкова' })}
      />
      <InputField
        important={true}
        id="desc"
        type="text"
        placeholder="Опис"
        label="Опис"
        registration={register('desc', {
          required: 'Короткий опис обов’язковий',
        })}
      />
      <InputField
        important={true}
        id="status"
        type="radio"
        label="Статус збору"
        registration={register('status', {
          required: 'Статус збору обов’язковий',
        })}
      />
      <RadioGroup
        name="status"
        options={[
          { label: 'active', value: 'active' },
          { label: 'closed', value: 'closed' },
        ]}
        selectedValue={watch('status')}
        onChange={value => setValue('status', value)}
      />
      <InputField
        important={true}
        id="target"
        type="text"
        placeholder="Сума"
        label="Ціль збору"
        registration={register('target', {
          required: 'Цільова сума збору обов’язкова',
        })}
      />
      <InputField
        important={true}
        id="collected"
        type="text"
        placeholder="Зібрано"
        label="Зібрано"
        registration={register('collected', {
          required: 'Зібрана сума обов’язкова',
        })}
      />
      <InputField
        important={true}
        id="peopleDonate"
        type="text"
        placeholder="Кількість донорів"
        label="Донори"
        registration={register('peopleDonate', {
          required: 'Донори обов’язкові',
        })}
      />

      <RadioGroup
        name="peopleDonate_title"
        options={[
          { label: 'донорів', value: 'донорів' },
          { label: 'донор', value: 'донор' },
          { label: 'донори', value: 'донори' },
          { label: 'donor', value: 'donor' },
          { label: 'donors', value: 'donors' },
        ]}
        selectedValue={watch('peopleDonate_title')}
        onChange={value => setValue('peopleDonate_title', value)}
      />

      <InputField
        id="days"
        type="text"
        placeholder="Кількість днів"
        label="Днів до завершення"
        registration={register('days', {
          required: 'Кількість днів до завершення обов’язкова',
        })}
      />
      <RadioGroup
        name="period"
        options={[
          { label: 'day', value: 'day' },
          { label: 'days', value: 'days' },
          { label: 'день', value: 'день' },
          { label: 'дні', value: 'дні' },
          { label: 'днів', value: 'днів' },
        ]}
        selectedValue={watch('period')}
        onChange={value => setValue('period', value)}
      />
      <InputField
        id="quantity"
        type="text"
        placeholder="Кількість відгуків"
        label="Днів до завершення"
        registration={register('quantity', {
          required: 'Кількість відгуків обов’язкова',
        })}
      />

      <InputField
        important={true}
        id="value"
        type="text"
        label="Тег збору"
        placeholder="Однаковий для зборів на обох мовах"
        registration={register('value', {
          required: 'Тег збору обов’язковий',
        })}
      />

      <RadioGroup
        name="importance"
        options={[
          { label: 'Терміново', value: 'urgent' },
          { label: 'Важливий', value: 'important' },
          { label: 'Не терміново', value: 'non-urgent' },
          { label: 'Постійний', value: 'permanent' },
        ]}
        selectedValue={watch('importance')}
        onChange={value => setValue('importance', value)}
      />

      <InputField
        important={true}
        id="long_desc"
        type="text"
        label="Детальний опис збору"
        registration={register('long_desc', {
          required: 'Детальний опис збору обов’язковий',
        })}
      />

      <input className="rounded-2xl border w-full" type="submit" />
    </form>
  );
}

export default DonationForm;
