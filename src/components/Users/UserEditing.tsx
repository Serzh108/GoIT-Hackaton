'use client';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/services/cn';
import { IRegisterFormData } from '@/types/formDataTypes';
import { RegisterFormSchema } from '@/constants/validationSchemas/validationSchemas';
import Select from 'react-select';
import { updateUser, userRegister } from '@/services/auth';
import { INTERNAL_LINKS } from '@/constants/constants';
import { redirectWithUpdateServer } from '@/services/actions';
import { useUserStore } from '@/store/store';
import Button from '../Button/Button';
import { BeatLoader } from 'react-spinners';
import AuthInputField from '../AuthInputField/AuthInputField';

type Props = {
    id?: string;
};

const roleOptions = [
  { value: "admin", label: "Адмін" },
  { value: "editor", label: "Редактор" },
];

const TO_MANY_ADMINS = 'Ліміт користувачів з роллю admin перевищено';

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
    // reset,
    control,
    watch,
    formState: { errors, isValid },
    } = useForm<IRegisterFormData>({
    resolver: yupResolver(RegisterFormSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const selectedRole = watch('role');
  console.log(' - selectedRole -> ', selectedRole);

  const adminsAmount = users.filter(user => user.role === 'admin').length;
  console.log(' - adminsAmount -> ', adminsAmount, ' - ', adminsAmount); 
  const adminError = (selectedRole === 'admin') && (adminsAmount > 1) ? TO_MANY_ADMINS : '';

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
    // reset();

    if (!result) {
        console.error('userRegister - ERROR!!');
    }

    setIsFetching(false);

    setTimeout(() => {
      redirectWithUpdateServer(`/${INTERNAL_LINKS.ADMIN}`);
    }, 2000);       
  };

    return(
    <div className="p-12 pt-[140px]">
      <form
        onSubmit={handleSubmit(handleEditing)}
        className="flex flex-col gap-10 text-xl leading-6"
      >


        <AuthInputField
          id="name"
          label="Ім&#39;я*"
          type="text"
          placeholder="Введіть ім'я"
          autoComplete="Ім'я"
          registration={register('name', { required: true })}
          error={errors.name}
        />

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
        {/* ----------------------------------------- */}
        <div className="relative mb-10">
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
                        className={cn(
                          'flex w-full h-[60px] outline-0  border rounded-3xl',
                          errors?.role ? 'border-red-500 ' : 'border-gray-900'
                        )}
                styles={{
                    control: base => ({
                        ...base,
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0)',
                        // border: '1px solid #aaa',
                        borderRadius: '24px',
                        border: '1px solid transparent',
                        color: 'rgb(237, 237, 237)',
                        paddingLeft: '12px',
                        // "&:hover": {
                        //     borderColor: "#2551eb",
                        // },
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
                        color: "#aaa", 
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
                        background: 'rgba(0, 0, 0, 0)', 
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
            {errors?.role?.message || adminError}
          </span>
          <label
            htmlFor={'role'}
            className="absolute left-5 top-[-12px] bg-white text-base font-body leading-[22px] text-black px-1"
          >
            Роль
          </label>
        </div>

        <Button
          type="submit"
          className="font-semibold text-2xl leading-[160%] rounded-3xl py-4 px-2 bg-black text-zinc-50 w-[280px]"
          disabled={!isValid || !!adminError}
        >
           {isFetching ? <BeatLoader color="white" /> : user ? 'Оновити' : 'Зареєструвати'}
        </Button>   
      </form>
      </div>
    );
};

export default UserEditing;