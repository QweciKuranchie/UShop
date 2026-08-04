import { create } from "zustand";

interface AuthModalState {
  isOpen: boolean;
  mode: "sign-in" | "sign-up";
  openAuthModal: (mode?: "sign-in" | "sign-up") => void;
  closeAuthModal: () => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  mode: "sign-in",
  openAuthModal: (mode = "sign-in") => set({ isOpen: true, mode }),
  closeAuthModal: () => set({ isOpen: false }),
}));
