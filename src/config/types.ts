export interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
    parent: string;
}

export interface UserData {
    articles: Article[];
    bio: string | null;
    comments: Comment[];
    hunsoo_level: number;
    nickname: string | null;
    profile_image: string | null;
    selected_comment_count: number;
    selected_tags: number[];
    warning_count: number;
    status: boolean;
}

export interface Tag {
    tag_id: number;
    name: string;
}

export interface Article {
    article_id: number;
    comments_count: number;
    content: string;
    created_at: string;
    like_count: number;
    tags: Tag[];
    thumbnail_image: string | null;
    title: string;
    updated_at: string;
    user: {
        user_id: number;
        nickname: string;
    };
    view_count: number;
}

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    helpful_count: number;
    not_helpful_count: number;
    is_selected: boolean;
    images: string[];
    user: number;
    user_nickname: string;
}

export interface UserUpdateData {
    nickname?: string;
    bio?: string;
    selected_tags?: number[];
}
