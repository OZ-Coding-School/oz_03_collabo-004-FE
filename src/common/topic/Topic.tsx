import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { TOPIC_TAGS } from "../../config/const";
import { motion, Variants } from "framer-motion";

const dropdownVariants: Variants = {
    open: {
        height: "auto",
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3,
        },
    },
    closed: {
        height: 0,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3,
        },
    },
};

const Topic = () => {
    const [isDailyOpen, setIsDailyOpen] = useState(true);
    const [isGameOpen, setIsGameOpen] = useState(true);
    const [isEduOpen, setIsEduOpen] = useState(true);

    return (
        <div className="w-[190px] bg-white h-auto p-2 rounded-md font-default ">
            <p className="font-medium text-lg text-primary-second-dark px-1 py-2">카테고리</p>
            <div className="w-full mb-2">
                <button
                    onClick={() => setIsDailyOpen(!isDailyOpen)}
                    className={tw(
                        "w-full bg-transparent mb-1 p-2 rounded-md flex items-center justify-between text-gray-700",
                        isDailyOpen && "bg-gray-100"
                    )}
                >
                    일상 {isDailyOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>
                <motion.ul
                    initial={false}
                    animate={isDailyOpen ? "open" : "closed"}
                    variants={dropdownVariants}
                    className="overflow-hidden text-sm pl-2 space-y-2 text-literal-normal"
                >
                    {TOPIC_TAGS.slice(0, 6).map((i) => (
                        <li className="flex items-center gap-2 duration-150 hover:text-primary-second-dark cursor-pointer">
                            {i.icon} {i.text}
                        </li>
                    ))}
                </motion.ul>
            </div>
            <div className="w-full mb-2">
                <button
                    onClick={() => setIsGameOpen(!isGameOpen)}
                    className={tw(
                        "w-full bg-transparent mb-1 p-2 rounded-md flex items-center justify-between text-gray-700",
                        isGameOpen && "bg-gray-100"
                    )}
                >
                    게임 {isGameOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>
                <motion.ul
                    initial={false}
                    animate={isGameOpen ? "open" : "closed"}
                    variants={dropdownVariants}
                    className="overflow-hidden text-sm pl-2 space-y-2 text-literal-normal"
                >
                    {TOPIC_TAGS.slice(6, 8).map((i) => (
                        <li className="flex items-center gap-2 duration-150 hover:text-primary-second-dark cursor-pointer">
                            {i.icon} {i.text}
                        </li>
                    ))}
                </motion.ul>
            </div>
            <div className="w-full mb-2">
                <button
                    onClick={() => setIsEduOpen(!isEduOpen)}
                    className={tw(
                        "w-full bg-transparent mb-1 p-2 rounded-md flex items-center justify-between text-gray-700",
                        isEduOpen && "bg-gray-100"
                    )}
                >
                    교육 {isEduOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>{" "}
                <motion.ul
                    initial={false}
                    animate={isEduOpen ? "open" : "closed"}
                    variants={dropdownVariants}
                    className="overflow-hidden text-sm pl-2 space-y-2 text-literal-normal"
                >
                    {TOPIC_TAGS.slice(8, 9).map((i) => (
                        <li className="flex items-center gap-2 duration-150 hover:text-primary-second-dark cursor-pointer">
                            {i.icon} {i.text}
                        </li>
                    ))}
                </motion.ul>
            </div>
        </div>
    );
};

export default Topic;
