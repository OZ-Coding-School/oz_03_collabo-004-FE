import { create } from "zustand";

interface ToastStore {
    toast: {
        status: boolean;
        text: string;
    };
    setToast: (bool: boolean, text: string) => void;
}
export const useToastStore = create<ToastStore>((set) => ({
    toast: {
        status: false,
        text: "",
    },
    setToast: (bool, text) => set(() => ({ toast: { status: bool, text: text } })),
}));
