import { axiosInstance } from "./axios";

export const articleDetail = (article_id: number) => {
    return axiosInstance.get(`/article/${article_id}/`);
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
    thumbnail_image: string | null;
}

interface ViewResponse {
    article_id: number;
    view_count: number;
}

export const ArticleList = async (): Promise<Article[]> => {
    try {
        const response = await axiosInstance.get<Article[]>("/article/", { withCredentials: true });

        const articles = response.data;

        if (!Array.isArray(articles)) {
            throw new Error("Expected an array of articles");
        }

        return articles.map((article) => ({
            article_id: article.article_id,
            title: article.title,
            content: article.content,
            user: article.user,
            tags: article.tags,
            view_count: article.view_count,
            like_count: article.like_count,
            comments_count: article.comments_count,
            created_at: article.created_at,
            updated_at: article.updated_at,
            thumbnail_image: article.thumbnail_image ?? null,
        }));
    } catch (error) {
        console.error("Failed to fetch content list:", error);
        throw error;
    }
};

export const ArticleAddView = async (article_id: number): Promise<number> => {
    try {
        const response = await axiosInstance.get<ViewResponse>(`/article/${article_id}/view/`, {
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data.view_count;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error("Failed to add view:", error);
        throw error;
    }
};

export const ArticleAddLike = async (article_id: number) => {
    try {
        const response = await axiosInstance.post(`/article/${article_id}/like/`, {}, { withCredentials: true });

        if (response.status === 200) {
            const { like_count, message } = response.data;
            console.log(`Article ID: ${article_id}, ${message} - New Like Count: ${like_count}`);
            return { article_id, like_count, message };
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error("Failed to add/remove like:", error);
        throw error;
    }
};

export const ArticleDetail = (article_id: number) => {
    return axiosInstance.get(`/article/${article_id}/`, { withCredentials: true });
};
