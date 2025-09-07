'use client';
import { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/services/cn";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";
import { logInFormSchema } from "@/constants/validationSchemas/validationSchemas";
import { logInFormData } from "@/types/formDataTypes";
import { Eye, EyeSlash } from "../Eyes/Eyes";
import { logIn } from "@/services/auth";
import {  createCookie, createCookieRefresh } from "@/services/actions";
import Link from "next/link";
import { REGEXP } from "@/constants/regexp";
import { COOKIES_VALUE } from "@/constants/constants";

const LogIn: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<logInFormData>({
    resolver: yupResolver(logInFormSchema),
    defaultValues: {},
  });
 
  const setIsAdmin = useUserStore(state => state.setIsAdmin);

  const router = useRouter();

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);

    const logInRequest = async (data: logInFormData) => {
    const emailSA = process.env.NEXT_PUBLIC_EMAIL_SA || '';
    const result = await logIn(data);
    if (result === 200) {
      if (data.email.toLowerCase() === emailSA.toLowerCase()) {
        setIsAdmin(true);
        await createCookie(COOKIES_VALUE.super);
        await createCookieRefresh(COOKIES_VALUE.super);
      } else {
        setIsAdmin(false);
        await createCookie(COOKIES_VALUE.usual);
        await createCookieRefresh(COOKIES_VALUE.usual);
      }

      reset();
      setLoginError(false);
      router.push('/donations');
    } else {
      setLoginError(true);
    }
  };

  const onSubmitForm: SubmitHandler<logInFormData> = async data => {
    console.log('data -> ', data);
    logInRequest(data);
    // const result = await logIn(data);
        // const result = await axios.post("/api/auth/login", {email:'super_user@mail.com', password: 'xxxxTESTxxxx'});
        // const result = await axios.post("/api/auth/login", data);
          //  const result = await axios.get("auth/users");
        // console.log(' - result -> ', result);
        // const result1 = await axios.get("/api/auth/users");
        // console.log(' - result1 -> ', result1);
        //    const result2 = await axios.get("/api/collections/en?page=1&perPage=3");
        // console.log(' - collections list -> ', result2);
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

      <p className="input-error w-full mb-2 text-left h-4">
        {loginError ? REGEXP.password.mes.wrongEmailOrPassword : ''}
      </p>

      <Link
        href="/forget"
        className="text-base font-medium underline hover:text-accent"
      >
        Забули пароль?
      </Link>
      </div>
    );
};

export default LogIn;