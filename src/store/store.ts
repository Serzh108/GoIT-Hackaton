import { IAllUsersData, IReportsListData } from "@/types/formDataTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  isAdmin: boolean;
  users: IAllUsersData[];
  reports: IReportsListData[];
};

type Action = {
  setIsAdmin: (val: boolean) => void;
  setUsers: (val: IAllUsersData[]) => void;
  setReports: (val: IReportsListData[]) => void;
};

export const useUserStore = create<State & Action, [['zustand/persist', State & Action]]
>(
  persist(
    set => ({
      isAdmin: false,
      users: [],
      reports: [],
      setIsAdmin: (val) => set({ isAdmin: val }),
      setUsers: (val) => set({ users: val }),
      setReports: (val) => set({ reports: val }),
    }),
    {
      name: 'user-storage',
    }
  )
);