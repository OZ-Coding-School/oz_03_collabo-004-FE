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
import TopicDrop from "../common/topic/TopicDrop";

const HomePage = () => {
    const [editModalStatus, setEditModalStatus] = useState(false);
    const [detailModalStatus, setDetailModalStatus] = useState(false);
    const { user } = useUserStore();
    const { article, initArticle, selectTag } = useArticleStore();
    const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
    const [filterArticle, setFilterArticle] = useState<AllArticle[] | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const articleIdFromURL = new URLSearchParams(location.search).get("article");
    const searchFormURL = new URLSearchParams(location.search).get("search");
    const editorFormURL = new URLSearchParams(location.search).get("editor");

    const initArticles = useCallback(async () => {
        const articleResponse = await articleApi.articleList();
        initArticle(articleResponse.data);
    }, [initArticle]);

    const editModalSelectHandler = (id: string) => {
        navigate(`?editor=${id}`);
        setEditModalStatus(true);
    };

    const editModalOpenHandler = () => {
        navigate(`?editor=new`);
        setEditModalStatus(true);
    };

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

    useEffect(() => {
        if (editorFormURL) {
            setEditModalStatus(true);
        } else {
            setEditModalStatus(false);
        }
    }, [editorFormURL]);

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
            return article.filter((item) => [2, 3, 4, 5, 6, 7].includes(item.tags[0]?.tag_id));
        } else if (selectTag === 8) {
            return article.filter((item) => [9, 10].includes(item.tags[0]?.tag_id));
        } else if (selectTag === 100) {
            return article.filter((item) => user.selected_tags.includes(item.tags[0]?.tag_id));
        } else {
            return article.filter((item) => item.tags[0]?.tag_id === selectTag);
        }
    }, [article, selectTag, user.selected_tags]);

    // 필터링된 결과를 상태에 저장
    useEffect(() => {
        setFilterArticle(filteredArticles);
    }, [filteredArticles]);

    return (
        <div className="min-h-screen text-black bg-gray-100 home-parent dark:bg-gray-900">
            <Header />
            <div className="flex font-default w-full justify-center mx-auto pt-[80px] gap-10">
                <nav className="hidden xl:block w-[190px] h-fit sticky top-[80px]">
                    <Topic />
                </nav>
                <main className="w-full xl:max-w-[658px] mx-4 xl:mx-0 flex flex-col items-center">
                    {user.nickname && (
                        <div className="flex items-center justify-center w-full gap-3 mb-4">
                            <div className="w-[40px] h-[40px] relative ">
                                <ProfileImage src={user.profile_image} />
                            </div>

                            <EditorInput onClick={() => editModalOpenHandler()} />
                        </div>
                    )}
                    {!filterArticle && (
                        <div className="flex flex-col gap-4">
                            <SkeletonContent type={1} />
                            <SkeletonContent type={2} />
                            <SkeletonContent type={1} />
                            <SkeletonContent type={2} />
                        </div>
                    )}
                    {filterArticle && filterArticle.length === 0 && <div>검색 결과가 없습니다.</div>}
                    {filterArticle &&
                        filterArticle.map((article) => (
                            <motion.div
                                animate={{ opacity: [0, 1], translateY: [10, 0] }}
                                className="w-full mb-4"
                                key={article.article_id}
                            >
                                <ProfileStatus
                                    nickname={article.user.nickname}
                                    hunsoo_level={article.user.hunsoo_level}
                                    profile_image={article.user.profile_image}
                                    user_id={article.user.user_id}
                                />
                                <div className="duration-200 hover:shadow-md hover:-translate-y-1 rounded-xl">
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
                <nav className="flex-col hidden gap-4 xl:flex">
                    <div className="w-[226px] h-fit sticky top-[80px]">
                        <TrendingContent />
                    </div>
                    <div className="w-[226px] h-fit sticky top-[352px]">
                        <TrendingComment />
                    </div>
                </nav>
            </div>
            <TopicDrop />
            <ModalPortal>
                {editModalStatus && (
                    <ModalEditor onClose={editModalCloseHandler} parent={"home-parent"} isOpen={editModalStatus} />
                )}
                {detailModalStatus && (
                    <ModalDetail
                        isOpen={detailModalStatus}
                        parent={"home-parent"}
                        onClose={detailModalCloseHandler}
                        onSelect={editModalSelectHandler}
                        articleId={selectedArticleId as number}
                    />
                )}
            </ModalPortal>
        </div>
    );
};

export default HomePage;
