import { useState } from "react";
import { RiEmotionUnhappyFill, RiEmotionHappyFill, RiAlarmWarningFill } from "react-icons/ri";
import { twMerge as tw } from "tailwind-merge";
import ModalReport from "../modal/ModalReport";
import ModalPicture from "../modal/ModalPicture";
import { ModalPortal } from "../../config/ModalPortal";
import { MyComment } from "../../config/types";

interface CommentProps {
    onClick?: () => void;
    className?: string;
    color?: "default" | "writer" | "ai";
    parent: string;
    comment?: MyComment;
}

const Comment = ({ className, color = "default", parent, comment }: CommentProps) => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
    console.log(comment);

    const handleReportClick = () => {
        setIsReportModalOpen(true);
    };

    const closeReportModal = () => {
        setIsReportModalOpen(false);
    };

    const handlePictureClick = () => {
        setIsPictureModalOpen(true);
    };

    const closePictureModal = () => {
        setIsPictureModalOpen(false);
    };

    const formatDate = (apiDate: string | undefined | null) => {
        if (!apiDate) return;
        const date = new Date(apiDate);

        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${month}-${day} ${hours}:${minutes}`;
    };
    return (
        <div
            className={tw(
                "relative w-[90%]  h-full rounded-[15px] p-4 flex flex-col justify-between mb-3 ",
                color === "default" && "bg-gray-100",
                color === "writer" && "bg-primary-second",
                color === "ai" && "bg-literal-info text-white",
                className
            )}
        >
            <div className="absolute top-2 right-4 text-literal-highlight">{formatDate(comment?.created_at)}</div>
            <div
                className={tw(
                    "absolute top-8 right-8 text-literal-highlight",
                    color === "default" && "hidden",
                    color === "writer" && "hidden"
                )}
            >
                AI
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    {comment?.images && comment.images.length > 0 && (
                        <img
                            className="w-[45px] h-[40px] cursor-pointer"
                            src="https://images.unsplash.com/photo-1723894960978-3f1e1cead774?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            onClick={handlePictureClick}
                        ></img>
                    )}
                </div>
                <div className="my-3 text-base px-1">{comment?.content}</div>
                <div
                    className={tw(
                        "flex items-center w-[80px] cursor-pointer text-literal-highlight",
                        color === "ai" && "hidden",
                        color === "default" && "hidden"
                    )}
                    onClick={handleReportClick}
                ></div>
                <div className="flex-wrap justify-between sm:flex">
                    <div className="flex items-center gap-1 mt-auto cursor-pointer duration-200 rounded-md px-1">
                        <RiAlarmWarningFill className="text-literal-highlight" />
                        <p className="text-literal-highlight font-medium text-sm" onClick={handleReportClick}>
                            신고하기
                        </p>
                    </div>
                    <div
                        className={tw(
                            "flex items-center bottom-4 right-4",
                            color === "ai" && "hidden",
                            color === "writer" && "hidden"
                        )}
                    >
                        <div className="flex mr-3 items-center space-x-2 mt-auto">
                            <RiEmotionUnhappyFill className="text-primary-second-dark" />
                            <span className="text-sm">999,999</span>
                            <RiEmotionHappyFill className="text-primary-second-dark" />
                            <span className="text-sm">999,999</span>
                        </div>
                        <button className="w-[80px] h-[30px] bg-literal-highlight text-white rounded-[5px]">
                            채택하기
                        </button>
                    </div>
                </div>
            </div>

            <ModalPortal>
                {isReportModalOpen && (
                    <ModalReport isOpen={isReportModalOpen} parent={parent} onClose={closeReportModal} />
                )}
                {isPictureModalOpen && (
                    <ModalPicture isOpen={isPictureModalOpen} parent={parent} onClose={closePictureModal} />
                )}
            </ModalPortal>
        </div>
    );
};

export default Comment;
