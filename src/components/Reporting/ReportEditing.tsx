'use client';
import { FC,  useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IReportFormData } from "@/types/formDataTypes";
import { reportFormSchema } from "@/constants/validationSchemas/validationSchemas";
import { cn } from "@/services/cn";
import { useUserStore } from "@/store/store";
import Button from "../Button/Button";
import RadioGroup from "../RadioGroup/RadioGroup";
import { createReport, updateReport } from "@/services/transferData";
import { INTERNAL_LINKS } from "@/constants/constants";
import { redirectWithUpdateServer } from "@/services/actions";

type Props = {
    id?: string;
};

const ReportEditing: FC<Props> = ({id}) => {    
  console.log('id: ', id);
    const reports = useUserStore(state => state.reports);
    const report = reports.find(item => item._id === id);
    const [isFetching, setIsFetching] = useState<boolean>(false);

  console.log(' -- - report --> ', report); 
 
  const initialValues: IReportFormData = {
    month: report?.month || "",
    year: report?.year || "",
    url: report?.url || "",
    language: report?.language || "",
  };

    const {
      register,
      handleSubmit,
      reset,
      control,
      formState: { errors },
      } = useForm<IReportFormData>({
      resolver: yupResolver(reportFormSchema),
      defaultValues: initialValues,
    });

   const handleEditing = async (data: IReportFormData) => {
      console.log('ReportEditing handler data -> ', data);
      if (isFetching) {
      return;
      };
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
      //   setNotificationType(NOTIFICATION_TYPE.ERROR);
      }
  
      // setShowNotification(true);
  
      setIsFetching(false);
  
      setTimeout(() => {
        redirectWithUpdateServer(`/${INTERNAL_LINKS.REPORTING}`);
      }, 2000);  
    };

     return(
    <div className="p-12 pt-20 ml-[20px]">
      <form
        onSubmit={handleSubmit(handleEditing)}
        className="text-xl leading-6"
      >
        <label className="flex flex-col mb-4 text-base leading-[30px] font-medium">
            Рік
            <input
            className="bordered-input"
            placeholder="Введіть рік"
            autoFocus
            {...register('year', { required: true })}
            autoComplete="Рік" // ???
            /> 
           <span className={cn('input-error', 'h-4')}>
            {errors?.year?.message}
          </span>
        </label> 

        <label className="flex flex-col mb-4 text-base leading-[30px] font-medium">
            Місяць
            <input
            className="bordered-input"
            placeholder="Введіть місяць"
            {...register('month', { required: true })}
            autoComplete="Місяць" // ???
            /> 
           <span className={cn('input-error', 'h-4')}>
            {errors?.month?.message}
          </span>
        </label> 

        <label className="flex flex-col mb-4 text-base leading-[30px] font-medium">
            Посилання
          <input
            className="bordered-input"
            placeholder="Введіть посилання"
            {...register('url', { required: true })}
            autoComplete="Посилання" // ???
          /> 
          <span className={cn('input-error', 'h-4')}>
            {errors?.url?.message}
          </span>
        </label>   

        {/* <label className="flex flex-col mb-4 text-base leading-[30px] font-medium">
            Мова
            <input
            className="bordered-input"
            placeholder="Оберить мову"
            {...register('language', { required: true })}
            autoComplete="Мова" // ???
            /> 
           <span className={cn('input-error', 'h-4')}>
            {errors?.language?.message}
          </span>
        </label>   */}

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

        <Button
          type="submit"
          className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 bg-black text-zinc-50 w-[288px]"
        >
          {report ? 'Оновити' : 'Створити'}
        </Button>
      </form>
      </div>
     );
};

export default ReportEditing;
