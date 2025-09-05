'use client';
import React from 'react';
import PhotoUploader from '../PhotoUploader/PhotoUploader';
import InputField from '../InputField/InputField';
import { useFieldArray, useForm } from 'react-hook-form';
import RadioGroup from '../RadioGroup/RadioGroup';
import Button from '../Button/Button';
import { string } from 'yup';
import CrossIcon from '@/icons/cross.svg';
import EditPenIcon from '@/icons/edit_pen.svg';

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
  long_desc: { text: string }[];
};

function DonationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DonationFormValues>({
    defaultValues: {
      long_desc: [{ text: '' }, { text: '' }],
    },
  });

  const onSubmit = (data: DonationFormValues) => {
    //! поки просто консоль лог

    // Трансформація у потрібний формат
    const transformed = {
      ...data,
      long_desc: data.long_desc.reduce((acc, item, idx) => {
        acc[`section${idx + 1}`] = item.text;
        return acc;
      }, {} as Record<string, string>),
    };

    console.log('Form values:', transformed);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'long_desc',
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 max-w-237 bg-zinc-50 drop-shadow-2xl rounded-lg p-6"
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
          className="w-[444px]"
          error={errors.alt}
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
        error={errors.title}
        registration={register('title', { required: 'Назва обов’язкова' })}
      />
      <InputField
        important={true}
        id="desc"
        type="text"
        placeholder="Опис"
        label="Опис"
        error={errors.desc}
        registration={register('desc', {
          required: 'Короткий опис обов’язковий',
        })}
      />
      <div>
        <p className="flex font-semibold text-base leading-[137%] mb-4">
          Детальний опис збору
          <span className="ml-2 text-current block ">*</span>
        </p>
        {fields.map((field, index) => (
          <div key={field.id} className="flex  items-center gap-7 mb-8">
            <label
              htmlFor={`long_desc.${index}.text`}
              className="font-semibold text-base leading-[22px]"
            >{`Абзац ${index + 1}`}</label>
            <div className="flex-1">
              <InputField
                id={`long_desc.${index}.text`}
                type="text"
                placeholder="Опис"
                error={errors.long_desc?.[index]?.text}
                registration={register(`long_desc.${index}.text`, {
                  required: 'Це поле обовʼязкове',
                })}
              />
            </div>
            <Button type="button" onClick={() => remove(index)} className=" ">
              <CrossIcon />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ text: '' })}
          className="flex justify-center items-center gap-2 rounded-[48px] py-4 px-2 font-semibold text-lg text-black bg-zinc-50 border border-black w-[228px]"
        >
          Додати абзац
          <EditPenIcon />
        </Button>
      </div>

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
        error={errors.target}
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
        error={errors.collected}
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
        error={errors.peopleDonate}
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
        error={errors.days}
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
        error={errors.quantity}
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
        error={errors.value}
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

      <div className="flex flex-row gap-6 justify-center items-center mt-14">
        <Button
          type="submit"
          className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 bg-black text-zinc-50 w-[288px]"
        >
          Надіслати
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

export default DonationForm;
