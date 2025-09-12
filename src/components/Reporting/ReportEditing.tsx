'use client';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IReportFormData } from '@/types/formDataTypes';
import { reportFormSchema } from '@/constants/validationSchemas/validationSchemas';
import { useUserStore } from '@/store/store';
import Button from '../Button/Button';
import RadioGroup from '../RadioGroup/RadioGroup';
import { createReport, updateReport } from '@/services/transferData';
import { INTERNAL_LINKS } from '@/constants/constants';
import { redirectWithUpdateServer } from '@/services/actions';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import InputField from '../InputField/InputField';

type Props = {
  id?: string;
};

const ReportEditing: FC<Props> = ({ id }) => {
  console.log('id: ', id);
  const reports = useUserStore(state => state.reports);
  const report = reports.find(item => item._id === id);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  console.log(' -- - report --> ', report);

  const initialValues: IReportFormData = {
    month: report?.month || '',
    year: report?.year || '',
    url: report?.url || '',
    language: report?.language || '',
  };

  const {
    register,
    handleSubmit,
    // reset,
    control,
    formState: { errors, isValid },
  } = useForm<IReportFormData>({
    resolver: yupResolver(reportFormSchema),
    defaultValues: initialValues,
  });

  const handleEditing = async (data: IReportFormData) => {
    console.log('ReportEditing handler data -> ', data);
    if (isFetching) {
      return;
    }
    setIsFetching(true);

    let result;
    if (report) {
      result = await updateReport(data, report._id);
    } else {
      result = await createReport(data);
    }
    console.log('createReport - result -> ', result);
    // reset();

    if (!result) {
      console.error('createReport - ERROR!!');
    }

    setIsFetching(false);

    setTimeout(() => {
      redirectWithUpdateServer(`/${INTERNAL_LINKS.REPORTING}`);
    }, 2000);
  };

  const router = useRouter();

  return (
    <div className="p-12 pt-[140px] ml-[20px]">
      <form
        onSubmit={handleSubmit(handleEditing)}
        className="text-xl leading-6 flex flex-col gap-6 max-w-237 bg-zinc-50 shadow-accent rounded-lg p-6 pb-14 "
      >
        <InputField
          id="year"
          label="Рік"
          placeholder="Введіть рік"
          registration={register('year', { required: true })}
          error={errors.year}
          autoFocus
          autoComplete="Рік"
          important
        />

        <InputField
          id="month"
          label="Місяць"
          placeholder="Введіть місяць"
          registration={register('month', { required: true })}
          error={errors.month}
          autoComplete="Місяць"
          important
        />

        <InputField
          id="url"
          label="Посилання"
          placeholder="Введіть посилання"
          registration={register('url', { required: true })}
          error={errors.url}
          autoComplete="Посилання"
          important
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

        <div className="flex gap-6">
          <Button
            type="submit"
            className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 bg-black text-zinc-50 w-[280px]"
            disabled={!isValid || isFetching}
          >
            {isFetching ? (
              <BeatLoader color="white" />
            ) : report ? (
              'Зберегти'
            ) : (
              'Створити'
            )}
          </Button>
          <Button
            type="button"
            onClick={() => router.push('/reporting')}
            className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 text-black bg-zinc-50 border border-black w-[280px]"
          >
            Відхилити
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportEditing;
