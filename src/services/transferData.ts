import axios, { AxiosResponse } from "axios";
import { ENDPOINTS } from "@/constants/constants";
import { ICreateDonationData, IMerchData, IMerchUpdateData, IReportFormData, IReportsListData } from "@/types/formDataTypes";

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

export const deleteDonation = async (id: string) => {
  const url = `${ENDPOINTS.DELETE_DONATION}ua/${id}`;
  try {
    const result = await axios.delete(url);
      console.log(' - deleteReport result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};

export const updateDonation = async (updateData: ICreateDonationData, id: string) => {
  console.log(' updateDonation updateData ->', updateData);
  console.log(' updateDonation id ->', id);
  const url = `${ENDPOINTS.REFRESH_DONATION}ua/${id}`;
  console.log(' updateDonation url ->', url);
  try {
    const result = await axios.patch(url, updateData);
      console.log(' - updateDonation result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};

export const createDonation = async (createData: ICreateDonationData, locale: string) => {
  console.log(' createDonation createData ->', createData);
  const url = `${ENDPOINTS.CREATE_DONATION}${locale}`;
   console.log(' createDonation url ->', url);
  try {
    const result = await axios.post(url, createData);
      console.log(' - result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
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
// --- Reports ---
export const reportsListData = async (locale?: string) => {
  console.log(' reportsListData locale ->', locale);
  const url = `${ENDPOINTS.ALL_REPORTS}?locale=${locale ? locale : 'ua'}`;
  console.log(' updateMerch url ->', url);
  try {
    const { data }: AxiosResponse<IReportsListData[]> = await axios.get(url);
    console.log(' - reports data --> ', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createReport = async (reportData: IReportFormData) => {
  console.log(' createReport reportData ->', reportData);
  try {
    const result = await axios.post(ENDPOINTS.CREATE_REPORT, reportData);
      console.log(' - result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};

export const deleteReport = async (id: string) => {
  const url = `${ENDPOINTS.DELETE_REPORT}${id}`;
  try {
    const result = await axios.delete(url);
      console.log(' - deleteReport result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};

export const updateReport = async (updateData: IReportFormData, id: string) => {
  console.log(' updateReport updateData ->', updateData);
  console.log(' updateReport id ->', id);
  const url = `${ENDPOINTS.REFRESH_REPORT}${id}`;
  console.log(' updateRegister url ->', url);
  try {
    const result = await axios.patch(url, updateData);
      console.log(' - result --> ', result);
    return result.status;
  } catch (error) {
    return { message: error };
  }
};
