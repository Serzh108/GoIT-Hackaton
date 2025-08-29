'use client';
import { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/services/cn";
import { logInFormSchema } from "@/constants/validationSchemas/validationSchemas";
import { logInFormInputs } from "@/types/formDataTypes";
import { Eye, EyeSlash } from "../Eyes/Eyes";

const LogIn: FC = () => {
    const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<logInFormInputs>({
    resolver: yupResolver(logInFormSchema),
    defaultValues: {},
  });

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  const onSubmitForm: SubmitHandler<logInFormInputs> = data => {
    console.log('data -> ', data);
  };

  const toggleVisibilityPassword = () => {
    setIsVisiblePassword(prev => !prev);
  };
  
    return(
      <div className="">
      <h1 className="font-semibold mb-12 text-2xl leading-9">
        Вхід
      </h1>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <label className="flex flex-col mb-4 text-base leading-[30px] font-medium">
            Email
            <input
            className="bordered-input"
            placeholder="example@i.ua"
            autoFocus
            {...register('email', { required: true })}
            autoComplete="example@i.ua" // ???
            /> 
           <span className={cn('input-error', 'h-4')}>
            {errors?.email?.message}
          </span>
        </label>

        <label className="flex flex-col mb-10 text-base leading-[30px] font-medium">
          Пароль
          <div className="relative">
            <input
              className="bordered-input pr-14"
              type={isVisiblePassword ? 'text' : 'password'}
              placeholder="Введіть пароль"
              {...register('password', { required: true })}
              autoComplete="current-password"
            />
            <div
              className="absolute top-[15px] right-5 cursor-pointer"
              onClick={toggleVisibilityPassword}
            >
              {isVisiblePassword ? <Eye /> : <EyeSlash />}
            </div>
          </div>
          <span className={cn('input-error', 'h-4')}>
            {errors?.password?.message}
          </span>
        </label>

        <button className="border py-2 px-4 rounded-md cursor-pointer">Увійти</button>
      </form>
      </div>
    );
};

export default LogIn;