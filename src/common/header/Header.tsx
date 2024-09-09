import { useNavigate } from "react-router-dom";
import HeaderInfo from "./HeaderInfo";
import HeaderInfoLogged from "./HeaderInfoLogged";
import HeaderSearch from "./HeaderSearch";
import { useEffect } from "react";
import { articleApi, authApi } from "../../api";
import { useArticleStore, useAuthStore } from "../../config/store";
import { motion } from "framer-motion";
import useDarkMode from "../../hooks/useDarkmode";
import { MdDarkMode, MdLightMode } from "react-icons/md";
const Header = () => {
    const nav = useNavigate();
    const { setStatus, status } = useAuthStore();
    const { initArticle } = useArticleStore();
    const { isDarkMode, switchDarkMode } = useDarkMode();

    useEffect(() => {
        const loginStatusCheck = async () => {
            const responseStatus = await authApi.userLoginStatus();
            setStatus(responseStatus.data.login);
        };
        loginStatusCheck();
    }, [setStatus]);

    const handleHome = async () => {
        nav("/");
        const articleResponse = await articleApi.articleList();
        initArticle(articleResponse.data);
    };

    return (
        <div className="fixed header z-[999] w-full h-[52px] bg-primary flex justify-center items-center">
            <div className="w-[1280px] h-full flex justify-center items-center px-4">
                <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-[20px] w-full h-full items-center"
                >
                    <img onClick={handleHome} className="cursor-pointer h-[30px]" src="/img/header_logo.png"></img>

                    <>
                        <HeaderSearch />
                        <button
                            onClick={switchDarkMode}
                            className=" text-gray-100 border-none rounded-md bg-primary dark:bg-primary dark:text-white"
                        >
                            {isDarkMode ? (
                                <MdLightMode className="size-6 text-gray-200" />
                            ) : (
                                <MdDarkMode className="size-6 text-gray-200" />
                            )}
                        </button>
                        {status === true && <HeaderInfoLogged />}
                        {status === false && <HeaderInfo />}
                    </>
                </motion.div>
            </div>
        </div>
    );
};

export default Header;
