import { FaMessage } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa";
import { PiCursorClickFill } from "react-icons/pi";
import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import { motion } from "framer-motion";

const ContentFooter = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const handleMouseEnter = (i: number) => {
        setHoverIndex(i);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const data = [
        { icon: FaMessage, text: "댓글", count: "999,999" },
        { icon: FaSmile, text: "좋아요", count: "99" },
        { icon: PiCursorClickFill, text: "조회수", count: "999,999,999" },
    ];

    return (
        <div className="w-[626px] h-[50px] bg-white rounded-b-2xl py-2 px-14">
            <div className="flex justify-between items-center h-full font-default">
                {data.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            className="flex items-center gap-2 relative"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
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
                                    className="absolute bg-slate-200 text-literal-normal font-normal text-xs mt-1 rounded top-full left-6 px-2"
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
