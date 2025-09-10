'use client';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';
import { IPartnerFormData } from '@/types/formDataTypes';
import { createPartner, updatePartner } from '@/services/transferData';
import { redirectWithUpdateServer } from '@/services/actions';
import { INTERNAL_LINKS } from '@/constants/constants';
// import { partnerFormSchema } from "@/constants/validationSchemas/validationSchemas";
import Button from '../Button/Button';
import { cn } from '@/services/cn';
import RadioGroup from '../RadioGroup/RadioGroup';
import { BeatLoader } from 'react-spinners';
import PhotoUploader from '../PhotoUploader/PhotoUploader';
import InputField from '../InputField/InputField';

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
    formState: { errors, isValid },
  } = useForm<IPartnerFormData>({
    // resolver: yupResolver(partnerFormSchema),
    mode: 'onChange',
  });
  console.log(' - isValid -> ', isValid);

  useEffect(() => {
    if (partner) {
      const initialPartnerFormValues: IPartnerFormData = {
        // image: partner?.image || '',
        image: undefined,
        logo: partner?.logo || '',
        link: partner?.link || '',
        language: partner?.language || '',
      };
      reset(initialPartnerFormValues);
    }
  }, [partner, reset]);

  const handleEditing = async (data: IPartnerFormData) => {
    console.log('ReportEditing handler data -> ', data);
    if (isFetching) {
      return;
    }
    setIsFetching(true);

    let result;
    if (partner) {
      result = await updatePartner(data, partner._id);
    } else {
      result = await createPartner(data);
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
        <div className="flex justify-center items-end">
          <PhotoUploader
            id="image"
            error={errors.image}
            initialImagePath={partner?.image?.[0]?.path}
            registration={register('image', { required: 'Фото обов’язкове' })}
          />

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
