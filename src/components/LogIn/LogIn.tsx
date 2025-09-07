'use client';
import { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';
import { logInFormSchema } from '@/constants/validationSchemas/validationSchemas';
import { logInFormData } from '@/types/formDataTypes';
import ArrowIcon from '@/icons/arrow.svg';
import { logIn } from '@/services/auth';
import { createCookie, createCookieRefresh } from '@/services/actions';
import Link from 'next/link';
import { REGEXP } from '@/constants/regexp';
import { COOKIES_VALUE } from '@/constants/constants';
import AuthInputField from '../AuthInputField/AuthInputField';
import Button from '../Button/Button';

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
      router.push('/about');
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

  return (
    <div className="">
      <h1 className="text-5xl font-bold font-heading text-center leading-[64px] mb-7">
        Авторизація
      </h1>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="space-y-10 w-[360px]"
      >
        <div className="flex items-center justify-end gap-5 mb-6 px-2">
          <label htmlFor="isAdmin" className="font-medium font-body">
            Увійти як адмін
          </label>
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            className="w-6 h-6 border border-gray-300 rounded accent-gray-900  "
          />
        </div>
        <AuthInputField
          id="email"
          label="E-mail*"
          type="email"
          placeholder="musicfreedom@gmail.com"
          autoComplete="email"
          registration={register('email', { required: true })}
          error={errors.email}
        />
        <AuthInputField
          id="password"
          label="Пароль*"
          isPassword
          placeholder="Введіть пароль"
          autoComplete="current-password"
          registration={register('password', { required: true })}
          error={errors.password}
        />
        {/* <label className="flex flex-col mb-4 text-base leading-[30px] font-medium">
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
        </label> */}

        <Button
          type="submit"
          className="block mx-auto mt-10 w-[300px] h-16 bg-gray-900 text-white p-4 rounded-3xl font-semibold"
        >
          Увійти
        </Button>
      </form>

      <p className=" text-base text-error w-full mt-2 text-center h-4">
        {loginError ? REGEXP.password.mes.wrongEmailOrPassword : ''}
      </p>
      <div className="text-center mt-36">
        <Link
          //!чи тут типу буде посилання на їх сайт
          href="/"
          className="inline-flex items-center gap-6 text-base font-normal text-black"
        >
          <ArrowIcon />
          Назад до ІнХармоні.Юа
        </Link>
      </div>

      {/* <Link
        href="/forget"
        className="text-base font-medium underline hover:text-accent"
      >
        Забули пароль?
      </Link> */}
    </div>
  );
};

export default LogIn;
