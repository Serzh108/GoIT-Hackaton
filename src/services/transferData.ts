import axios, { AxiosResponse } from "axios";
import { ENDPOINTS } from "@/constants/constants";

export const donationsList = async () => {
  try {
    //    const { data }: AxiosResponse<IAllUsersData[]> = await axios.get(ENDPOINTS.ALL_DONATIONS);
    const { data }: AxiosResponse = await axios.get(`${ENDPOINTS.ALL_DONATIONS}ua`);
    console.log(' - donationsList data --> ', data);
    return data;
      // console.log(' - result --> ', result);
      // if(result.status === 200) { return result.data; };
      // return result;
  } catch (error) {
    console.error(error);
      // return { message: error };
  }
};

export const donationData = async (id: string) => {
  try {
    //    const { data }: AxiosResponse<IAllUsersData[]> = await axios.get(ENDPOINTS.ALL_DONATIONS);
    const { data }: AxiosResponse = await axios.get(`${ENDPOINTS.DONATION}ua/${id}`);
    console.log(' - donation data --> ', data);
    return data;
      // console.log(' - result --> ', result);
      // if(result.status === 200) { return result.data; };
      // return result;
  } catch (error) {
    console.error(error);
      // return { message: error };
  }
};