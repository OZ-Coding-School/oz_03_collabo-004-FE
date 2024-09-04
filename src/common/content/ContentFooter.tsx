import { FaMessage } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa";
import { PiCursorClickFill } from "react-icons/pi";
import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import { motion } from "framer-motion";
import { axiosInstance } from "../../api/axios";

interface ContentFooterProps {
    articleId: number;
    like_count: number;
    view_count: number;
    commentsCount: number;
}

const ContentFooter = ({ articleId, like_count, view_count, commentsCount }: ContentFooterProps) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [currentLikeCount, setCurrentLikeCount] = useState<number>(like_count);
    const [currentViewCount, setCurrentViewCount] = useState<number>(view_count);

    const handleMouseEnter = (i: number) => {
        setHoverIndex(i);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const handleAddView = async () => {
        try {
            const response = await axiosInstance.get(`/article/${articleId}/view/`, { withCredentials: true });

            if (response.status === 200) {
                setCurrentViewCount(currentViewCount + 1);
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to add view:", error);
        }
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
        { icon: FaMessage, text: "댓글", count: commentsCount },
        { icon: FaSmile, text: "좋아요", count: currentLikeCount, onClick: handleAddLike },
        { icon: PiCursorClickFill, text: "조회수", count: currentViewCount, onClick: handleAddView },
    ];

    return (
        <div className="w-[626px] h-[50px] bg-white rounded-b-2xl py-2 px-14">
            <div className="flex items-center justify-between h-full font-default">
                {data.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className="relative flex items-center gap-2 cursor-pointer"
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
                            <p className="text-sm min-w-[80px] text-left">{item.count}</p>
                            {hoverIndex === index && (
                                <motion.div
                                    animate={{ opacity: [0, 1], translateY: [10, 0] }}
                                    className="absolute px-2 mt-1 text-xs font-normal rounded bg-slate-200 text-literal-normal top-full left-6"
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
