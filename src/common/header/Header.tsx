import HeaderInfo from "./HeaderInfo";
import HeaderInfoLogged from "./HeaderInfoLogged";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
    const isLogin = false;
    return (
        <div className="fixed z-50 w-full h-[52px] bg-primary flex justify-center items-center">
            <div className="w-[1280px] h-full flex justify-center items-center px-4">
                <div className="flex gap-[20px] w-full h-full items-center">
                    <img className="h-[30px]" src="/img/header_logo.png"></img>
                    <HeaderSearch />
                    {isLogin ? <HeaderInfoLogged /> : <HeaderInfo />}
                </div>
            </div>
        </div>
    );
};

export default Header;