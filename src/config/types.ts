export interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
    parent: string;
    imageUrl?: string;
    comment_id?: number;
}

export interface DetailModalProps {
    onClose: () => void;
    onSelect?: (id: string) => void;
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
    profile_image: string;
    selected_comment_count: number;
    selected_tags: number[];
    warning_count: number;
    status: boolean;
    exp: number;
}

export interface User {
    user_id: number;
    nickname: string;
    profile_image: string;
    hunsoo_level: number;
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
    article_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    helpful_count: number;
    not_helpful_count: number;
    is_selected: boolean;
    images: CommentImage[];
    user: number;
    user_nickname: string;
    user_profile_image: string;
    reaction: string;
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

export interface AllImages {
    id: number;
    image_url: string;
    is_thumbnail: boolean;
}
export interface AllTags {
    tag_id: number;
    name: string;
}
export interface AllArticle {
    article_id: number;
    comments_count: number;
    content: string;
    created_at: string;
    updated_at: string;
    images: AllImages[];
    like_count: number;
    tags: AllTags[];
    thumbnail_image: string;
    title: string;
    view_count: number;
    user: {
        hunsoo_level: number;
        nickname: string;
        profile_image: string;
        user_id: number;
    };
}

export interface notification {
    id: number;
    recipient: number;
    actor_nickname?: string;
    actor_username?: string;
    verb: string;
    content_type: string;
    object_id: number;
    target_object: string;
    read: boolean;
    timestamp: string;
    description: string;
    article_title: string;
    comment_content: string;
    article_id: number;
}

//? ADMIN
export interface AdminUserListType {
    created_at: string;
    email: string;
    hunsoo_level: number;
    id: number;
    is_active: boolean;
    is_superuser: boolean;
    last_login: string;
    selected_tags: number[];
    social_platform: string;
    updated_at: string;
    username: string;
    nickname: string;
    warning_count: number;
}

interface Report {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    report_detail: string;
    status: string;
    reporter: number;
    reported_user: number;
    reported_article: number;
}
type ArticleReport = Report;
type CommentReport = Report;

// 전체 데이터 구조를 나타내는 타입
interface ReportData {
    article_reports: ArticleReport[];
    comment_reports: CommentReport[];
}

export interface AdminList {
    userList: AdminUserListType[];
    reportList: ReportData;
    articleList: Article[];
}
