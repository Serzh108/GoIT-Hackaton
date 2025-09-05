'use client';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/services/cn';
import { IRegisterFormData } from '@/types/formDataTypes';
import { Eye, EyeSlash } from "../Eyes/Eyes";
import { RegisterFormSchema } from '@/constants/validationSchemas/validationSchemas';
import Select from 'react-select';
import { updateUser, userRegister } from '@/services/auth';
import { INTERNAL_LINKS } from '@/constants/constants';
import { redirectWithUpdateServer } from '@/services/actions';
import { useUserStore } from '@/store/store';

type Props = {
    id?: string;
};

const roleOptions = [
  { value: "admin", label: "Адмін" },
  { value: "editor", label: "Редактор" },
];

const UserEditing: FC<Props> = ({id}) => {    
  const users = useUserStore(state => state.users);
  const user = users.find(item => item._id === id); 
 
  const initialValues: IRegisterFormData = {
    role: user?.role || "editor",
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  };
 
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    } = useForm<IRegisterFormData>({
    resolver: yupResolver(RegisterFormSchema),
    defaultValues: initialValues,
  });

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isSelectOpened, setIsSelectOpened] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
   

  const handleEditing = async (data: IRegisterFormData) => {
      console.log('handleEditing data -> ', data);
      if (isFetching) {
      return;
      };

    setIsFetching(true);

    const newUser: IRegisterFormData = {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
    }; 

    let result;
    if (user) {
      result = await updateUser(newUser, user._id);
    } else {
      result = await await userRegister(newUser);
    }
    console.log('userRegister - result -> ', result);
    reset();

    if (!result) {
        console.error('userRegister - ERROR!!');
    //   setNotificationType(NOTIFICATION_TYPE.ERROR);
    }

    // setShowNotification(true);

    setIsFetching(false);

    setTimeout(() => {
      redirectWithUpdateServer(redirectPath);
    }, 2000);  
    //  }, NOTIFICATION_DURATION);     
  };

  const redirectPath = `/${INTERNAL_LINKS.ADMIN}`;

  const toggleVisibilityPassword = () => {
    setIsVisiblePassword(prev => !prev);
  };

    return(
    <div className="p-12 pt-20 ml-[20px]">
      <form
        onSubmit={handleSubmit(handleEditing)}
        className="text-xl leading-6"
      >
        <label className="flex flex-col mb-4 text-base leading-[30px] font-medium">
            Ім&#39;я
            <input
            className="bordered-input"
            placeholder="Введіть ім'я та призвище"
            autoFocus
            {...register('name', { required: true })}
            autoComplete="Ім'я" // ???
            /> 
           <span className={cn('input-error', 'h-4')}>
            {errors?.name?.message}
          </span>
        </label> 

        <label className="flex flex-col mb-4 text-base leading-[30px] font-medium">
            Email
            <input
            className="bordered-input"
            placeholder="example@i.ua"           
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

        <label className="flex flex-col mb-28 text-base leading-[30px] font-medium">
          Роль
          <Controller
            name="role"
            control={control} 
            render={({ field }) => (
              <Select
                {...field}
                options={roleOptions}
                value={roleOptions.find((opt) => opt.value === field.value) || null}
                onChange={(option) => field.onChange(option?.value)}
                placeholder="Оберіть роль"
                onMenuOpen={() => setIsSelectOpened(true)}
                onMenuClose={() => setIsSelectOpened(false)}
                styles={{
                    control: base => ({
                        ...base,
                        background: 'rgba(0, 0, 0, 0)',
                        border: '1px solid #aaa',
                        color: 'rgb(237, 237, 237)',
                        "&:hover": {
                            borderColor: "#2551eb",
                        },
                    }),
                    valueContainer: base => ({
                        ...base,
                        // background: '#c0ffc0',
                        // color: 'green'
                    }),
                    input: base => ({
                        ...base,
                        // border: '1px solid #aaa',
                        color: 'rgb(237, 237, 237)',
                    }),
                    dropdownIndicator: (base) => ({
                        ...base,
                        transition: 'transform 0.2s',
                        transform: isSelectOpened ? 'rotate(180deg)' : 'rotate(0deg)',
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: "#aaa", // колір вибраного значення
                    }),
                    //  option: (base, state) => ({
                      option: (base) => ({
                        ...base,
                        // backgroundColor: state.isFocused
                        // ? "#f0f0f0" // фон при hover
                        // : state.isSelected
                        // ? "#0b0b0b" // фон вибраного
                        // : "white",
                        // color: state.isSelected ? "white" : "#fff0f0",
                        cursor: "pointer",
                    }),
                    menu: (base) => ({
                        ...base,
                        background: 'rgba(0, 0, 0, 0)', // фон випадаючого меню
                        color: "#aaa",
                        border: "1px solid #aaa",
                        borderRadius: "8px",
                        overflow: "hidden",
                        "&:hover": {
                          background: 'rgba(125, 120, 120, 0)',
                        },
                    }),
                }}  
              />
            )}
          />
          <span className={cn('input-error', 'h-4')}>
            {errors?.role?.message}
          </span>
        </label>

        <button className="border py-2 px-4 rounded-md cursor-pointer">{user ? 'Оновити' : 'Зареєструвати'}</button>       
      </form>
      </div>
    );
};

export default UserEditing;