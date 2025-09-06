'use client';

import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";

type Props = {
    id?: string;
};

const ReportEditing: FC<Props> = ({id}) => {    
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

   const handleEditing = async (data: IRegisterFormData) => {
        console.log('handleEditing data -> ', data);
        if (isFetching) {
        return;
        };
    };

     return(
    <div className="p-12 pt-20 ml-[20px]">
      <form
        onSubmit={handleSubmit(handleEditing)}
        className="text-xl leading-6"
      ></form>
      </div>
     );
};

export default ReportEditing;