import { FaMessage } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa";
import { PiCursorClickFill } from "react-icons/pi";
import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import { motion } from "framer-motion";
import { ContentAddView, ContentAddLike } from "../../api/article";

const ContentFooter = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [likeCount, setLikeCount] = useState<number>(99);
    const [viewCount, setViewCount] = useState<number>(999999999);

    const handleMouseEnter = (i: number) => {
        setHoverIndex(i);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const handleAddView = async () => {
        try {
            await ContentAddView();
            setViewCount(viewCount + 1);
        } catch (error) {
            console.error("Failed to add view:", error);
        }
    };

    const handleAddLike = async () => {
        try {
            await ContentAddLike();
            setLikeCount(likeCount + 1);
        } catch (error) {
            console.error("Failed to add like:", error);
        }
    };

    const data = [
        { icon: FaMessage, text: "댓글", count: "999,999" },
        { icon: FaSmile, text: "좋아요", count: likeCount, onClick: handleAddLike },
        { icon: PiCursorClickFill, text: "조회수", count: viewCount, onClick: handleAddView },
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
