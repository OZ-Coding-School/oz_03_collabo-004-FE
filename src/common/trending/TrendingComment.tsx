import { useEffect, useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { Comment } from "../../config/types";
import SkeletonTrendingComment from "../skeleton/SkeletonTrendingComment";
import { commentApi } from "../../api";
import { ModalPortal } from "../../config/ModalPortal";
import ModalDetail from "../modal/ModalDetail";
import { truncateText } from "../../util/truncate";

const TrendingComment = () => {
    const [trendingComments, setTrendingComments] = useState<Comment[]>([]);
    const [detailModalStatus, setDetailModalStatus] = useState(false);
    const [articleId, setArticleId] = useState<null | number>(null);
    useEffect(() => {
        const initTrendingComments = async () => {
            const commentResponse = await commentApi.commentTopList();
            setTrendingComments(commentResponse.data);
        };
        initTrendingComments();
    }, []);

    if (trendingComments.length === 0 || trendingComments === null) {
        return <SkeletonTrendingComment />;
    }

    const handleDetailModalOpen = (id: number) => {
        setArticleId(id);
        setDetailModalStatus(true);
    };

    const handleDetailModalClose = () => {
        setDetailModalStatus(false);
    };

    return (
        <>
            <div className="w-full h-full">
                <div className="flex items-center gap-1">
                    <FaFireAlt className="ml-1 text-literal-highlight" />
                    <p className="font-default text-md text-literal-highlight">인기 훈수</p>
                </div>
                <div className="flex flex-col w-full h-auto px-1 py-1 bg-white rounded-md">
                    {trendingComments.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => handleDetailModalOpen(item.article_id)}
                            className="flex items-center gap-2 px-2 py-1 transition rounded-md cursor-pointer hover:bg-gray-100"
                        >
                            <p className="text-base font-point text-slate-600">{index + 1}</p>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <img
                                        src={item.user_profile_image}
                                        alt="trending-content-image"
                                        className="rounded-full size-5"
                                    />
                                    <p className="text-sm font-default text-literal-normal">
                                        {truncateText(item.user_nickname, 10)}
                                    </p>
                                </div>
                                <p className="text-xs font-default text-literal-normal">
                                    {truncateText(item.content, 20)}
                                </p>
                            </div>
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

export default TrendingComment;
