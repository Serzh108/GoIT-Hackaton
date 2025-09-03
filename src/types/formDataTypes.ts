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
};

export interface IAllUsersResult {
  _id: string;
  email: string;
  name: string;
  role: string;
};