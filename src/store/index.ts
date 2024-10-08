import { create } from "zustand";

type Store = {
  topVisible: boolean;
  navbarIsOpen: boolean;
  setTopVisible: (value: boolean) => void;
  setNavbarIsOpen: (value: boolean) => void;
};

const useStore = create<Store>()((set) => ({
  topVisible: false,
  navbarIsOpen: false,
  setTopVisible: (value) => set({ topVisible: value }),
  setNavbarIsOpen: (value) => set({ navbarIsOpen: value }),
}));

export default useStore;
