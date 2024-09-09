import { useNavigate } from "react-router-dom";
import HeaderInfo from "./HeaderInfo";
import HeaderInfoLogged from "./HeaderInfoLogged";
import HeaderSearch from "./HeaderSearch";
import { useEffect } from "react";
import { articleApi, authApi } from "../../api";
import { useArticleStore, useAuthStore } from "../../config/store";
import { motion } from "framer-motion";
// import useDarkMode from "../../hooks/useDarkmode";
// import { AiOutlineSun } from "react-icons/ai";
// import { AiOutlineMoon } from "react-icons/ai";

const Header = () => {
    const nav = useNavigate();
    const { setStatus, status } = useAuthStore();
    const { initArticle } = useArticleStore();
    // const { isDarkMode, switchDarkMode } = useDarkMode();

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
                        {/* <button
                            onClick={switchDarkMode}
                            className="px-3 py-1 text-black bg-gray-100 rounded-md dark:bg-[#323232] dark:text-white"
                        >
                            {isDarkMode ? <AiOutlineSun /> : <AiOutlineMoon />}
                        </button> */}
                        {status === true && <HeaderInfoLogged />}
                        {status === false && <HeaderInfo />}
                    </>
                </motion.div>
            </div>
        </div>
    );
};

export default Header;
