import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { TOPIC_TAGS } from "../../config/const";

const Topic = () => {
    const [isDailyOpen, setIsDailyOpen] = useState(true);
    const [isGameOpen, setIsGameOpen] = useState(true);
    const [isEduOpen, setIsEduOpen] = useState(true);

    return (
        <div className="w-[190px] bg-white h-auto p-2 rounded-md font-default ">
            <p className="font-medium text-lg text-primary-second-dark px-1 py-2">카테고리</p>
            <div className="w-full mb-3">
                <button
                    onClick={() => setIsDailyOpen(!isDailyOpen)}
                    className={tw(
                        "w-full bg-transparent mb-1 p-2 rounded-md flex items-center justify-between text-gray-700",
                        isDailyOpen && "bg-gray-100"
                    )}
                >
                    일상 {isDailyOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>
                {isDailyOpen && (
                    <ul className="text-sm pl-2 space-y-2 text-literal-normal">
                        {TOPIC_TAGS.slice(0, 6).map((i) => (
                            <li className="flex items-center gap-2 hover:text-primary-second-dark cursor-pointer">
                                {i.icon} {i.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="w-full mb-3">
                <button
                    onClick={() => setIsGameOpen(!isGameOpen)}
                    className={tw(
                        "w-full bg-transparent mb-1 p-2 rounded-md flex items-center justify-between text-gray-700",
                        isGameOpen && "bg-gray-100"
                    )}
                >
                    게임 {isGameOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>
                {isGameOpen && (
                    <ul className="text-sm pl-2 space-y-2 text-literal-normal">
                        {TOPIC_TAGS.slice(6, 8).map((i) => (
                            <li className="flex items-center gap-2 hover:text-primary-second-dark cursor-pointer">
                                {i.icon} {i.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="w-full mb-3">
                <button
                    onClick={() => setIsEduOpen(!isEduOpen)}
                    className={tw(
                        "w-full bg-transparent mb-1 p-2 rounded-md flex items-center justify-between text-gray-700",
                        isEduOpen && "bg-gray-100"
                    )}
                >
                    교육 {isEduOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>
                {isEduOpen && (
                    <ul className="text-sm pl-2 space-y-2 text-literal-normal">
                        {TOPIC_TAGS.slice(8, 9).map((i) => (
                            <li className="flex items-center gap-2 hover:text-primary-second-dark cursor-pointer">
                                {i.icon} {i.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Topic;
