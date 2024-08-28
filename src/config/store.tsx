import { create } from "zustand";
import { UserData } from "./types";
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

interface UserStore {
    user: UserData;
    initUser: (Form: UserData) => void;
    updateUser: (user: Partial<UserData>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: {
        articles: [],
        bio: null,
        comments: [],
        hunsoo_level: 1,
        nickname: null,
        profile_image: null,
        selected_comment_count: 0,
        selected_tags: [],
        warning_count: 0,
        status: true,
    },
    initUser: (form: UserData) => set(() => ({ user: form })),
    updateUser: (updatedUser) =>
        set((state) => ({
            user: { ...state.user, ...updatedUser },
        })),
}));
