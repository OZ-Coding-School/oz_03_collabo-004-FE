import { useNavigate } from "react-router-dom";
import HeaderInfo from "./HeaderInfo";
import HeaderInfoLogged from "./HeaderInfoLogged";
import HeaderSearch from "./HeaderSearch";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";
import { authApi } from "../../api";
import { useAuthStore } from "../../config/store";

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
        <div className="fixed header z-40 w-full h-[52px] bg-primary flex justify-center items-center">
            <div className="w-[1280px] h-full flex justify-center items-center px-4">
                <div className="flex gap-[20px] w-full h-full items-center">
                    <img onClick={() => nav("/")} className="cursor-pointer h-[30px]" src="/img/header_logo.png"></img>
                    {!isAdmin && (
                        <>
                            <HeaderSearch />
                            {status === true && <HeaderInfoLogged />}
                            {status === false && <HeaderInfo />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
