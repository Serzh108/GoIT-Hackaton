'use client';

import React from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import InputField from '../InputField/InputField';
import RadioGroup from '../RadioGroup/RadioGroup';
import Button from '../Button/Button';
import { Controller, useForm } from 'react-hook-form';

type MerchBtnFormValues = {
  status: 'off' | 'on';
  content: string;
  link: string;
  locale: 'ua' | 'en';
};

function MerchBtnForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MerchBtnFormValues>({ defaultValues: { status: 'off' } });

  const onSubmit = (data: MerchBtnFormValues) => {
    //! поки просто консоль лог
    console.log('Form values:', data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 w-[90%] bg-white shadow-accent rounded-lg pt-4 px-6 pb-14"
    >
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <ToggleSwitch
            checked={field.value === 'on'}
            onChange={value => field.onChange(value ? 'on' : 'off')}
            error={errors.status}
          />
        )}
      ></Controller>
      <RadioGroup
        label="Мова:"
        name="locale"
        control={control}
        rules={{ required: 'Оберіть для якої мови кнопка' }}
        options={[
          { label: 'Українська', value: 'ua' },
          { label: 'English', value: 'en' },
        ]}
      />
      <InputField
        important={true}
        registration={register('content', {
          required: 'Текст для кнопки обовʼязковий',
        })}
        id="content"
        type="text"
        placeholder="Назва"
        label="Назва, що відображатиметься"
        error={errors.content}
      />
      <InputField
        important={true}
        registration={register('link', {
          required: 'Посилання обоʼязкове',
        })}
        id="link"
        type="text"
        placeholder="Назва"
        label="Посилання на сайт"
        error={errors.link}
      />
      <div className="flex flex-row gap-6 justify-center items-center mt-14">
        <Button
          type="submit"
          className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 bg-black text-zinc-50 w-[288px]"
        >
          Зберегти
        </Button>
        <Button
          type="reset"
          className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 text-black bg-zinc-50 border border-black w-[288px]"
        >
          Відхилити
        </Button>
      </div>
    </form>
  );
}

export default MerchBtnForm;
