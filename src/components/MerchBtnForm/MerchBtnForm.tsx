'use client';

import React, { useEffect, useState } from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import InputField from '../InputField/InputField';
import RadioGroup from '../RadioGroup/RadioGroup';
import Button from '../Button/Button';
import { Controller, useForm } from 'react-hook-form';
import { merchData, updateMerch } from '@/services/transferData';
// import { IMerchData } from '@/types/formDataTypes';
import { INTERNAL_LINKS } from '@/constants/constants';
import { redirectWithUpdateServer } from '@/services/actions';
import { updateMerchFormSchema } from '@/constants/validationSchemas/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';

type MerchBtnFormValues = {
  // status: 'off' | 'on';
  status: string;
  content: string;
  link: string;
  // locale: 'ua' | 'en';
  locale: string;
};

function MerchBtnForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<MerchBtnFormValues>({
    resolver: yupResolver(updateMerchFormSchema),
    defaultValues: { status: 'off' },
  });

  // const [merchArray, setMerchArray] = useState<IMerchData[]>([]);
  const [merchArray, setMerchArray] = useState<MerchBtnFormValues[]>([]);

  useEffect(() => {
    const result = async () => await merchData();
    result().then(res => {
      console.log('Merch result --> ', res);
      if (res) {
        const cleanedArray = res.map(({ _id, ...rest }) => {
          console.log(_id);
          return rest;
        });
        setMerchArray(cleanedArray);
        // setMerchArray(res);
        console.log('Merch result 0 --> ', res[0]);
        const initValue = { ...cleanedArray[0] };
        // const initValue = {...res[0]};
        // delete initValue._id;
        console.log('initValue --> ', initValue);
        reset(initValue);
      } else {
        console.error('ERROR!');
        return;
      }
    });
  }, [reset]);

  const localeValue = watch('locale');
  console.log('localeValue --> ', localeValue);

  useEffect(() => {
    const newItem = merchArray.filter(item => item.locale === localeValue);
    console.log('newItem --> ', newItem[0]);
    const initValue = { ...newItem[0] };
    // delete initValue._id;
    console.log('initValue --> ', initValue);
    reset(initValue);
  }, [localeValue, reset, merchArray]);

  const onSubmit = async (data: MerchBtnFormValues) => {
    console.log('Form values:', data);
    const { locale, ...updateData } = data;
    const result = await updateMerch(updateData, locale);
    console.log(' - onSubmit result -> ', result);

    // reset();

    setTimeout(() => {
      redirectWithUpdateServer(INTERNAL_LINKS.MERCH);
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 w-[90%] min-w-[550px] bg-white shadow-accent rounded-lg pt-4 px-6 pb-14"
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
        placeholder="Посилання на сайт"
        label="Посилання на сайт"
        error={errors.link}
      />

      <Button
        type="submit"
        className="block mx-auto font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 bg-black text-zinc-50 w-[288px]"
      >
        Зберегти
      </Button>
    </form>
  );
}

export default MerchBtnForm;
