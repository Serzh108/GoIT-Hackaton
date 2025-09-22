'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
// import PhotoUploader from '../../PhotoUploader/PhotoUploader';
import InputField from '../../InputField/InputField';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import RadioGroup from '../../RadioGroup/RadioGroup';
import Button from '../../Button/Button';
import CrossIcon from '@/icons/cross.svg';
import EditPenIcon from '@/icons/edit_pen.svg';
import { useUserStore } from '@/store/store';
import {
  donationData,
  createDonation, updateDonation
} from '@/services/transferData';
import { redirectWithUpdateServer } from '@/services/actions';
import { DonationFormValues, ICollection, ICreateDonationData } from '@/types/formDataTypes';
import {
  transformFormToLongDesc,
  transformLongDescToForm,
} from '@/services/transformLongDesc';
import { INTERNAL_LINKS } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
// import { cn } from '@/services/cn';
import { BeatLoader } from 'react-spinners';

// type DonationFormValues = {
//   // image: FileList;
//   image?: FileList | string;
//   alt: string;
//   title: string;
//   desc: string;
//   collected: string;
//   target: string;
//   peopleDonate: string;
//   // peopleDonate_title: 'донор' | 'донори' | 'донорів' | 'donors' | 'donor';
//   peopleDonate_title: string;
//   days: string;
//   quantity: string;
//   // period: 'день' | 'дні' | 'днів' | 'day' | 'days';
//   // status: 'active' | 'closed';
//   period: string;
//   status: string;
//   value: string;
//   importance: string;
//   long_desc: { text: string }[];
//     imageFile?: File | undefined;
// };

type Props = {
  id?: string;
};

const DonationForm: FC<Props> = ({ id }) => {
  const locale = useUserStore(state => state.locale);
   const router = useRouter();
  const [donation, setDonation] = useState<ICollection>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  console.log('id: ', id, ', - locale: ', locale);

  useEffect(() => {
    if (id) {
      const getDonation = async () => await donationData(locale, id);
      getDonation().then(res => {
        console.log(' - getDonation! res --> ', res);
        console.log(' - res.data --> ', res.data);
        setDonation(res.data);
      });
    }
  }, [id, locale]);
  console.log(' -- - donation --> ', donation);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<DonationFormValues>({
    mode: 'onChange',
    defaultValues: {
      long_desc: [{ text: '' }, { text: '' }],
    },
  });

  useEffect(() => {
    if (donation) {
      const initialDonationFormValues: DonationFormValues = {
        title: donation?.title || '',
        desc: donation?.desc || '',
        alt: donation?.alt || '',
        // image: donation?.image || [],
        image: undefined,
        collected: donation?.collected?.toString() || '',
        target: donation?.target?.toString() || '',
        peopleDonate: donation?.peopleDonate?.toString() || '',
        peopleDonate_title: donation?.peopleDonate_title || '',
        days: donation?.days || '',
        quantity: donation?.quantity || '',
        period: donation?.period || '',
        status: donation?.status || '',
        value: donation?.value || '',
        importance: donation?.importance || '',
        // transforming format from what we're gettig from backend to long_desc: { text: string }[];
        long_desc: transformLongDescToForm(donation.long_desc),
        imageFile: undefined,
      };
      reset(initialDonationFormValues); //! updating form;
    }
  }, [donation, reset]);

  const onSubmit = async (data: DonationFormValues) => {
       if (isFetching) {
      return;
    }
    setIsFetching(true);
    // --- --- ---
    console.log('donation - data.long_desc -> ', data.long_desc, data.long_desc.map((item,idx) => `sectioon${idx + 1}: ${item.text}`));
    console.log('donation - transformFormToLongDesc(data.long_desc) -> ', transformFormToLongDesc(data.long_desc));
    // --- -/- ---
    //! поки просто консоль лог
    const payload: ICreateDonationData = {
      ...data,
      // transforming format from  long_desc: { text: string }[] to what backend expects;
      long_desc: transformFormToLongDesc(data.long_desc),
      // long_desc: data.long_desc,
      // long_desc: data.long_desc.map(item => item.text),
      collected: +data.collected,
      // ---
      target: +data.target,
      peopleDonate: +data.peopleDonate,
      days: +data.days,
      quantity: +data.quantity,
    };

    console.log('Donation Form values on submit:', payload);

    let result;
    if (donation) {
      result = await updateDonation(payload, locale, donation._id);  // !!! check type payload
     } else {
      result = await createDonation(payload, locale);  // !!! check type payload
    }
    console.log('donation - result -> ', result);
    // reset();

    if (!result) {
      console.error('donation - ERROR!!');
    }

    setIsFetching(false);

    setTimeout(() => {
      redirectWithUpdateServer(`/${INTERNAL_LINKS.DONATIONS}`);
    }, 2000);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'long_desc',
  });
  // -----------------------------------
  const imageValue = watch('image');
   console.log(" - imageValue -> ", imageValue);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    donation?.image[0].path || null
  );

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setValue('imageFile', file, { shouldDirty: true });
        trigger('image');
      };
      reader.readAsDataURL(file);
    }
  };

  //  const path = usePathname();

  // console.log(' - - - path: ', path);
  // const pathItems = path.split('/');
  // console.log(' - - - path.split("/"): ', pathItems,
  //    ' - ', pathItems.length,
  //     ' -> ', pathItems[pathItems.length - 1]);
  // ----------------- / ---------------  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 w-237 bg-zinc-50 shadow-accent rounded-lg p-6 pb-14 my-[140px] "
    >
      {/* <div className="flex flex-row items-end justify-center gap-12"> */}
        {/* ---------------------------------- */}
        <div className="flex justify-between items-end relative">
        {/* <div className={cn("relative", { "left-[166px]": pathItems[pathItems.length - 1] === 'editing', "left-0": pathItems[pathItems.length - 1] === 'new'})}> */}
          <Controller
            name="image"
            control={control}
            render={({ }) => (
              <>
                <input
                  type="file"
                  {...register('image')}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/jpeg, image/jpg, image/png, image/webp"
                  onChange={handleFileChange}
                />
                <ImageUploader
                  image={uploadedImage || donation?.image[0].path}
                  title={donation?.title}
                  width={408}
                  height={210}
                  handleAddImage={handleAddImage}
                />
                <span className="input-error block min-h-6 mt-2">
                  {errors?.imageFile?.message && (
                    <span className="mt-1">{errors.imageFile.message}</span>
                  )}
                </span>
              </>
            )}
          />
        {/* </div> */}
        {/* -------------- / ----------------- */}
        {/* <PhotoUploader
          id="image"
          error={errors.image}
          initialImagePath={donation?.image?.[0]?.path}
          registration={register('image', { required: 'Фото обов’язкове' })}
        /> */}
        {/* <div className={cn("relative bottom-8", { "right-[166px]": id, "right-0": !id})}> */}
        
        <div className="flex absolute left-[456px]">
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
        label="Кількість відгуків"
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

      <div className="flex flex-row gap-6 justify-center items-center ">
        <Button
          type="submit"
          className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 bg-black text-zinc-50 w-[280px]"
          disabled={!isValid || isFetching}
        >
          {isFetching ? (
              <BeatLoader color="white" />
          ) : donation ? (
              'Зберегти'
          ) : (
              'Створити'
          )}
          {/* Зберегти */}
        </Button>
        <Button
          type="button"
          onClick={() => router.push('/donations')}
          className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 text-black bg-zinc-50 border border-black w-[280px]"
        >
          Відхилити
        </Button>
      </div>
    </form>
  );
};

export default DonationForm;
