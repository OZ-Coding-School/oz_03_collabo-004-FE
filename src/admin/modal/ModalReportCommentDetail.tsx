import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "../../config/store";
import { useEffect, useState } from "react";
import { MyComment, MyArticle, AiHunsu } from "../../config/types";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { articleDetail } from "../../api/article";
import { aiHunsuDetail } from "../../api/ai";
import { adminApi, commentApi } from "../../api";
import hljs from "highlight.js";
import Badge from "../../common/badge/Badge";
import CommentInput from "../../common/comment/CommentInput";
import { twMerge as tw } from "tailwind-merge";
import ProfileStatus from "../../common/profile/ProfileStatus";
import CommentDetail from "../../common/comment/CommentDetail";
import { IoClose, IoWarning } from "react-icons/io5";
import useScrollLock from "../../hooks/useScrollLock";
import Button from "../../common/button/Button";

interface ModalReportDetailProps {
    onClose: () => void;
    refetch: () => void;
    isOpen: boolean;
    parent: string;
    articleId: number;
    reportId: number;
    reportDetail: string;
}

const ModalReportCommentDetail = ({
    onClose,
    isOpen,
    parent,
    articleId,
    reportId,
    reportDetail,
    refetch,
}: ModalReportDetailProps) => {
    const { user } = useUserStore();
    const [comments, setComments] = useState<MyComment[]>([]);
    const [articleData, setArticleData] = useState<MyArticle | undefined>(undefined);
    const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
    const [aiData, setAiData] = useState<AiHunsu>();
    const [hideInput, setHideInput] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [alertText, setAlertText] = useState<null | string>(null);
    const sanitizer = DOMPurify.sanitize;

    const alertHandler = (text: string) => {
        setIsAlert(true);
        setAlertText(text);
    };

    const nav = useNavigate();
    useScrollLock(isOpen, parent);
    const formattedDate = dayjs(articleData && articleData.created_at).format("YYYY년 MM월 DD일 HH:mm");

    useEffect(() => {
        const getDetails = async () => {
            setIsLoading(true);
            try {
                const articleResponse = await articleDetail(articleId);

                setArticleData(articleResponse.data);
                setComments(articleResponse.data.comments || []);

                const aiResponse = await aiHunsuDetail(articleId);

                if (aiResponse.status) setAiData(aiResponse.data);
            } catch (error) {
                console.log("데이터 불러오기 실패", error);
                nav("/admin");
            } finally {
                setIsLoading(false);
            }
        };
        getDetails();
    }, [articleId, nav]);

    const handleSelect = async (comment_id: number) => {
        setIsSelecting(true);
        setSelectedCommentId(comment_id);
        try {
            const response = await commentApi.commentSelect(comment_id);
            console.log("채택 성공:", response.data);
            setAiData(response.data);
            setComments((prevComments) =>
                prevComments.map((comment) => (comment.id === comment_id ? { ...comment, is_selected: true } : comment))
            );
        } catch (error) {
            console.error("채택 실패:", error);
        } finally {
            setIsSelecting(false);
        }
    };

    const handleCommentSubmit = (newComment: MyComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    useEffect(() => {
        const result = comments.some((comment) => comment.user === user.user_id);
        setHideInput(result);
    }, [comments, user.user_id]);

    useEffect(() => {
        const codeTags = document.getElementsByTagName("code");

        for (let i = 0; i < codeTags.length; i++) {
            const element = codeTags[i];
            const code = element.textContent || "";

            const result = hljs.highlightAuto(code);

            element.innerHTML = result.value;
        }
    }, [isLoading]);

    const handleModalExit = () => {
        onClose();
    };

    const handleReportAccept = async () => {
        onClose();
        adminApi.commentReportUpdate(reportId, "RS");
        refetch();
    };
    const handleReportReject = async () => {
        onClose();
        adminApi.commentReportUpdate(reportId, "RJ");
        refetch();
    };

    useEffect(() => {
        if (isAlert) {
            const timer = setTimeout(() => {
                setIsAlert(false);
                setAlertText(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isAlert]);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="modal-content z-40 fixed flex justify-center items-center inset-0 bg-black w-full h-full"
            ></motion.nav>
            <div
                onClick={handleModalExit}
                className="text-literal-normal inset-0 font-default fixed flex items-center justify-center md:px-3 z-40 "
            >
                <motion.nav
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full h-full md:w-[870px] md:max-h-[80vh] md:rounded-md bg-white relative py-10 px-5 md:px-14 overflow-auto"
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full"></div>
                    ) : (
                        <div className="flex flex-col gap-2 min-w-[300px]">
                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    {articleData &&
                                        articleData.tags.map((tag) => (
                                            <Badge key={tag.tag_id} color="yellow">
                                                {tag.name.slice(0, -2)}
                                            </Badge>
                                        ))}
                                </div>
                            </div>
                            <div className="text-sm flex gap-5 pb-3">
                                <p className="font-semibold">{articleData && articleData.user.nickname}</p>
                                <p className="text-gray-500">{formattedDate}</p>
                            </div>
                            <div className="text-xl my-2">{articleData && articleData.title}</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizer((articleData && articleData.content) as string),
                                }}
                                className="pt-3 text-[16px] pb-20 mb-3 border-b border-b-gray-100 tiptap prose ProseMirror"
                            />

                            {articleData &&
                                user.user_id !== articleData.user.user_id &&
                                !hideInput &&
                                !articleData.is_closed && (
                                    <div className="my-5">
                                        <CommentInput
                                            onClose={onClose}
                                            articleId={articleData?.article_id}
                                            onCommentSubmit={handleCommentSubmit}
                                            toast={alertHandler}
                                        />
                                    </div>
                                )}

                            {comments.length !== 0 &&
                                comments.map((comment, index) => (
                                    <motion.div
                                        animate={{ opacity: [0, 1] }}
                                        transition={{ delay: 0.3 }}
                                        key={`${comment.id}-${index}`}
                                        className={tw("flex flex-col", comment.user === user.user_id && "items-end")}
                                    >
                                        <div className="relative w-[90%] h-full rounded-[15px] flex flex-col justify-between mb-1">
                                            {articleData?.user && (
                                                <ProfileStatus
                                                    nickname={comment.user_nickname}
                                                    user_id={comment.user}
                                                    hunsoo_level={articleData.user.hunsoo_level}
                                                    profile_image={comment.user_profile_image}
                                                />
                                            )}
                                        </div>
                                        <CommentDetail
                                            key={`comment-${comment.id}-${index}`}
                                            color={comment.user === user.user_id ? "writer" : "default"}
                                            comment={comment}
                                            article_user_id={articleData && articleData.user.user_id}
                                            onSelect={handleSelect}
                                            toast={alertHandler}
                                        />

                                        {/* 선택된 comment_id 뒤에만 스켈레톤 표시 */}
                                        {selectedCommentId === comment.id && isSelecting && (
                                            <div className="animate-pulse w-full h-32 bg-gray-200 rounded-2xl mt-2 mb-2"></div>
                                        )}
                                        {/* ai 있을때 */}
                                        {comment.is_selected && aiData && (
                                            <CommentDetail
                                                key={`ai-${comment.id}-${index}`}
                                                color="ai"
                                                comment={comment}
                                                ai={aiData}
                                                article_user_id={articleData && articleData.user.user_id}
                                                toast={alertHandler}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                        </div>
                    )}

                    <IoClose
                        onClick={onClose}
                        title="닫기"
                        className="absolute text-gray-400 hover:text-gray-800 transition cursor-pointer w-[28px] h-[28px] top-2 right-2"
                    />
                    <div className="mt-5 w-full flex flex-col bottom-40 text-center text-lg">
                        <div className="bg-stone-500 p-2 rounded-t-lg text-stone-50">신고 내용</div>
                        <div className="w-full h-fit bg-stone-200 py-4 px-2 rounded-b-lg">
                            <div className="text-lg text-left flex-grow h-full">{reportDetail}</div>
                            <div className="flex justify-end gap-1 mt-10">
                                <Button onClick={handleReportAccept} className="border" color="danger">
                                    신고 접수
                                </Button>
                                <Button onClick={handleReportReject} className="border" color="default">
                                    신고 무시
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.nav>
                <AnimatePresence>
                    {isAlert && (
                        <motion.div
                            initial={{ translateY: -100 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: -100 }}
                            transition={{ type: "spring", duration: 1 }}
                            className="flex items-center gap-2 bg-opacity-75 bg-orange-600 p-2 rounded-lg absolute top-10 text-background"
                        >
                            <IoWarning />
                            <div>{alertText}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default ModalReportCommentDetail;
