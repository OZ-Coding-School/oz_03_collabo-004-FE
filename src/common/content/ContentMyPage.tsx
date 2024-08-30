import { MyArticle, MyComment } from "../../config/types";
import useFormatDate from "../../hooks/useFormatDate";
import Badge from "../badge/Badge";
import ModalDetail from "../modal/ModalDetail";
import { ModalPortal } from "../../config/ModalPortal";
import { useState } from "react";
import { articleDetail } from "../../api/Article";

interface ContentMyPageProps {
    activeTab: number;
    article?: MyArticle;
    comment?: MyComment;
}

const ContentMyPage = ({ activeTab, article, comment }: ContentMyPageProps) => {
    const isArticleTab = activeTab === 0 && article;
    const isCommentTab = activeTab === 1 && comment;

    const createdAt = isArticleTab ? article.created_at : isCommentTab ? comment.created_at : null;
    const formattedDate = useFormatDate(createdAt);

    const [articleData, setArticleData] = useState<MyArticle>();

    //모달관련
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const openDetailModal = async (article_id: number) => {
        setIsDetailModalOpen(true);
        console.log(article_id);
        try {
            const response = await articleDetail(article_id);
            console.log(response.data);
            setArticleData(response.data);
        } catch (error) {
            console.log("게시글 불러오기 실패", error);
        }
    };
    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    if (isArticleTab) {
        return (
            <div className="max-w-[780px] min-w-[300px] my-5 content-parent">
                <div className="sm:flex gap-2 mb-3 ml-2">
                    <div className="flex gap-2 sm:mt-0 mt-2">
                        <p className="text-sm text-gray-600 mr-2 font-default">{formattedDate}</p>
                        {article.tags.map((tag) => (
                            <Badge key={tag.tag_id} color="yellow">
                                {tag.name.slice(0, -2)}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div
                    className="bg-white px-6 py-4 w-full rounded-2xl cursor-pointer duration-200 hover:shadow-md hover:-translate-y-1"
                    onClick={() => openDetailModal(article.article_id)}
                >
                    <p className="text-base sm:text-lg font-default text-literal-normal pb-3 border-b border-b-gray-100">
                        {article.title}
                    </p>
                    <p className="my-3 text-literal-normal font-normal text-sm max-h-5 overflow-hidden">
                        {article.content}
                    </p>
                </div>

                <ModalPortal>
                    {isDetailModalOpen && (
                        <ModalDetail
                            isOpen={isDetailModalOpen}
                            parent="content-parent"
                            onClose={closeDetailModal}
                            articleData={articleData}
                        />
                    )}
                </ModalPortal>
            </div>
        );
    }

    if (isCommentTab) {
        return (
            <div className="max-w-[780px] min-w-[300px] my-5">
                <div className="sm:flex gap-2 mb-3 ml-2">
                    <p className="text-sm font-medium mr-4 text-literal-normal">{comment.article_user_nickname}</p>

                    <div className="flex gap-2 sm:mt-0 mt-2">
                        <p className="text-sm text-gray-600 mr-2 font-default">{formattedDate}</p>
                        {comment.article_tags?.map((tag) => (
                            <Badge key={tag.tag_id} color="yellow">
                                {tag.name.slice(0, -2)}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div
                    className="bg-white px-6 py-4 w-full rounded-2xl cursor-pointer duration-200 hover:shadow-md hover:-translate-y-1"
                    onClick={() => openDetailModal(Number(comment.article_id))}
                >
                    <p className="text-base sm:text-lg font-default text-literal-normal pb-3 border-b border-b-gray-100">
                        {comment.article_title}
                    </p>
                    <p className="font-default text-sm text-gray-600 font-normal p-2">
                        {comment.is_selected ? <span className="text-literal-highlight">채택</span> : "미채택"}
                    </p>
                    <div className="bg-gray-100 rounded-2xl">
                        <p className="text-literal-normal font-normal text-sm py-4 px-6">{comment.content}</p>
                    </div>
                </div>
                <ModalPortal>
                    {isDetailModalOpen && (
                        <ModalDetail
                            isOpen={isDetailModalOpen}
                            parent="content-parent"
                            onClose={closeDetailModal}
                            articleData={articleData}
                        />
                    )}
                </ModalPortal>
            </div>
        );
    }

    return null; // 아무 것도 없을 경우 null 반환
};

export default ContentMyPage;
