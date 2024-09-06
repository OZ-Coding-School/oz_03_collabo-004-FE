import { MyArticle, MyComment } from "../../config/types";
import Badge from "../badge/Badge";
import ModalDetail from "../modal/ModalDetail";
import { ModalPortal } from "../../config/ModalPortal";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { truncateText } from "../../util/truncate";
import useHighlight from "../../hooks/useHighlight";
import { useLocation, useNavigate } from "react-router-dom";
import ModalEditor from "../modal/ModalEditor";

interface ContentMyPageProps {
    activeTab: number;
    article?: MyArticle | null;
    comment?: MyComment | null;
}

const ContentMyPage = ({ activeTab, article, comment }: ContentMyPageProps) => {
    const isArticleTab = activeTab === 0 && article;
    const isCommentTab = activeTab === 1 && comment;
    const nav = useNavigate();
    const location = useLocation();

    const createdAt = isArticleTab ? article.created_at : isCommentTab ? comment.created_at : null;
    const formattedDate = dayjs(createdAt).format("YYYY년 MM월 DD일");
    const editorFormURL = new URLSearchParams(location.search).get("editor");

    //모달관련
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState<number>();
    const [editModalStatus, setEditModalStatus] = useState(false);

    useEffect(() => {
        if (editorFormURL) {
            setEditModalStatus(true);
        }
    }, [editorFormURL]);

    const editModalSelectHandler = (id: string) => {
        nav(`?editor=${id}`);
    };

    const editModalCloseHandler = () => {
        setEditModalStatus(false);
        nav("/my");
    };

    const openDetailModal = (article_id: number) => {
        setSelectedArticleId(article_id);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    useHighlight();

    const removeImagesFromHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const images = doc.getElementsByTagName("img");

        while (images.length > 0) {
            images[0].parentNode!.removeChild(images[0]);
        }

        return doc.body.innerHTML;
    };

    const sanitizeAndRemoveImages = (html: string) => {
        const sanitized = DOMPurify.sanitize(html);
        return removeImagesFromHtml(sanitized);
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
                    <div
                        className={`flex justify-center mt-[20px] mb-[10px] ${article.thumbnail_image ? "" : "hidden"}`}
                    >
                        {article.thumbnail_image && (
                            <img
                                src={article.thumbnail_image}
                                alt={article.title}
                                className="object-cover w-[426px] h-[200px] rounded-[5px]"
                            />
                        )}
                    </div>
                    <div
                        className="my-3 text-literal-normal font-normal text-sm overflow-hidden custom-code-block tiptab prose ProseMirror"
                        dangerouslySetInnerHTML={{
                            __html: sanitizeAndRemoveImages(truncateText(article.content, 300)),
                        }}
                    />
                </div>

                <ModalPortal>
                    {isDetailModalOpen && selectedArticleId && (
                        <ModalDetail
                            onSelect={editModalSelectHandler}
                            isOpen={isDetailModalOpen}
                            parent="home-parent"
                            onClose={closeDetailModal}
                            articleId={article.article_id}
                        />
                    )}
                    {editModalStatus && selectedArticleId && (
                        <ModalEditor parent="home-parent" isOpen={editModalStatus} onClose={editModalCloseHandler} />
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
                            onSelect={editModalSelectHandler}
                            isOpen={isDetailModalOpen}
                            parent="home-parent"
                            onClose={closeDetailModal}
                            articleId={Number(comment.article_id)}
                        />
                    )}
                </ModalPortal>
            </div>
        );
    }

    return null;
};

export default ContentMyPage;
