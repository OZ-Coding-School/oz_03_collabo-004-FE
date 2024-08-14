import { useState } from "react";
import { MdCategory } from "react-icons/md";
import { twMerge as tw } from "tailwind-merge";

const BadgeTopic = () => {
    const [selected, setSelected] = useState(false);

    const selectHandler = () => {
        setSelected((prev) => !prev);
    };

    return (
        <button
            className={tw(
                "bg-background text-gray-600 flex gap-[2px] p-1 font-semibold rounded-[5px] justify-center items-center",
                "hover:text-literal-normal transition",
                selected && "text-gray-600 bg-gray-200"
            )}
        >
            <MdCategory className="w-[16px] h-[16px]" />
            <div onClick={selectHandler} className="text-md">
                카테고리
            </div>
        </button>
    );
};

export default BadgeTopic;
