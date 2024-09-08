import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoClose, IoWarning } from "react-icons/io5";
import { AiHunsu, DetailModalProps } from "../../config/types";
import Badge from "../badge/Badge";
import { useUserStore } from "../../config/store";
import CommentInput from "../comment/CommentInput";
import { twMerge as tw } from "tailwind-merge";
import { aiHunsuDetail } from "../../api/ai";
import ProfileStatus from "../profile/ProfileStatus";
import { MyComment, MyArticle } from "../../config/types";
import { articleDetail } from "../../api/article";
import { commentSelect } from "../../api/comment";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { ModalPortalModal } from "../../config/ModalPortalModal";
import ModalDelete from "./ModalDelete";
import { useNavigate } from "react-router-dom";
import hljs from "highlight.js";
import { RiAlarmWarningFill } from "react-icons/ri";
import ModalReport from "./ModalReport";
import CommentDetail from "../comment/CommentDetail";
import useScrollLock from "../../hooks/useScrollLock";

const ModalDetail = ({ onClose, isOpen, parent, articleId, onSelect }: DetailModalProps) => {
    const { user } = useUserStore();
    const [modalDeleteStatus, setModalDeleteStatus] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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
    const nav = useNavigate();
    useScrollLock(isOpen, parent);

    const alertHandler = (text: string) => {
        setIsAlert(true);
        setAlertText(text);
    };

    const formattedDate = dayjs(articleData && articleData.created_at).format("YYYY년 MM월 DD일 HH:mm");

    const handleModalDeleteClose = () => {
        setModalDeleteStatus(false);
    };

    const handleReportClick = () => {
        if (user.user_id === 0) {
            alertHandler("로그인 후 이용 가능합니다.");
            return;
        }
        setIsReportModalOpen(true);
    };

    const closeReportModal = () => setIsReportModalOpen(false);

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
                console.warn("데이터 불러오기 실패", error);
                nav("/");
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
            const response = await commentSelect(comment_id);
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

    const handleReArticle = (id: string) => {
        onClose();
        if (onSelect) {
            onSelect(id);
        }
    };

    const handleModalExit = () => {
        onClose();
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
                    className="outline-none w-full h-full md:w-[870px] md:max-h-[95vh] md:rounded-md bg-white relative py-10 px-5 md:px-14 overflow-auto"
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
                                {articleData && user.user_id === articleData.user.user_id && (
                                    <div className="text-sm text-gray-400 flex gap-1">
                                        {!articleData.is_closed && (
                                            <>
                                                <span
                                                    onClick={() => handleReArticle(String(articleData.article_id))}
                                                    className="cursor-pointer duration-150 hover:text-literal-normal"
                                                >
                                                    수정
                                                </span>
                                                /
                                                <span
                                                    onClick={() => setModalDeleteStatus(true)}
                                                    className="cursor-pointer duration-150 hover:text-literal-normal"
                                                >
                                                    삭제
                                                </span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="text-sm flex pb-3 flex-wrap justify-between gap-1">
                                <div className="flex gap-3">
                                    <p className="font-semibold">{articleData && articleData.user.nickname}</p>
                                    <p className="text-gray-500 font-normal">{formattedDate}</p>
                                </div>
                                {articleData && user.user_id !== articleData.user.user_id && (
                                    <div className="flex items-center gap-1 cursor-pointer duration-200 rounded-md px-1">
                                        <RiAlarmWarningFill className="text-literal-highlight size-3 sm:size-4" />
                                        <p
                                            className="text-literal-highlight font-medium text-xs sm:text-sm sm:font-medium"
                                            onClick={handleReportClick}
                                        >
                                            신고하기
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="text-xl my-2">{articleData && articleData.title}</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizer((articleData && articleData.content) as string),
                                }}
                                className="pt-3 text-[16px] pb-20 mb-3 border-b border-gray-100 tiptap prose ProseMirror"
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
                                        <div className="relative sm:w-[90%] w-full h-full rounded-[15px] flex flex-col justify-between mb-1">
                                            {articleData?.user && (
                                                <ProfileStatus
                                                    nickname={comment.user_nickname}
                                                    user_id={comment.user}
                                                    hunsoo_level={comment.user_hunsoo_level}
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
                                            is_closed={articleData?.is_closed}
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
                                                is_closed={articleData?.is_closed}
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
            <ModalPortalModal>
                {modalDeleteStatus && (
                    <ModalDelete
                        isOpen={modalDeleteStatus}
                        onClose={handleModalDeleteClose}
                        parentOnClose={onClose}
                        id={articleId}
                    />
                )}
                {isReportModalOpen && (
                    <ModalReport
                        isOpen={isReportModalOpen}
                        onClose={closeReportModal}
                        article_id={articleData?.article_id as number}
                    />
                )}
            </ModalPortalModal>
        </>
    );
};

export default ModalDetail;
