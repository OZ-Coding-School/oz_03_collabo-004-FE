import { useState, useEffect } from "react";
import { RiEmotionUnhappyFill, RiEmotionHappyFill, RiAlarmWarningFill } from "react-icons/ri";
import { twMerge as tw } from "tailwind-merge";
import ModalReport from "../modal/ModalReport";
import ModalPicture from "../modal/ModalPicture";
import { ModalPortal } from "../../config/ModalPortal";
import { AiHunsu, MyComment } from "../../config/types";
import { commenFeedback, commentSelect } from "../../api/comment";
import { useUserStore } from "../../config/store";
import dayjs from "dayjs";

interface CommentProps {
    onClick?: () => void;
    className?: string;
    color?: "default" | "writer" | "ai";
    parent: string;
    comment: MyComment;
    ai?: AiHunsu;
    article_user_id?: number;
    onCommentSubmit: (newComments: MyComment) => void;
}
const CommentDetail = ({
    className,
    color = "default",
    parent,
    comment,
    ai,
    article_user_id,
    onCommentSubmit,
}: CommentProps) => {
    const { user } = useUserStore();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
    const [userReaction, setUserReaction] = useState<"helpful" | "not_helpful" | null>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [helpful, setHelpful] = useState(0);
    const [notHelpful, setNotHelpful] = useState(0);
    console.log(user);

    const content = color === "ai" ? ai?.content : comment?.content;

    useEffect(() => {
        setHelpful(comment.helpful_count);
        setNotHelpful(comment.not_helpful_count);
    }, [comment.helpful_count, comment.not_helpful_count]);

    const handleReportClick = () => setIsReportModalOpen(true);
    const closeReportModal = () => setIsReportModalOpen(false);

    const handlePictureClick = (imgUrl: string) => {
        setIsPictureModalOpen(true);
        setImageUrl(imgUrl);
    };
    const closePictureModal = () => setIsPictureModalOpen(false);

    const formatDate = (apiDate?: string) => {
        if (!apiDate) return;
        const formatDate = dayjs(comment.created_at).format("MM-DD HH:mm");
        return formatDate;
    };

    const formatContentWithLineBreaks = (content: string) => {
        return content.replace(/(?:\r\n|\r|\n)/g, "<br/>");
    };

    const handleSelect = async (comment_id: number) => {
        console.log(comment_id);
        try {
            const response = await commentSelect(comment_id);
            console.log(response.data);
            const newComment: MyComment = response.data;
            onCommentSubmit(newComment);
        } catch (error) {
            console.error("채택 실패", error);
        }
    };

    const handleReact = async (comment_id: number, type: "helpful" | "not_helpful") => {
        if (type === "helpful") {
            if (userReaction === "helpful") {
                setHelpful(helpful - 1);
                setUserReaction(null);
            } else {
                if (userReaction === "not_helpful") {
                    setNotHelpful(notHelpful - 1);
                }
                setHelpful(helpful + 1);
                setUserReaction("helpful");
            }
        } else if (type === "not_helpful") {
            if (userReaction === "not_helpful") {
                setNotHelpful(notHelpful - 1);
                setUserReaction(null);
            } else {
                if (userReaction === "helpful") {
                    setHelpful(helpful - 1);
                }
                setNotHelpful(notHelpful + 1);
                setUserReaction("not_helpful");
            }
        }
        try {
            const response = await commenFeedback(comment_id, type);
            console.log(response.data.detail);
            // switch (response.data.detail) {
            //     case "helpful reaction added.":
            //         setHelpful(helpful + 1);
            //         break;
            //     case "helpful reaction removed.":
            //         setHelpful(helpful - 1);
            //         break;
            //     case "not_helpful reaction added.":
            //         setNotHelpful(notHelpful + 1);
            //         break;
            //     case "not_helpful reaction removed.":
            //         setNotHelpful(notHelpful - 1);
            //         break;
            //     case "Reaction changed to not_helpful.":
            //         setNotHelpful(notHelpful + 1);
            //         setHelpful(helpful - 1);
            //         break;
            //     case "Reaction changed to helpful.":
            //         setNotHelpful(notHelpful - 1);
            //         setHelpful(helpful + 1);
            // }
        } catch (error) {
            console.error("피드백 실패", error);
            if (type === "helpful") {
                setHelpful(userReaction === "helpful" ? helpful + 1 : helpful - 1);
            } else {
                setNotHelpful(userReaction === "not_helpful" ? notHelpful + 1 : notHelpful - 1);
            }
            setUserReaction(type === "helpful" ? "not_helpful" : "helpful");
        }
    };

    return (
        <div
            className={tw(
                "relative w-[90%] h-full rounded-[15px] p-4 flex flex-col justify-between mb-4 shadow-inner text-literal-normal",
                color === "default" && "bg-gray-100 ",
                color === "writer" && "bg-primary-second bg-opacity-60",
                color === "ai" && "bg-slate-800 text-white w-full",
                className
            )}
        >
            <div className={tw("absolute top-3 right-5 text-sm font-normal", color !== "ai" && "text-literal-info")}>
                {color === "ai" ? formatDate(ai?.created_at) : formatDate(comment?.created_at)}
            </div>

            <div
                className={tw(
                    "absolute top-10 right-5 text-literal-highlight text-lg",
                    color === "default" && "hidden",
                    color === "writer" && "hidden"
                )}
            >
                AI
            </div>
            <div className={tw("flex flex-col gap-3", color === "writer" && "gap-0")}>
                {comment.images.length > 0 && (
                    <div className="flex gap-2 mb-1">
                        {comment.images.map((img) => (
                            <img
                                key={img.id}
                                className="w-[45px] h-[40px] cursor-pointer rounded"
                                src={img.image}
                                alt="Comment Image"
                                onClick={() => handlePictureClick(img.image)}
                            />
                        ))}
                    </div>
                )}
                <div
                    className="ml-1 mr-28"
                    dangerouslySetInnerHTML={{ __html: formatContentWithLineBreaks(content || "") }}
                />

                <div
                    className={tw(
                        "flex items-center w-[80px] cursor-pointer text-literal-highlight",
                        color === "ai" && "hidden",
                        color === "default" && "hidden"
                    )}
                    onClick={handleReportClick}
                ></div>
                <div className="flex-wrap justify-between sm:flex">
                    {color === "default" && (
                        <div className="flex items-center gap-1 mt-auto cursor-pointer duration-200 rounded-md px-1">
                            <RiAlarmWarningFill className="text-literal-highlight" />
                            <p className="text-literal-highlight font-medium text-sm" onClick={handleReportClick}>
                                신고하기
                            </p>
                        </div>
                    )}

                    <div
                        className={tw(
                            "flex items-center bottom-4 right-4 gap-3",
                            color === "ai" && "hidden",
                            color === "writer" && "hidden"
                        )}
                    >
                        <div className="flex gap-3 items-center mt-auto">
                            <div className="flex gap-1">
                                <RiEmotionHappyFill
                                    onClick={() => handleReact(comment.id, "helpful")}
                                    className="text-primary-second-dark my-auto size-5 cursor-pointer duration-150 hover:scale-110 hover:text-[#ff5f1a]"
                                />
                                <span className="text-sm">{helpful}</span>
                            </div>
                            <div className="flex gap-1">
                                <RiEmotionUnhappyFill
                                    onClick={() => handleReact(comment.id, "not_helpful")}
                                    className="text-primary-second-dark my-auto size-5 cursor-pointer duration-150 hover:scale-110 hover:text-[#ff5f1a]"
                                />
                                <span className="text-sm">{notHelpful}</span>
                            </div>
                        </div>
                        {comment.is_selected ? (
                            <p className="font-normal text-literal-highlight text-lg">채택됨</p>
                        ) : (
                            user.user_id === article_user_id && (
                                <button
                                    onClick={() => handleSelect(comment?.id)}
                                    className="w-[80px] h-[30px] bg-literal-highlight text-white rounded-[5px] duration-200 hover:bg-[#a62642]"
                                >
                                    채택하기
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
            <ModalPortal>
                {isReportModalOpen && (
                    <ModalReport isOpen={isReportModalOpen} parent={parent} onClose={closeReportModal} />
                )}
                {isPictureModalOpen && (
                    <ModalPicture
                        isOpen={isPictureModalOpen}
                        parent={parent}
                        onClose={closePictureModal}
                        imageUrl={imageUrl}
                    />
                )}
            </ModalPortal>
        </div>
    );
};

export default CommentDetail;
