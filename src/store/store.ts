import { IAllUsersData } from "@/types/formDataTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  isAdmin: boolean;
  users: IAllUsersData[];
};

type Action = {
  setIsAdmin: (val: boolean) => void;
  setUsers: (val: IAllUsersData[]) => void;
};

export const useUserStore = create<State & Action, [['zustand/persist', State & Action]]
>(
  persist(
    set => ({
      isAdmin: false,
      users: [],
      setIsAdmin: (val) => set({ isAdmin: val }),
      setUsers: (val) => set({ users: val }),
    }),
    {
      name: 'user-storage',
    }
  )
);