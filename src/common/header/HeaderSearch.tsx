import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { twMerge as tw } from "tailwind-merge";
import { articleApi } from "../../api";
import { AiOutlineEnter } from "react-icons/ai";
import { useArticleStore } from "../../config/store";
const HeaderSearch = () => {
    const [select, setSelect] = useState(false);
    const [search, setSearch] = useState("");
    const { initArticle } = useArticleStore();

    const inputSelectHandler = () => {
        setSelect(true);
    };
    const inputBlurHandler = () => {
        setSelect(false);
    };
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const responseSearch = await articleApi.articleSearch(search);
        initArticle(responseSearch.data);
    };

    const handleEnter = async () => {
        const responseSearch = await articleApi.articleSearch(search);
        initArticle(responseSearch.data);
    };

    const handleEscape = async () => {
        setSearch("");
        const responseArticle = await articleApi.ArticleList();
        initArticle(responseArticle.data);
    };

    return (
        <div className="flex-grow">
            <form
                onKeyDown={(e) => e.key === "Escape" && handleEscape()}
                onSubmit={(e) => handleSearch(e)}
                className={tw(
                    "bg-gray-100 rounded-md relative h-[32px] flex items-center",
                    "transition-all duration-300 ease-out",
                    select ? "w-full" : "w-[200px]"
                )}
            >
                <FaSearch className="text-gray-600 w-[15px] h-[15px] absolute left-2" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                    onClick={inputSelectHandler}
                    onBlur={inputBlurHandler}
                    placeholder={select ? "" : "검색하기"}
                    className={tw(
                        "bg-gray-100 px-8 select-none outline-none w-full h-[32px] rounded-md",
                        "placeholder:text-center placeholder:text-gray-600 placeholder:font-point"
                    )}
                ></input>
                {select && (
                    <div
                        onClick={handleEnter}
                        className="cursor-pointer font-default hover:bg-slate-600 transition bg-slate-400 select-none flex gap-1 justify-center items-center px-2 rounded-md text-white mr-1 w-[50px] h-[20px]"
                    >
                        <AiOutlineEnter />
                    </div>
                )}
            </form>
        </div>
    );
};

export default HeaderSearch;
