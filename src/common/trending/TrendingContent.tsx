import { useState, useEffect } from "react";
import { FaFireAlt } from "react-icons/fa";
import { AllArticle } from "../../config/types";
import SkeletonTrendingContent from "../skeleton/SkeletonTrendingContent";
import { ModalPortal } from "../../config/ModalPortal";
import ModalDetail from "../modal/ModalDetail";
import { articleApi } from "../../api";
import { truncateText } from "../../util/truncate";
import { FaQuestion } from "react-icons/fa";
const TrendingContent = () => {
    const [trendingArticles, setTrendingArticles] = useState<AllArticle[]>([]);
    const [articleId, setArticleId] = useState<null | number>(null);
    const [detailModalStatus, setDetailModalStatus] = useState(false);
    useEffect(() => {
        const initTrendingContents = async () => {
            const articleResponse = await articleApi.articleTopList();
            setTrendingArticles(articleResponse.data);
        };
        initTrendingContents();
    }, []);

    if (trendingArticles.length === 0 || trendingArticles === null) {
        return <SkeletonTrendingContent />;
    }

    const handleDetailModalOpen = (id: number) => {
        setArticleId(id);
        setDetailModalStatus(true);
    };

    const handleDetailModalClose = () => {
        setDetailModalStatus(false);
    };

    console.log(trendingArticles);

    return (
        <>
            <div className="w-full h-full">
                <div className="flex items-center gap-1">
                    <FaFireAlt className="ml-1 text-literal-highlight" />
                    <p className="font-default text-md text-literal-highlight">인기 게시글</p>
                </div>
                <div className="flex flex-col w-full h-auto px-1 py-1 bg-white rounded-md ">
                    {trendingArticles.map((article, index) => (
                        <div
                            key={article.article_id}
                            onClick={() => handleDetailModalOpen(article.article_id)}
                            className="flex items-center gap-2 px-2 py-1 transition rounded-md cursor-pointer hover:bg-gray-100"
                        >
                            <p className="text-md font-point text-slate-600">{index + 1}</p>
                            {article.thumbnail_image === null ? (
                                <FaQuestion className="rounded-md w-[32px] h-[32px] p-1 bg-slate-300 text-white" />
                            ) : (
                                <img
                                    src={article.thumbnail_image || "https://dummyimage.com/32x32/000/fff"}
                                    alt="trending-content-image"
                                    className="rounded-md w-[32px] h-[32px]"
                                />
                            )}

                            <p className="text-[14px] font-normal font-default text-literal-normal">
                                {truncateText(article.title, 11)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <ModalPortal>
                {detailModalStatus && (
                    <ModalDetail
                        parent="home-parent"
                        onClose={handleDetailModalClose}
                        articleId={articleId as number}
                        isOpen={detailModalStatus}
                    />
                )}
            </ModalPortal>
        </>
    );
};

export default TrendingContent;
