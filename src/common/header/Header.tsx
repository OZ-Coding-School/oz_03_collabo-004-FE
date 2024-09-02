import { useNavigate } from "react-router-dom";
import HeaderInfo from "./HeaderInfo";
import HeaderInfoLogged from "./HeaderInfoLogged";
import HeaderSearch from "./HeaderSearch";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";

interface HeaderProps {
    isAdmin?: boolean;
}

const Header = ({ isAdmin = false }: HeaderProps) => {
    const isLogin = false;
    const nav = useNavigate();
    const { getUserInfo } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            await getUserInfo();
        };
        fetchData();
    }, [getUserInfo]);

    return (
        <div className="fixed header z-40 w-full h-[52px] bg-primary flex justify-center items-center">
            <div className="w-[1280px] h-full flex justify-center items-center px-4">
                <div className="flex gap-[20px] w-full h-full items-center">
                    <img onClick={() => nav("/")} className="cursor-pointer h-[30px]" src="/img/header_logo.png"></img>
                    {!isAdmin && (
                        <>
                            <HeaderSearch />
                            {isLogin ? <HeaderInfoLogged /> : <HeaderInfo />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
