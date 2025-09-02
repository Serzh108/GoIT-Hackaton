import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { logOut } from "@/services/auth";

type State = {
  isAdmin: boolean;
};

type Action = {
  setIsAdmin: (val: boolean) => void;
//   setLogOut: () => Promise<true | undefined>;
};

export const useUserStore = create<
  State & Action,
  [['zustand/persist', State & Action]]
>(
  persist(
    set => ({
      isAdmin: false,
      setIsAdmin: (val) => set({ isAdmin: val }),
    //   setLogOut: async () => {
    //     const result = await logOut();
    //     if (result === 200) {
    //       set({ isAdmin: false });
    //       return true;
    //     }
    //   },
    }),
    {
      name: 'user-storage',
    }
  )
);