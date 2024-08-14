import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { twMerge as tw } from "tailwind-merge";
const HeaderSearch = () => {
    const [select, setSelect] = useState(false);

    const inputSelectHandler = () => {
        setSelect(true);
    };
    const inputBlurHandler = () => {
        setSelect(false);
    };

    return (
        <div className="flex-grow">
            <form
                className={tw(
                    "bg-gray-100 rounded-md relative h-[32px] flex items-center",
                    "transition-all duration-300 ease-out",
                    select ? "w-full" : "w-[200px]"
                )}
            >
                <FaSearch className="text-gray-600 w-[15px] h-[15px] absolute left-2" />
                <input
                    onClick={inputSelectHandler}
                    onBlur={inputBlurHandler}
                    placeholder={select ? "" : "검색하기"}
                    className={tw(
                        "bg-gray-100 px-8 select-none outline-none w-full h-[32px] rounded-md",
                        "placeholder:text-center placeholder:text-gray-600 placeholder:font-point"
                    )}
                ></input>
            </form>
        </div>
    );
};

export default HeaderSearch;
