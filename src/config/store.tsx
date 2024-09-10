import { create } from "zustand";
import { UserData, AllArticle } from "./types";

interface AuthStore {
    status: null | boolean;
    setStatus: (bool: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    status: null,
    setStatus: (bool: boolean) => set(() => ({ status: bool })),
}));
interface UserStore {
    user: UserData;
    otherUser: UserData;
    initUser: (Form: UserData) => void;
    initOtherUser: (Form: UserData) => void;
    updateUser: (user: Partial<UserData>) => void;
    updateOtherUser: (user: Partial<UserData>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: {
        articles: [],
        bio: null,
        comments: [],
        hunsoo_level: 1,
        user_id: 0,
        nickname: null,
        profile_image: "/img/profile_placeholder.png",
        selected_comment_count: 0,
        selected_tags: [],
        warning_count: 0,
        status: true,
        exp: 0,
        verified: false,
        like: false,
    },
    otherUser: {
        articles: [],
        bio: null,
        comments: [],
        hunsoo_level: 1,
        user_id: 0,
        nickname: null,
        profile_image: "/img/profile_placeholder.png",
        selected_comment_count: 0,
        selected_tags: [],
        warning_count: 0,
        status: false,
        exp: 0,
        verified: true,
        like: false,
    },
    initUser: (form: UserData) => set(() => ({ user: form })),
    initOtherUser: (form: UserData) => set(() => ({ otherUser: form })),
    updateUser: (updatedUser) =>
        set((state) => ({
            user: { ...state.user, ...updatedUser },
        })),
    updateOtherUser: (updatedUser) =>
        set((state) => ({
            otherUser: { ...state.user, ...updatedUser },
        })),
}));

interface ArticleStore {
    article: AllArticle[] | null;
    search: AllArticle[] | null;
    selectTag: number;

    initArticle: (form: AllArticle[]) => void;
    initSearch: (form: AllArticle[]) => void;
    setTag: (tag: number) => void;
}

export const useArticleStore = create<ArticleStore>((set) => ({
    article: null,
    search: null,
    selectTag: 0,
    initArticle: (form: AllArticle[]) => set(() => ({ article: form })),
    initSearch: (form: AllArticle[]) => set(() => ({ search: form })),
    setTag: (tag: number) => set(() => ({ selectTag: tag })),
}));

interface Image {
    src: string[] | null;
    id: string[] | null;
}

interface ImageStore {
    image: Image;
    initImage: (src: string[], id: string[]) => void;
    addImage: (src: string, id: string) => void;
    removeImage: (src: string, id: string) => void;
    resetImage: () => void;
}

export const useImageStore = create<ImageStore>((set) => ({
    image: { src: null, id: null },
    initImage: (src: string[], id: string[]) => set(() => ({ image: { src, id } })), // 이미지 초기화
    addImage: (src: string, id: string) =>
        set((state) => ({
            image: {
                src: state.image.src ? [...state.image.src, src] : [src],
                id: state.image.id ? [...state.image.id, id] : [id],
            },
        })),
    removeImage: (src: string, id: string) =>
        set((state) => ({
            image: {
                src: state.image.src?.filter((img) => img !== src) || null,
                id: state.image.id?.filter((imgId) => imgId !== id) || null,
            },
        })),
    resetImage: () => set(() => ({ image: { src: null, id: null } })), // 초기화
}));
