import { useState, useEffect } from "react";
import { RiAlarmWarningFill } from "react-icons/ri";
import { ImNeutral2, ImHappy2 } from "react-icons/im";
import { twMerge as tw } from "tailwind-merge";
import ModalReport from "../modal/ModalReport";
import ModalPicture from "../modal/ModalPicture";
import { ModalPortal } from "../../config/ModalPortal";
import { AiHunsu, MyComment } from "../../config/types";
import { commentFeedback } from "../../api/comment";
import { useUserStore } from "../../config/store";
import dayjs from "dayjs";

interface CommentProps {
    onClick?: () => void;
    onSelect?: (comment_id: number) => void;
    className?: string;
    color?: "default" | "writer" | "ai";
    comment: MyComment;
    ai?: AiHunsu;
    article_user_id?: number;
    toast: (text: string) => void;
}
const CommentDetail = ({
    className,
    color = "default",
    comment,
    ai,
    article_user_id,
    onSelect,
    toast,
}: CommentProps) => {
    const { user } = useUserStore();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
    const [userReaction, setUserReaction] = useState(comment.reaction || "none");
    const [imageUrl, setImageUrl] = useState("");
    const [helpful, setHelpful] = useState(0);
    const [notHelpful, setNotHelpful] = useState(0);
    const content = color === "ai" ? ai?.content : comment?.content;

    useEffect(() => {
        setHelpful(comment.helpful_count);
        setNotHelpful(comment.not_helpful_count);
    }, [comment.helpful_count, comment.not_helpful_count]);

    const handleReportClick = () => {
        if (user.user_id === 0) {
            toast("로그인 후 이용 가능합니다.");
            return;
        }
        setIsReportModalOpen(true);
    };

    const closeReportModal = () => setIsReportModalOpen(false);
    const handlePictureClick = (imgUrl: string) => {
        setIsPictureModalOpen(true);
        setImageUrl(imgUrl);
    };
    const closePictureModal = () => setIsPictureModalOpen(false);

    const formatDate = (apiDate?: string) => {
        if (!apiDate) return;
        return dayjs(apiDate).format("MM-DD HH:mm");
    };

    const formatContentWithLineBreaks = (content: string) => {
        return content.replace(/(?:\r\n|\r|\n)/g, "<br/>");
    };

    const handleSelect = () => {
        if (onSelect) {
            onSelect(comment.id);
        }
    };

    const handleReact = async (comment_id: number, type: "helpful" | "not_helpful") => {
        if (user.user_id === 0) {
            toast("로그인 후 이용가능합니다.");
            return;
        }
        if (user.user_id === comment.user) {
            toast("자신의 댓글은 반응할 수 없습니다.");
            return;
        }
        if (type === "helpful") {
            if (userReaction === "helpful") {
                setHelpful(helpful - 1);
                setUserReaction("none");
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
                setUserReaction("none");
            } else {
                if (userReaction === "helpful") {
                    setHelpful(helpful - 1);
                }
                setNotHelpful(notHelpful + 1);
                setUserReaction("not_helpful");
            }
        }
        try {
            const response = await commentFeedback(comment_id, type);
            console.log(response.data.detail);
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
                "relative h-full rounded-2xl p-4 flex flex-col justify-between mb-4 shadow-inner text-literal-normal",
                color === "default" && "bg-gray-100 sm:w-[90%] w-full",
                color === "writer" && "bg-primary-second bg-opacity-60 sm:w-[90%] w-full",
                color === "ai" && "bg-slate-800 text-white w-full mt-3",
                className
            )}
        >
            <div className="flex justify-between items-center ml-1">
                <div
                    className={tw(
                        " text-literal-highlight text-base sm:text-lg font-medium",
                        color === "default" && "hidden",
                        color === "writer" && "hidden"
                    )}
                >
                    훈수봇
                </div>
                <div
                    className={tw(
                        "text-xs sm:text-sm sm:font-normal font-normal self-start",
                        color !== "ai" && "text-literal-info absolute top-4 right-5"
                    )}
                >
                    {color === "ai" ? formatDate(ai?.updated_at) : formatDate(comment?.created_at)}
                </div>
            </div>
            <div className={tw("flex flex-col gap-0", color === "default" && "gap-2")}>
                {color !== "ai" && comment.images.length > 0 && (
                    <div className="flex gap-2 mb-3">
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
                    className={tw(
                        "ml-1 custom-code-block sm:text-base text-sm font-normal",
                        color === "ai" && "mt-4",
                        color !== "ai" && "mr-24"
                    )}
                    dangerouslySetInnerHTML={{ __html: formatContentWithLineBreaks(content || "") }}
                />
                <div className={tw("flex-wrap justify-between flex", color === "writer" && "justify-end")}>
                    {color === "default" && (
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

                    <div className={tw("flex bottom-4 right-4 gap-5", color === "ai" && "hidden")}>
                        <div className="flex gap-3 items-center mt-auto">
                            <div className="flex gap-1">
                                <ImHappy2
                                    onClick={() => user.user_id !== comment.user && handleReact(comment.id, "helpful")}
                                    className={tw(
                                        "text-primary-second my-auto size-4 sm:size-5 cursor-pointer duration-150 hover:scale-110",
                                        userReaction === "helpful" && "text-[#FF8800]",
                                        user.user_id === comment.user && "hover:scale-100 cursor-default"
                                    )}
                                />
                                <span className="text-sm font-normal">{helpful ?? 0}</span>
                            </div>
                            <div className="flex gap-1">
                                <ImNeutral2
                                    onClick={() =>
                                        user.user_id !== comment.user && handleReact(comment.id, "not_helpful")
                                    }
                                    className={tw(
                                        "text-red-300 my-auto size-4 sm:size-5  cursor-pointer duration-150 hover:scale-110",
                                        userReaction === "not_helpful" && "text-red-500",
                                        user.user_id === comment.user && "hover:scale-100 cursor-default"
                                    )}
                                />
                                <span className="text-sm font-normal">{notHelpful ?? 0}</span>
                            </div>
                        </div>
                        {comment.is_selected ? (
                            <p className="font-medium text-literal-highlight text-base sm:text-lg">채택됨</p>
                        ) : (
                            user.user_id === article_user_id && (
                                <button
                                    onClick={handleSelect}
                                    className="sm:w-[80px] w-[70px] sm:h-[30px] h-6 text-sm sm:text-base bg-literal-highlight text-white rounded-[5px] duration-200 hover:bg-[#a62642]"
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
                    <ModalReport isOpen={isReportModalOpen} onClose={closeReportModal} comment_id={comment.id} />
                )}
                {isPictureModalOpen && (
                    <ModalPicture isOpen={isPictureModalOpen} onClose={closePictureModal} imageUrl={imageUrl} />
                )}
            </ModalPortal>
        </div>
    );
};

export default CommentDetail;
