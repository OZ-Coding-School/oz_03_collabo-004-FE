import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiHunsu, DetailModalProps } from "../../config/types";
import Badge from "../badge/Badge";
import Comment from "../comment/Comment";
import { useUserStore } from "../../config/store";
import CommentInput from "../comment/CommentInput";
import { twMerge as tw } from "tailwind-merge";
import { aiHunsuDetail } from "../../api/ai";
import ProfileStatus from "../profile/ProfileStatus";
import { MyComment, MyArticle } from "../../config/types";
import { articleDetail } from "../../api/article";
import dayjs from "dayjs";

const ModalDetail = ({ onClose, isOpen, parent, articleId }: DetailModalProps) => {
    const { user } = useUserStore();
    const [comments, setComments] = useState<MyComment[]>([]);
    const [articleData, setArticleData] = useState<MyArticle>();
    const [aiData, setAiData] = useState<AiHunsu>();
    const [hideInput, setHideInput] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const formattedDate = dayjs(articleData?.created_at).format("YYYY년 MM월 DD일");

    useEffect(() => {
        const parentElement = document.querySelector("." + parent);
        const headerElement = document.querySelector(".header");

        if (isOpen) {
            document.body.style.overflowY = "hidden";
            parentElement?.classList.add("blur-[2px]");
            headerElement?.classList.add("blur-[2px]");
        }

        return () => {
            document.body.style.overflowY = "scroll";
            parentElement?.classList.remove("blur-[2px]");
            headerElement?.classList.remove("blur-[2px]");
        };
    }, [isOpen, parent]);

    // useEffect(() => {
    //     const getArticleDetail = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await articleDetail(articleId);
    //             console.log(response.data);
    //             setArticleData(response.data);
    //             setComments(response.data.comments || []);
    //         } catch (error) {
    //             console.log("게시글 불러오기 실패", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     getArticleDetail();
    // }, [articleId]);

    // useEffect(() => {
    //     const getAiHunsuDetail = async () => {
    //         try {
    //             const response = await aiHunsuDetail(articleData?.article_id);
    //             console.log(response.data);
    //             if (response.status) setAiData(response.data);
    //         } catch (error) {
    //             //! 에러메세지로 보내는 거 말고 다른 방법..
    //             console.error("ai 훈수 가져오기 실패", error);
    //         }
    //     };
    //     if (articleData?.article_id) getAiHunsuDetail();
    // }, [articleData?.article_id]);

    useEffect(() => {
        const getDetails = async () => {
            setIsLoading(true);
            try {
                const articleResponse = await articleDetail(articleId);
                console.log(articleResponse.data);
                setArticleData(articleResponse.data);
                setComments(articleResponse.data.comments || []);

                // AI 바로 가져옴
                const aiResponse = await aiHunsuDetail(articleId);
                console.log(aiResponse.data);
                if (aiResponse.status) setAiData(aiResponse.data);
            } catch (error) {
                console.log("데이터 불러오기 실패", error);
            } finally {
                setIsLoading(false);
            }
        };
        getDetails();
    }, [articleId]);

    const handleCommentSubmit = (newComment: MyComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    useEffect(() => {
        const result = comments.some((comment) => comment.user === user.user_id);
        setHideInput(result);
    }, [comments, user.user_id]);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed flex justify-center items-center inset-0 bg-black w-full h-full"
            ></motion.nav>

            <div
                onClick={onClose}
                className="text-literal-normal inset-0 font-default fixed flex items-center justify-center md:px-3 z-[40] md:z-auto"
            >
                <motion.nav
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full h-full md:w-[870px] md:max-h-[90vh] md:rounded-3xl md:mt-10 bg-white relative py-10 px-5 md:px-14 overflow-auto"
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full"></div>
                    ) : (
                        <div className="flex flex-col gap-2 min-w-[300px]">
                            <div className="flex justify-between">
                                <div className="flex gap-2">
                                    {articleData?.tags.map((tag) => (
                                        <Badge key={tag.tag_id} color="yellow">
                                            {tag.name.slice(0, -2)}
                                        </Badge>
                                    ))}
                                </div>
                                {user.user_id === articleData?.user.user_id && (
                                    <div className="text-sm text-gray-400 flex gap-1">
                                        {!articleData.is_closed && (
                                            <>
                                                <span className="cursor-pointer duration-150 hover:text-literal-normal">
                                                    수정
                                                </span>
                                                <span>/</span>
                                            </>
                                        )}
                                        <span className="cursor-pointer duration-150 hover:text-literal-normal">
                                            삭제
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="text-sm flex gap-5 pb-3">
                                <p className="font-semibold">{articleData?.user.nickname}</p>
                                <p className="text-gray-500">{formattedDate}</p>
                            </div>
                            <div className="text-xl my-2">{articleData?.title}</div>
                            <div className="pt-3 pb-20 mb-3 border-b border-b-gray-100">{articleData?.content}</div>
                            {user.user_id !== articleData?.user.user_id && !hideInput && !articleData?.is_closed && (
                                <div className="my-5">
                                    <CommentInput
                                        onClose={onClose}
                                        articleId={articleData?.article_id}
                                        onCommentSubmit={handleCommentSubmit}
                                    />
                                </div>
                            )}
                            {comments.length !== 0
                                ? comments.map((comment, index) => (
                                      <div
                                          key={`${comment.id}-${index}`}
                                          className={tw("flex flex-col", comment.user === user.user_id && "items-end")}
                                      >
                                          <div className="relative w-[90%] h-full rounded-[15px] flex flex-col justify-between mb-1">
                                              <ProfileStatus userName={comment.user_nickname} userId={comment.user} />
                                          </div>
                                          <Comment
                                              key={`comment-${comment.id}-${index}`}
                                              color={comment.user === user.user_id ? "writer" : "default"}
                                              parent="comment-parent"
                                              comment={comment}
                                              article_user_id={articleData?.user.user_id}
                                              onCommentSubmit={handleCommentSubmit}
                                          />
                                          {/* ai 있을때 */}
                                          {comment.is_selected && aiData && (
                                              <Comment
                                                  key={`ai-${comment.id}-${index}`}
                                                  color="ai"
                                                  parent="comment-parent"
                                                  comment={comment}
                                                  ai={aiData}
                                                  article_user_id={articleData?.user.user_id}
                                                  onCommentSubmit={handleCommentSubmit}
                                              />
                                          )}
                                      </div>
                                  ))
                                : null}
                        </div>
                    )}
                    <IoClose
                        onClick={onClose}
                        title="닫기"
                        className="absolute text-gray-400 hover:text-gray-800 transition cursor-pointer w-[28px] h-[28px] top-2 right-2"
                    />
                </motion.nav>
            </div>
        </>
    );
};

export default ModalDetail;
