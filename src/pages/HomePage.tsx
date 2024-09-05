import { useEffect, useState, useMemo, useCallback } from "react";
import Header from "../common/header/Header";
import EditorInput from "../common/input/EditorInput";
import ProfileImage from "../common/profile/ProfileImage";
import Topic from "../common/topic/Topic";
import TrendingComment from "../common/trending/TrendingComment";
import TrendingContent from "../common/trending/TrendingContent";
import { useArticleStore, useUserStore } from "../config/store";
import { articleApi } from "../api";
import SkeletonContent from "../common/skeleton/SkeletonContent";
import Content from "../common/content/Content";
import ContentFooter from "../common/content/ContentFooter";
import { ModalPortal } from "../config/ModalPortal";
import ModalEditor from "../common/modal/ModalEditor";
import ModalDetail from "../common/modal/ModalDetail";
import { AllArticle } from "../config/types";
import ProfileStatus from "../common/profile/ProfileStatus";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const HomePage = () => {
    const [editModalStatus, setEditModalStatus] = useState(false);
    const [detailModalStatus, setDetailModalStatus] = useState(false);
    const { user } = useUserStore();
    const { article, initArticle, selectTag } = useArticleStore();
    const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
    const [filterArticle, setFilterArticle] = useState<AllArticle[] | null>(null);
    const initArticles = useCallback(async () => {
        const articleResponse = await articleApi.ArticleList();
        initArticle(articleResponse.data);
    }, [initArticle]);
    const navigate = useNavigate();
    const location = useLocation();

    const articleIdFromURL = new URLSearchParams(location.search).get("article");
    const searchFormURL = new URLSearchParams(location.search).get("search");

    const editModalCloseHandler = () => {
        setEditModalStatus(false);
    };
    const detailModalCloseHandler = () => {
        setDetailModalStatus(false);
        navigate("/");
    };
    const handleArticleClick = async (id: number) => {
        await articleApi.articleView(id);
        setSelectedArticleId(id);
        navigate(`?article=${id}`);
        setDetailModalStatus(true);
    };

    // URL에 있는 articleId에 따라 모달 열기/닫기 제어
    useEffect(() => {
        if (articleIdFromURL) {
            setSelectedArticleId(Number(articleIdFromURL));
            setDetailModalStatus(true);
        } else {
            setDetailModalStatus(false);
        }
    }, [articleIdFromURL]);

    // article 초기화를 위한 useEffect
    useEffect(() => {
        if (!searchFormURL) {
            initArticles();
        }
    }, [initArticles, searchFormURL]);

    // 필터링을 위한 useMemo
    const filteredArticles = useMemo(() => {
        if (!article) return null;

        if (selectTag === 0) {
            return article;
        } else if (selectTag === 1) {
            return article.filter((item) => [2, 3, 4, 5, 6, 7].includes(item.tags[0].tag_id));
        } else if (selectTag === 8) {
            return article.filter((item) => [9, 10].includes(item.tags[0].tag_id));
        } else {
            return article.filter((item) => item.tags[0].tag_id === selectTag);
        }
    }, [article, selectTag]);

    // 필터링된 결과를 상태에 저장
    useEffect(() => {
        setFilterArticle(filteredArticles);
    }, [filteredArticles]);

    return (
        <div className="home-parent">
            <Header />
            <div className=" flex font-default w-full justify-center mx-auto pt-[80px] gap-10">
                <nav className="hidden xl:block w-[190px] h-fit sticky top-[80px]">
                    <Topic />
                </nav>
                <main className="w-full xl:max-w-[658px] mx-4 xl:mx-0 flex flex-col items-center">
                    <div className="flex gap-3 mb-4 w-full justify-center items-center">
                        <div className="w-[40px] h-[40px] relative ">
                            <ProfileImage src={user.profile_image} />
                        </div>
                        <EditorInput onClick={() => setEditModalStatus(true)} />
                    </div>
                    {!filterArticle && (
                        <div className="flex flex-col gap-4">
                            <SkeletonContent type={1} />
                            <SkeletonContent type={2} />
                            <SkeletonContent type={1} />
                            <SkeletonContent type={2} />
                        </div>
                    )}
                    {filterArticle && filterArticle.length === 0 && <div>검색 결과가 없습니다.</div>}{" "}
                    {filterArticle &&
                        filterArticle.map((article) => (
                            <motion.div
                                animate={{ opacity: [0, 1], translateY: [10, 0] }}
                                className="mb-4 w-full"
                                key={article.article_id}
                            >
                                <ProfileStatus
                                    nickname={article.user.nickname}
                                    hunsoo_level={article.user.hunsoo_level}
                                    profile_image={article.user.profile_image}
                                    user_id={article.user.user_id}
                                />
                                <div className="hover:shadow-md duration-200 hover:-translate-y-1 rounded-xl">
                                    <Content
                                        onClick={handleArticleClick}
                                        id={article.article_id}
                                        title={article.title}
                                        content={article.content}
                                        thumbnail_image={article.thumbnail_image}
                                    />
                                    <ContentFooter
                                        commentsCountClick={handleArticleClick}
                                        commentsCount={article.comments_count}
                                        view_count={article.view_count}
                                        like_count={article.like_count}
                                        articleId={article.article_id}
                                    />
                                </div>
                            </motion.div>
                        ))}
                </main>
                <nav className="hidden xl:flex flex-col gap-4">
                    <div className="w-[226px] h-fit sticky top-[80px]">
                        <TrendingContent />
                    </div>
                    <div className="w-[226px] h-fit sticky top-[352px]">
                        <TrendingComment />
                    </div>
                </nav>
            </div>
            <ModalPortal>
                {editModalStatus && (
                    <ModalEditor onClose={editModalCloseHandler} parent={"home-parent"} isOpen={editModalStatus} />
                )}
                {detailModalStatus && (
                    <ModalDetail
                        isOpen={detailModalStatus}
                        parent={"home-parent"}
                        onClose={detailModalCloseHandler}
                        articleId={selectedArticleId as number}
                    />
                )}
            </ModalPortal>
        </div>
    );
};

export default HomePage;
