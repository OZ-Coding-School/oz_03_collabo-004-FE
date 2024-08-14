import { create } from "zustand";

interface ModalStore {
    modal: boolean;
    setModal: (bool: boolean) => void;
}
export const useModalStore = create<ModalStore>((set) => ({
    modal: false,
    setModal: (bool: boolean) => set(() => ({ modal: bool })),
}));
