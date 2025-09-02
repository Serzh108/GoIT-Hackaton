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
  peopleDonate_title: 'донор' | 'донори' | 'донорів' | 'donors' | 'donor';
  days: string;
  quantity: string;
  period: 'день' | 'дні' | 'днів' | 'day' | 'days';
  status: 'active' | 'closed';
  value: string;
  importance: string;
  long_desc: string;
};

function DonationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DonationFormValues>();

  const onSubmit = (data: DonationFormValues) => {
    //! поки просто консоль лог
    console.log('Form values:', data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 max-w-237 bg-zinc-50 drop-shadow-2xl rounded-lg p-6"
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

      <RadioGroup
        label="Статус збору"
        name="status"
        control={control}
        rules={{ required: 'Оберіть статус' }}
        options={[
          { label: 'active', value: 'active' },
          { label: 'closed', value: 'closed' },
        ]}
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
        important={true}
        label="Текст для кількості донорів"
        name="peopleDonate_title"
        control={control}
        rules={{ required: 'Оберіть текст для кількості донорів' }}
        options={[
          { label: 'донорів', value: 'донорів' },
          { label: 'донор', value: 'донор' },
          { label: 'донори', value: 'донори' },
          { label: 'donor', value: 'donor' },
          { label: 'donors', value: 'donors' },
        ]}
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
        important={true}
        label="Текст для кількості днів"
        name="period"
        control={control}
        rules={{ required: 'Оберіть текст для періоду' }}
        options={[
          { label: 'day', value: 'day' },
          { label: 'days', value: 'days' },
          { label: 'день', value: 'день' },
          { label: 'дні', value: 'дні' },
          { label: 'днів', value: 'днів' },
        ]}
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
        important={true}
        label="Значення типу важливості збору"
        name="importance"
        control={control}
        rules={{ required: 'Оберіть значення типу важливості збору' }}
        options={[
          { label: 'Терміново', value: 'urgent' },
          { label: 'Важливий', value: 'important' },
          { label: 'Не терміново', value: 'non-urgent' },
          { label: 'Постійний', value: 'permanent' },
        ]}
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

      <div className="flex flex-row gap-6 justify-center items-center mt-14">
        <button
          type="submit"
          className="rounded-3xl py-4 px-2 bg-amber-200 w-[288px]"
        >
          Надіслати
        </button>
        <button
          type="button"
          className="rounded-3xl py-4 px-2 bg-amber-200 w-[288px]"
        >
          Відхилити
        </button>
      </div>
    </form>
  );
}

export default DonationForm;
