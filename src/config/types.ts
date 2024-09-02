export interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
    parent: string;
    imageUrl?: string;
}

export interface DetailModalProps {
    onClose: () => void;
    isOpen: boolean;
    parent: string;
    articleId: number;
    imageUrl?: string;
}

export interface UserData {
    articles: MyArticle[];
    bio: string | null;
    comments: MyComment[];
    hunsoo_level: number;
    user_id: number;
    nickname: string | null;
    profile_image: string | null;
    selected_comment_count: number;
    selected_tags: number[];
    warning_count: number;
    status: boolean;
}

export interface User {
    user_id: number;
    nickname: string;
}

export interface Tag {
    tag_id: number;
    name: string;
}

export interface Article {
    article_id: number;
    title: string;
    content: string;
    user: User;
    tags: Tag[];
    view_count: number;
    like_count: number;
    comments_count: number;
    created_at: string;
    updated_at: string;
    thumbnail_image: string;
    is_closed: boolean;
}

export interface ViewResponse {
    article_id: number;
    view_count: number;
    is_closed: boolean;
}

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    helpful_count: number;
    not_helpful_count: number;
    is_selected: boolean;
    images: CommentImage[];
    user: number;
    user_nickname: string;
}

export interface CommentImage {
    id: number;
    image: string;
}

export interface MyArticle extends Article {
    comments: MyComment[];
}

export interface MyComment extends Comment {
    article_tags: Tag[];
    article_title: string;
    article_user_id: number;
    article_user_nickname: string;
    article_id: string;
}

export interface UserUpdateData {
    nickname?: string;
    bio?: string;
    selected_tags?: number[];
}

export interface UserRegisterData {
    username: string; // 유저 아이디
    nickname: string;
    email: string;
    password: string;
}

export interface UserLoginData {
    username: string;
    password: string;
}
export interface CommentFormData {
    content: string;
    images: FileList | null;
}

export interface AiHunsu {
    article: number;
    content: string;
    created_at: string;
    updated_at: string;
}
