import { create } from 'zustand';

type Store = {
  topVisible: boolean;
  navbarIsOpen: boolean;
  activeSection: string;
  setTopVisible: (value: boolean) => void;
  setNavbarIsOpen: (value: boolean) => void;
  setActiveSection: (value: string) => void;
};

const useStore = create<Store>()((set) => ({
  topVisible: true,
  navbarIsOpen: false,
  activeSection: 'home',
  setTopVisible: (value) => set({ topVisible: value }),
  setNavbarIsOpen: (value) => set({ navbarIsOpen: value }),
  setActiveSection: (value) => set({ activeSection: value }),
}));

export default useStore;
