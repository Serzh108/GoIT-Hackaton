import { ENDPOINTS } from "@/constants/constants";
import { IAllUsersData, IRegisterFormData, logInFormData } from "@/types/formDataTypes";
import axios, { AxiosResponse } from "axios";

export const logIn = async (logInData: logInFormData) => {
    console.log(' - logInData --> ', logInData);
  try {
    const result = await axios.post(ENDPOINTS.LOGIN, logInData);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};

export const logOut = async () => {
  try {
    const result = await axios.post(ENDPOINTS.LOGOUT);
      console.log(' - result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};

export const userRegister = async (registerData: IRegisterFormData) => {
  console.log(' userRegister registerData ->', registerData);
  try {
    const result = await axios.post(ENDPOINTS.REGISTER, registerData);
      console.log(' - result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};

export const updateUser = async (updateData: IRegisterFormData, id: string) => {
  console.log(' updateRegister updateData ->', updateData);
  console.log(' updateRegister id ->', id);
  const url = `${ENDPOINTS.REFRESH_USER}${id}`;
  console.log(' updateRegister url ->', url);
  try {
    const result = await axios.patch(url, updateData);
      console.log(' - result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};

export const deleteUser = async (id: string) => {
  const url = `${ENDPOINTS.DELETE_USER}${id}`;
  try {
    const result = await axios.delete(url);
      console.log(' - result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};

export const usersList = async () => {
  try {
    const { data }: AxiosResponse<IAllUsersData[]> = await axios.get(ENDPOINTS.ALL_USERS);
    return data;
      // console.log(' - result --> ', result);
      // if(result.status === 200) { return result.data; };
      // return result;
  } catch (error) {
    console.error(error);
      // return { message: error };
  }
};

export const userInfo = async () => {
  try {
    const { data }: AxiosResponse = await axios.get(ENDPOINTS.USER);
    console.log(' - userInfo data --> ', data);
    return data;
      // if(result.status === 200) { return result.data; };
      // return result;
  } catch (error) {
    console.error(error);
      // return { message: error };
  }
};