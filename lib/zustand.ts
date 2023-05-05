import create from "zustand";

interface IScroll {
  scrollSet: boolean;
  setScroll: () => void;
  unsetScroll: () => void;
}

interface ISearch {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

interface IToggle {
  isToggle: boolean;
  toggleNav: () => void;
  untoggleNav: () => void;
}

interface ITheme {
  theme: any;
  setTheme: (theme: any) => void;
}
interface Modal {
  isOpen:boolean;
  open:()=>void;
  close:()=>void;
}

export const useSetBodyScroll = create<IScroll>((set) => ({
  scrollSet: true,
  unsetScroll: () => set((state) => ({ scrollSet: (state.scrollSet = false) })),
  setScroll: () => set((state) => ({ scrollSet: (state.scrollSet = true) })),
}));

export const useSearch = create<Modal>((set) => ({
  isOpen: false,
  open: () => set((state) => ({ isOpen: (state.isOpen = true) })),
  close: () => set((state) => ({ isOpen: (state.isOpen = false) })),
}));

export const useToggle = create<IToggle>((set) => ({
  isToggle: false,
  toggleNav: () => set((state) => ({ isToggle: (state.isToggle = true) })),
  untoggleNav: () => set((state) => ({ isToggle: (state.isToggle = false) })),
}));

export const useTheme = create<ITheme>((set) => ({
  theme: "pinkTheme",
  setTheme: (theme: string) => set({ theme }),
}));

export const useThemeModal = create<Modal>((set)=>({
  isOpen: false,
  open: () => set((state) => ({ isOpen: (state.isOpen = true) })),
  close: () => set((state) => ({ isOpen: (state.isOpen = false) })),
}));
