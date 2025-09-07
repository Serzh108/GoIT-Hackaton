import axios, { AxiosResponse } from "axios";
import { ENDPOINTS } from "@/constants/constants";
import { IMerchData, IMerchUpdateData } from "@/types/formDataTypes";

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
// --- Merch ---
export const merchData = async () => {
  try {
    //    const { data }: AxiosResponse<IAllUsersData[]> = await axios.get(ENDPOINTS.ALL_DONATIONS);
    const { data }: AxiosResponse<IMerchData[]> = await axios.get(ENDPOINTS.MERCH);
    console.log(' - merch data --> ', data);
    // const cleanedArray = data.map(({ _id, ...rest }) => {
    //   console.log(_id); return rest;});
    // console.log(' - merch cleanedArray --> ', cleanedArray);
    // return cleanedArray;
    return data;
      // console.log(' - result --> ', result);
      // if(result.status === 200) { return result.data; };
      // return result;
  } catch (error) {
    console.error(error);
      // return { message: error };
  }
};

export const updateMerch = async (updateData: IMerchUpdateData, locale: string) => {
  console.log(' updateMerch updateData ->', updateData);
  console.log(' updateMerch locale ->', locale);
  const url = `${ENDPOINTS.REFRESH_MERCH}${locale}`;
  console.log(' updateMerch url ->', url);
  try {
    const result = await axios.patch(url, updateData);
      console.log(' - result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};