import { IAllUsersData, IPartnerData, IReportsListData } from "@/types/formDataTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  isAdmin: boolean;
  users: IAllUsersData[];
  reports: IReportsListData[];
  partners: IPartnerData[];
  locale: string;
};

type Action = {
  setIsAdmin: (val: boolean) => void;
  setUsers: (val: IAllUsersData[]) => void;
  setReports: (val: IReportsListData[]) => void;
  setPartners: (val: IPartnerData[]) => void;
  setLocale: (val: boolean) => void;
};

export const useUserStore = create<State & Action, [['zustand/persist', State & Action]]
>(
  persist(
    set => ({
      isAdmin: false,
      users: [],
      reports: [],
      locale: 'ua',
      partners: [],
      setIsAdmin: (val) => set({ isAdmin: val }),
      setUsers: (val) => set({ users: val }),
      setReports: (val) => set({ reports: val }),
      setPartners: (val) => set({ partners: val }),
      setLocale: (val) => set({ locale: val ? 'ua' : 'en' }),
    }),
    {
      name: 'user-storage',
    }
  )
);