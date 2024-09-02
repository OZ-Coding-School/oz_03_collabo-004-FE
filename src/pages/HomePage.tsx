import { useEffect, useState } from "react";
import Header from "../common/header/Header";
import Topic from "./../common/topic/Topic";
import TrendingContent from "./../common/trending/TrendingContent";
import ProfileStatus from "./../common/profile/ProfileStatus";
import TrendingComment from "./../common/trending/TrendingComment";
import ProfileImage from "./../common/profile/ProfileImage";
import ModalEditor from "../common/modal/ModalEditor";
import Content from "../common/content/Content";
import ContentFooter from "../common/content/ContentFooter";
import { Article, Tag } from "../config/types";
import { axiosInstance } from "../api/axios";
import SkeletonContent from "../common/skeleton/SkeletonContent";

const HomePage = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const checkScreenSize = () => {
        const screenWidth = window.innerWidth;
        setIsHidden(screenWidth < 768);
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    const fetchArticles = async (tag: string | null = null) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get<Article[]>("/article/", { withCredentials: true });

            if (!Array.isArray(response.data)) {
                throw new Error("Expected an array of articles");
            }

            setArticles(
                tag ? response.data.filter((article) => article.tags.some((t: Tag) => t.name === tag)) : response.data
            );
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    useEffect(() => {
        fetchArticles(selectedTag);
    }, [selectedTag]);

    return (
        <div className="relative min-h-screen font-default">
            <div className="fixed top-0 left-0 z-10 w-full bg-white shadow-md">
                <Header />
            </div>
            <div className="flex flex-col px-4 mt-[50px] md:flex-row max-w-[1280px] mx-auto">
                <div className={`flex flex-col mt-4 items-center ${isHidden ? "hidden" : "md:w-[226px]"}`}>
                    <Topic onSelectTag={setSelectedTag} selectedTag={selectedTag} />
                </div>
                <div className="flex flex-col items-center flex-1 md:w-[658px]">
                    <div className="flex items-center mt-4 mb-4 space-x-4">
                        <ProfileImage />
                        <ModalEditor />
                    </div>
                    {loading ? (
                        <>
                            <SkeletonContent type={1} />
                            <SkeletonContent type={2} />
                            <SkeletonContent type={1} />
                        </>
                    ) : (
                        articles.map((article) => (
                            <div key={article.article_id} className="mb-8">
                                <ProfileStatus userName={article.user.nickname} />
                                <Content articleId={article.article_id} />
                                <ContentFooter
                                    articleId={Number(article.article_id)}
                                    likeCount={article.like_count}
                                    viewCount={article.view_count}
                                    commentsCount={article.comments_count}
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className={`flex flex-col mt-4 ${isHidden ? "hidden" : "md:w-[226px]"} space-y-4`}>
                    <TrendingContent />
                    <TrendingComment />
                </div>
                <ModalPortal>
                    {isDetailModalOpen && selectedArticleId && (
                        <ModalDetail
                            isOpen={isDetailModalOpen}
                            parent="content-parent"
                            onClose={closeDetailModal}
                            articleId={selectedArticleId}
                        />
                    )}
                </ModalPortal>
            </div>
        </div>
    );
};

export default HomePage;
