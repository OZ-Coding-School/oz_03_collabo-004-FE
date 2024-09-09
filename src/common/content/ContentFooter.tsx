import { FaMessage } from "react-icons/fa6";
import { PiCursorClickFill } from "react-icons/pi";
import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import { motion } from "framer-motion";
import { axiosInstance } from "../../api/axios";
import { FaHeart } from "react-icons/fa";
interface ContentFooterProps {
    articleId: number;
    like_count: number;
    view_count: number;
    commentsCount: number;
    commentsCountClick: (num: number) => void;
}

const ContentFooter = ({
    articleId,
    like_count,
    view_count,
    commentsCount,
    commentsCountClick,
}: ContentFooterProps) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [currentLikeCount, setCurrentLikeCount] = useState<number>(like_count);
    const [currentViewCount] = useState<number>(view_count);

    const handleMouseEnter = (i: number) => {
        setHoverIndex(i);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const handleAddLike = async () => {
        try {
            const response = await axiosInstance.post(`/article/${articleId}/like/`, {}, { withCredentials: true });

            if (response.status === 200) {
                const { like_count, message } = response.data;

                if (message === "Like added") {
                    setCurrentLikeCount(like_count);
                } else if (message === "Like removed") {
                    setCurrentLikeCount(like_count);
                }
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to toggle like:", error);
        }
    };

    const data = [
        { icon: FaMessage, text: "댓글", count: commentsCount, onClick: () => commentsCountClick(articleId) },
        { icon: FaHeart, text: "좋아요", count: currentLikeCount, onClick: handleAddLike },
        { icon: PiCursorClickFill, text: "조회수", count: currentViewCount },
    ];

    return (
        <div className="min-w-full md:w-[626px] h-[50px] bg-white rounded-b-2xl py-2 px-14 dark:bg-gray-800">
            <div className="flex items-center justify-between h-full font-default">
                {data.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className="relative flex items-center gap-2 cursor-pointer "
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={item.onClick}
                        >
                            <Icon
                                className={tw(
                                    "transition-colors duration-200",
                                    hoverIndex === index ? "text-primary-second-dark" : "text-primary-second"
                                )}
                            />
                            <p className="text-sm min-w-[80px] text-left dark:text-white">{item.count}</p>
                            {hoverIndex === index && (
                                <motion.div
                                    animate={{ opacity: [0, 1], translateY: [10, 0] }}
                                    className="absolute px-2 mt-1 text-xs font-normal rounded text-literal-normal -bottom-5 bg-slate-200"
                                >
                                    {item.text}
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ContentFooter;
