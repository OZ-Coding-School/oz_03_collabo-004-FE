import { useNavigate } from "react-router-dom";
import ProfileImage from "../profile/ProfileImage";

const HeaderInfoLogged = () => {
    const nav = useNavigate();
    return (
        <div className="flex justify-center items-center relative">
            <div onClick={() => nav("/my")} className="w-[36px] h-[36px] cursor-pointer">
                <ProfileImage />
            </div>
        </div>
    );
};

export default HeaderInfoLogged;
