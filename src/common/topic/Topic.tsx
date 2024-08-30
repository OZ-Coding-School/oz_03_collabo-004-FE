import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import { IoMdArrowDropup } from "react-icons/io";
import { DUMMY_TAGS } from "../../config/const";
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
        <div className="w-[226px] bg-white h-auto p-2 rounded-md font-default ">
            <p className="px-1 py-2 text-lg font-medium text-primary-second-dark">카테고리</p>
            <div className="w-full mb-2">
                <button
                    onClick={() => setIsDailyOpen(!isDailyOpen)}
                    className={tw(
                        "w-full bg-transparent mb-1 p-2 rounded-md flex items-center justify-between text-gray-700",
                        isDailyOpen && "bg-gray-100"
                    )}
                >
                    일상
                    <motion.div
                        animate={isDailyOpen ? "open" : "closed"}
                        variants={{
                            open: { rotate: 180 },
                            closed: { rotate: 0 },
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ originY: 0.55 }}
                    >
                        <IoMdArrowDropup />
                    </motion.div>
                </button>
                <motion.ul
                    initial={false}
                    animate={isDailyOpen ? "open" : "closed"}
                    variants={dropdownVariants}
                    className="pl-2 space-y-2 overflow-hidden text-sm text-literal-normal"
                >
                    {DUMMY_TAGS.slice(0, 6).map((i) => (
                        <li
                            key={i.id}
                            className="flex items-center gap-2 duration-100 hover:text-primary-second-dark cursor-pointer"
                        >
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
                    게임
                    <motion.div
                        animate={isGameOpen ? "open" : "closed"}
                        variants={{
                            open: { rotate: 180 },
                            closed: { rotate: 0 },
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ originY: 0.55 }}
                    >
                        <IoMdArrowDropup />
                    </motion.div>
                </button>
                <motion.ul
                    initial={false}
                    animate={isGameOpen ? "open" : "closed"}
                    variants={dropdownVariants}
                    className="pl-2 space-y-2 overflow-hidden text-sm text-literal-normal"
                >
                    {DUMMY_TAGS.slice(6, 9).map((i) => (
                        <li
                            key={i.id}
                            className="flex items-center gap-2 duration-100 hover:text-primary-second-dark cursor-pointer"
                        >
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
                    교육
                    <motion.div
                        animate={isEduOpen ? "open" : "closed"}
                        variants={{
                            open: { rotate: 180 },
                            closed: { rotate: 0 },
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ originY: 0.55 }}
                    >
                        <IoMdArrowDropup />
                    </motion.div>
                </button>
                <motion.ul
                    initial={false}
                    animate={isEduOpen ? "open" : "closed"}
                    variants={dropdownVariants}
                    className="pl-2 space-y-2 overflow-hidden text-sm text-literal-normal"
                >
                    {DUMMY_TAGS.slice(9, 10).map((i) => (
                        <li
                            key={i.id}
                            className="flex items-center gap-2 duration-100 hover:text-primary-second-dark cursor-pointer"
                        >
                            {i.icon} {i.text}
                        </li>
                    ))}
                </motion.ul>
            </div>
        </div>
    );
};

export default Topic;
