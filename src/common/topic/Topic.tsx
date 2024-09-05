import { twMerge as tw } from "tailwind-merge";
import { DUMMY_TAGS } from "../../config/const";
import { FaChevronRight } from "react-icons/fa6";
import { useArticleStore } from "../../config/store";

const Topic = () => {
    const { selectTag, setTag } = useArticleStore();

    const handleTagClick = (id: number) => {
        if (selectTag === id) return;
        setTag(id);
    };

    return (
        <div className="select-none w-full h-full bg-white p-2 rounded-xl font-default">
            <p
                onClick={() => setTag(0)}
                className={tw(
                    "cursor-pointer hover:text-primary-second-dark transition font-point px-1 text-literal-normal text-lg font-medium",
                    selectTag === 0 && "text-primary-second-dark"
                )}
            >
                모든 훈수
            </p>
            <Line />
            <ul className="pl-2 space-y-2 overflow-hidden text-md text-literal-normal mb-2 bg-gray-100 p-2 rounded-md">
                <li
                    key={DUMMY_TAGS[1].id}
                    onClick={() => setTag(DUMMY_TAGS[1].id)}
                    className={tw(
                        "flex items-center gap-2 duration-100 font-medium hover:text-primary-second-dark cursor-pointer",
                        selectTag === DUMMY_TAGS[1].id && "text-primary-second-dark"
                    )}
                >
                    {DUMMY_TAGS[1].icon} {DUMMY_TAGS[1].text} <FaChevronRight className="text-sm ml-auto" />
                </li>
            </ul>

            <div className="w-full mb-2">
                <ul className="pl-2 space-y-2 overflow-hidden text-sm text-literal-normal">
                    {DUMMY_TAGS.slice(2, 8).map((i) => (
                        <li
                            key={i.id}
                            onClick={() => handleTagClick(i.id)}
                            className={tw(
                                "flex items-center gap-2 duration-100 hover:text-primary-second-dark cursor-pointer",
                                selectTag === i.id && "text-primary-second-dark"
                            )}
                        >
                            {i.icon} {i.text}
                        </li>
                    ))}
                </ul>
            </div>
            <Line />
            <ul className="pl-2 space-y-2 overflow-hidden text-md text-literal-normal mb-2 bg-gray-100 p-2 rounded-md">
                <li
                    key={DUMMY_TAGS[8].id}
                    onClick={() => handleTagClick(DUMMY_TAGS[8].id)}
                    className={tw(
                        "flex text-md items-center gap-2 font-medium duration-100 hover:text-primary-second-dark cursor-pointer",
                        selectTag === DUMMY_TAGS[8].id && "text-primary-second-dark"
                    )}
                >
                    {DUMMY_TAGS[8].icon} {DUMMY_TAGS[8].text} <FaChevronRight className="text-sm ml-auto" />
                </li>
            </ul>

            <div className="w-full mb-2">
                <ul className="pl-2 space-y-2 overflow-hidden text-sm text-literal-normal">
                    {DUMMY_TAGS.slice(9, 11).map((i) => (
                        <li
                            key={i.id}
                            onClick={() => handleTagClick(i.id)}
                            className={tw(
                                "flex items-center gap-2 duration-100 hover:text-primary-second-dark cursor-pointer",
                                selectTag === i.id && "text-primary-second-dark"
                            )}
                        >
                            {i.icon} {i.text}
                        </li>
                    ))}
                </ul>
            </div>
            <Line />
            <div className="w-full mb-2">
                <ul className="pl-2 space-y-2 overflow-hidden text-sm text-literal-normal bg-gray-100 p-2 rounded-md">
                    <li
                        key={DUMMY_TAGS[11].id}
                        onClick={() => handleTagClick(DUMMY_TAGS[11].id)} // 태그 클릭 시 처리
                        className={tw(
                            "flex text-md items-center gap-2 font-medium duration-100 hover:text-primary-second-dark cursor-pointer",
                            selectTag === DUMMY_TAGS[11].id && "text-primary-second-dark"
                        )}
                    >
                        {DUMMY_TAGS[11].icon} {DUMMY_TAGS[11].text}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Topic;

const Line = () => {
    return <div className="w-full border-b my-2"></div>;
};
