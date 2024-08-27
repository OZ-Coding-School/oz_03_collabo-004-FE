export interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
    parent: string;
}

export interface UserData {
    article: string[];
    bio: string | null;
    comments: string[];
    hunsoo_level: number;
    nickname: string | null;
    profile_image: string | null;
    selected_comment_count: number;
    selected_tags: string[];
    warning_count: number;
}
