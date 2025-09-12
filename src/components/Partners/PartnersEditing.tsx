'use client';
import { FC, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';
import { IPartnerFormData } from '@/types/formDataTypes';
import { createPartner, updatePartner } from '@/services/transferData';
import { redirectWithUpdateServer } from '@/services/actions';
import { INTERNAL_LINKS } from '@/constants/constants';
// import { partnerFormSchema } from "@/constants/validationSchemas/validationSchemas";
import Button from "../Button/Button";
import { cn } from "@/services/cn";
import RadioGroup from "../RadioGroup/RadioGroup";
import { BeatLoader } from "react-spinners";
// import PhotoUploader from "../PhotoUploader/PhotoUploader";
import ImageUploader from "../ImageUploader/ImageUploader";
import InputField from "../InputField/InputField";

type Props = {
  id?: string;
};

const PartnersEditing: FC<Props> = ({ id }) => {
  console.log('id: ', id);
  const partners = useUserStore(state => state.partners);
  const partner = partners.find(item => item._id === id);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  console.log(' -- - partner --> ', partner);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<IPartnerFormData>({
    // resolver: yupResolver(partnerFormSchema),
    mode: 'onChange',
  });
  console.log(' - isValid -> ', isValid);

  useEffect(() => {
    if (partner) {
      const initialPartnerFormValues: IPartnerFormData = {
      image: partner?.image[0].path || '', 
      logo: partner?.logo || '',
      link: partner?.link || '',
      language: partner?.language || '',
      imageFile: undefined,
      };
      reset(initialPartnerFormValues);
    }
  }, [partner, reset]);

  // -----------------------------------
  const imageValue = watch('image');
   console.log(" - imageValue -> ", imageValue);
  const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(
    partner?.image[0].path || null
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
  // ----------------- / ---------------

  const handleEditing = async (formData: IPartnerFormData) => {
    console.log('ReportEditing handler data -> ', formData);
    if (isFetching) {
      return;
    }
    setIsFetching(true);

    // --------------------------------
    const requestObj = new FormData();
    requestObj.append('logo', formData.logo);
    requestObj.append('link', formData.link);
    requestObj.append('language', formData.language);
    requestObj.append('image', formData.imageFile ? formData.imageFile : '');

    //  - - - - - - - -  --
  // const requestObj: IPartnerFormData = {
  //   image: formData.imageFile ? formData.imageFile.name : '',
  //   logo: formData.logo,
  //   link: formData.link,
  //   language: formData.language,
  //   imageFile: formData.imageFile,
  // };

    const isFileUpload = true;
 // ----------------- / ---------------
    let result;
    if (partner) {
      result = await updatePartner(requestObj, partner._id, isFileUpload);
    } else {
      result = await createPartner(requestObj, isFileUpload);
    }
    console.log('createReport - result -> ', result);
    // reset();

    if (!result) {
      console.error('createReport - ERROR!!');
    }

    setIsFetching(false);

    setTimeout(() => {
      redirectWithUpdateServer(`/${INTERNAL_LINKS.PARTNERS}`);
    }, 2000);
  };

  const router = useRouter();

  return (
    <div className="p-12 pt-[140px]">
      <form
        onSubmit={handleSubmit(handleEditing)}
        className="flex flex-col gap-4 w-197 bg-zinc-50 shadow-accent rounded-2xl p-6 pb-12  text-xl leading-6 "
      >
        {/* <PhotoUploader
          id="image"
          error={errors.image}
          initialImagePath={partner?.image?.[0]?.path}
          registration={register('image', { required: 'Фото обов’язкове' })}
        /> */}
        {/* ------------------------------------------------ */}
        <div className="flex justify-between items-end relative">
           {/* <div className="flex justify-between items-end"> */}
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
                  image={uploadedImage || partner?.image[0].path}
                  title={partner?.logo}
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
          <div className="flex absolute left-[494px]">
            <RadioGroup
              label="Мова:"
              name="language"
              control={control}
              rules={{ required: 'Оберить мову' }}
              options={[
                { label: 'Українська', value: 'ua' },
                { label: 'English', value: 'en' },
              ]}
            />
        </div>
        </div>

        <InputField
          id="logo"
          label="Назва партнера"
          placeholder="Введіть назву партнера"
          registration={register('logo', { required: 'Назва обов’язкова' })}
          error={errors.logo}
          important
          autoComplete="Назва партнера"
        />
        <InputField
          id="link"
          label="Посилання"
          placeholder="Введіть посилання"
          registration={register('link', { required: 'Посилання обов’язкове' })}
          error={errors.link}
          important
          autoComplete="Посилання"
        />
        {/* ---------------------- / ----------------------- */}

        {/* <label className="flex flex-col text-base leading-[30px] font-medium">
            Назва партнера
            <input
            className="bordered-input"
            placeholder="Введіть назву партнера"
            autoFocus
            {...register('logo', { required: true })}
            autoComplete="Назва партнера" 
            />
            <span className={cn('input-error', 'h-4')}>
            {errors?.logo?.message}
            </span>
        </label>

        <label className="flex flex-col text-base leading-[30px] font-medium">
            Посилання
            <input
            className="bordered-input"
            placeholder="Введіть посилання"
            {...register('link', { required: true })}
            autoComplete="Посилання" 
            />
            <span className={cn('input-error', 'h-4')}>
            {errors?.link?.message}
            </span>
        </label> */}

        {/* <RadioGroup
          label="Мова:"
          name="language"
          control={control}
          rules={{ required: 'Оберить мову' }}
          options={[
            { label: 'Українська', value: 'ua' },
            { label: 'English', value: 'en' },
          ]}
        /> */}

        <div className="flex justify-center gap-6 pt-6">
          <Button
            type="submit"
            className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 bg-black text-zinc-50 w-[280px]"
            disabled={!isValid || isFetching}
          >
            {isFetching ? (
              <BeatLoader color="white" />
            ) : partner ? (
              'Зберегти'
            ) : (
              'Створити'
            )}
          </Button>
          <Button
            type="button"
            onClick={() => router.push('/partners')}
            className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 text-black bg-zinc-50 border border-black w-[280px]"
          >
            Відхилити
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PartnersEditing;
