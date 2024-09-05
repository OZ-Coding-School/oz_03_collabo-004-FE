import { useNavigate } from "react-router-dom";
import HeaderInfo from "./HeaderInfo";
import HeaderInfoLogged from "./HeaderInfoLogged";
import HeaderSearch from "./HeaderSearch";
import { useEffect } from "react";
import { authApi } from "../../api";
import { useAuthStore } from "../../config/store";
import { motion } from "framer-motion";

interface HeaderProps {
    isAdmin?: boolean;
}

const Header = ({ isAdmin = false }: HeaderProps) => {
    const nav = useNavigate();
    const { setStatus, status } = useAuthStore();

    useEffect(() => {
        const loginStatusCheck = async () => {
            const responseStatus = await authApi.userLoginStatus();
            setStatus(responseStatus.data.login);
        };
        loginStatusCheck();
    }, [setStatus]);

    return (
        <div className="fixed header z-[999] w-full h-[52px] bg-primary flex justify-center items-center">
            <div className="w-[1280px] h-full flex justify-center items-center px-4">
                <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-[20px] w-full h-full items-center"
                >
                    <img onClick={() => nav("/")} className="cursor-pointer h-[30px]" src="/img/header_logo.png"></img>

                    {!isAdmin && (
                        <>
                            <HeaderSearch />
                            {status === true && <HeaderInfoLogged />}
                            {status === false && <HeaderInfo />}
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Header;
