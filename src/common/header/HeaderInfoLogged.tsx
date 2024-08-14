import ProfileImage from "../profile/ProfileImage";

const HeaderInfoLogged = () => {
    return (
        <div className="flex justify-center items-center relative">
            <div className="w-[36px] h-[36px]">
                <ProfileImage />
            </div>
        </div>
    );
};

export default HeaderInfoLogged;
