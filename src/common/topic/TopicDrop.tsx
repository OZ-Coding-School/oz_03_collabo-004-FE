import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";
import { twMerge as tw } from "tailwind-merge";
import { DUMMY_TAGS } from "../../config/const";
import { useArticleStore, useUserStore } from "../../config/store";
import { FaChevronRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

const TopicDrop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUserStore();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const { selectTag, setTag } = useArticleStore();

    const handleTagClick = (id: number) => {
        if (selectTag === id) return;
        setTag(id);
    };

    return (
        <div className="fixed flex flex-col items-end cursor-pointer bottom-5 right-5 xl:hidden ">
            <button
                onClick={toggleDropdown}
                className={tw(
                    "p-3 bg-primary bg-opacity-80 hover:bg-opacity-100 rounded-full text-white ",
                    isOpen && "bg-opacity-100"
                )}
            >
                <AiOutlineMenu size={20} />
            </button>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute right-0 z-50 w-40 p-2 bg-white border rounded-lg shadow-lg border-primary border-opacity-20 bottom-14 dark:bg-gray-800"
                >
                    <div className="flex flex-col gap-2">
                        <p
                            onClick={() => setTag(0)}
                            className={tw(
                                "cursor-pointer hover:text-primary-second-dark transition font-default px-1 text-literal-normal text-base font-semibold dark:text-white",
                                selectTag === 0 && "text-primary-second-dark"
                            )}
                        >
                            모든 훈수
                        </p>
                        <Line />
                        <ul className="p-1 pl-2 space-y-2 overflow-hidden text-sm bg-gray-100 rounded-md text-literal-normal">
                            <li
                                key={DUMMY_TAGS[1].id}
                                onClick={() => setTag(DUMMY_TAGS[1].id)}
                                className={tw(
                                    "flex items-center gap-2 duration-100 font-medium hover:text-primary-second-dark cursor-pointer",
                                    selectTag === DUMMY_TAGS[1].id && "text-primary-second-dark"
                                )}
                            >
                                {DUMMY_TAGS[1].icon} {DUMMY_TAGS[1].text} <FaChevronRight className="ml-auto text-sm" />
                            </li>
                        </ul>

                        <div className="w-full mb-2">
                            <ul className="pl-2 space-y-2 overflow-hidden text-sm text-literal-normal">
                                {DUMMY_TAGS.slice(2, 8).map((i) => (
                                    <li
                                        key={i.id}
                                        onClick={() => handleTagClick(i.id)}
                                        className={tw(
                                            "flex items-center gap-2 duration-100 font-normal hover:text-primary-second-dark cursor-pointer dark:text-white",
                                            selectTag === i.id && "text-primary-second-dark"
                                        )}
                                    >
                                        {i.icon} {i.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Line />
                        <ul className="p-1 pl-2 space-y-2 overflow-hidden text-sm bg-gray-100 rounded-md text-literal-normal">
                            <li
                                key={DUMMY_TAGS[8].id}
                                onClick={() => handleTagClick(DUMMY_TAGS[8].id)}
                                className={tw(
                                    "flex text-sm items-center gap-2 font-medium duration-100 hover:text-primary-second-dark cursor-pointer",
                                    selectTag === DUMMY_TAGS[8].id && "text-primary-second-dark"
                                )}
                            >
                                {DUMMY_TAGS[8].icon} {DUMMY_TAGS[8].text} <FaChevronRight className="ml-auto text-sm" />
                            </li>
                        </ul>

                        <div className="w-full mb-2">
                            <ul className="pl-2 space-y-2 overflow-hidden text-sm text-literal-normal">
                                {DUMMY_TAGS.slice(9, 11).map((i) => (
                                    <li
                                        key={i.id}
                                        onClick={() => handleTagClick(i.id)}
                                        className={tw(
                                            "flex items-center gap-2 duration-100 font-normal hover:text-primary-second-dark cursor-pointer dark:text-white",
                                            selectTag === i.id && "text-primary-second-dark"
                                        )}
                                    >
                                        {i.icon} {i.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Line />
                        <div className="w-full">
                            <ul className="p-1 pl-2 space-y-2 overflow-hidden text-sm bg-gray-100 rounded-md text-literal-normal">
                                <li
                                    key={DUMMY_TAGS[11].id}
                                    onClick={() => handleTagClick(DUMMY_TAGS[11].id)} // 태그 클릭 시 처리
                                    className={tw(
                                        "flex text-sm items-center gap-2 font-medium duration-100 hover:text-primary-second-dark cursor-pointer",
                                        selectTag === DUMMY_TAGS[11].id && "text-primary-second-dark"
                                    )}
                                >
                                    {DUMMY_TAGS[11].icon} {DUMMY_TAGS[11].text}
                                </li>
                            </ul>
                        </div>
                        {user && user.selected_tags.length > 0 && (
                            <>
                                <Line />
                                <div className="w-full">
                                    <ul className="p-1 pl-2 space-y-2 overflow-hidden text-sm bg-gray-100 rounded-md text-literal-normal">
                                        <li
                                            key="customTag"
                                            onClick={() => setTag(100)}
                                            className={tw(
                                                "flex text-sm items-center gap-2 font-medium duration-100 hover:text-primary-second-dark cursor-pointer",
                                                selectTag === 100 && "text-primary-second-dark"
                                            )}
                                        >
                                            <FaStar />
                                            나의 전문 훈수
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default TopicDrop;
const Line = () => {
    return <div className="w-full border-b my-21"></div>;
};
