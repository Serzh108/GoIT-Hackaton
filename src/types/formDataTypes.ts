export type logInFormData = {
  email: string;
  password: string;
};

export interface IRegisterFormData extends logInFormData {
  name: string;
  role: string;
}

export interface IAllUsersData {
  _id: string;
  email: string;
  name: string;
  role: string;
}

export interface IAllUsersResult {
  _id: string;
  email: string;
  name: string;
  role: string;
}

type TImage = {
  path: string;
  url: string;
};

export type LongDesc = {
  _id: string;
  [key: `section${number}`]: string;
};
export interface ICollection {
  alt: string;
  closedAt: string | null;
  collected: number;
  collected_title: string;
  comments: string | null;
  createdAt: string | null;
  currency: string | null;
  days: string | null;
  desc: string | null;
  image: TImage[];
  importance: string;
  language: string;
  long_desc: LongDesc;
  peopleDonate: number;
  peopleDonate_title: string;
  period: string | null;
  quantity: string | null;
  status: string;
  target: number;
  target_title: string;
  term: string | null;
  title: string;
  translations: string;
  type: string;
  value: string;
  __v: number;
  _id: string;
};

export type DonationFormValues = {
  image?: FileList | string;
  alt: string;
  title: string;
  desc: string;
  collected: string;
  target: string;
  peopleDonate: string;
  peopleDonate_title: string;
  days: string;
  quantity: string;
  period: string;
  status: string;
  value: string;
  importance: string;
  long_desc: { text: string }[];
  imageFile?: File | undefined;
};

// export interface IUpdateDonationData {
//   alt: string;
//   // closedAt: string | null;
//   collected: number;
//   // collected_title: string;
//   // comments: string | null;
//   // createdAt: string | null;
//   // currency: string | null;
//   days: string | null;
//   desc: string | null;
//   image: TImage[]; // string($binary)
//   importance: string;
//   // language: string;
//   long_desc: LongDesc; //string[]
//   peopleDonate: number;
//   peopleDonate_title: string;
//   period: string | null;
//   quantity: string | null; // number
//   status: string;
//   target: number;
//   // target_title: string;
//   // term: string | null;
//   title: string;
//   // translations: string;
//   // type: string;
//   value: string;
//   // __v: number;
//   // _id: string;  
// };

export interface ICreateDonationData {
  // image: TImage[]; // string($binary)
  image?: FileList | string;
  alt: string;
  title: string;
  desc: string;
  collected: number;
  target: number;
  peopleDonate: number;
  peopleDonate_title: string;
  days: number;
  quantity: number; 
  period: string;
  status: string;
  value: string;  
  importance: string;
  // long_desc: LongDesc; //string[]
  // long_desc: string[]; 
    // long_desc: { text: string }[];
    long_desc: Record<string, string>;
  imageFile?: File | undefined;
}

export interface IMerchUpdateData {
  status: string,
  content: string,
  link: string, 
};
export interface IMerchData extends IMerchUpdateData {
  locale: string, 
  // locale: 'ua' | 'en';
  _id?: string, 
};

export interface IReportFormData  {
  month: string,
  url: string,
  year: string,
  language: string,
};

export interface IReportsListData extends IReportFormData {
  status: string,
  type: string,
  __v?: number,
  _id: string,
}
export interface IPartnerFormData  {
  image: string,
  logo: string,
  link: string,
  language: string,
  imageFile?: File | undefined;
};

type PartnerImage = {
  url: string,
  path: string,
};
export interface IPartnerData  {
 _id: string;
  logo: string,
  type: string,
  image: PartnerImage[],
  link: string,
  language: string,
};