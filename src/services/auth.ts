import { ENDPOINTS } from "@/constants/constants";
// import { refreshMyCookie } from "./actions";
// import { axiosPrivate, axiosPublic } from "./axios.api.config";
import { logInFormData } from "@/types/formDataTypes";
import axios from "axios";

// export const refresh = async () => {
//   try {
//     const result = await axiosPrivate.post(ENDPOINTS.REFRESH);
//     await refreshMyCookie();
//     return result.status;
//   } catch (error) {
//     return { message: error };
//   }
// };

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
    return result.status;
  } catch (error) {
    return { message: error };
  }
};
