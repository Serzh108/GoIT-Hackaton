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
