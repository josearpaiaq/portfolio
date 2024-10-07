import { create } from "zustand";

type Store = {
  topVisible: boolean;
  setTopVisible: (value: boolean) => void;
};

const useStore = create<Store>()((set) => ({
  topVisible: false,
  setTopVisible: (value) => set({ topVisible: value }),
}));

export default useStore;
