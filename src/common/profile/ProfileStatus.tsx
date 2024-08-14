import ProfileImage from "./ProfileImage";

const mockData = {
    name: "barwait",
    level: 1,
    type: "손님",
};

const ProfileStatus = () => {
    return (
        <div className="flex gap-[5px] text-literal-normal">
            <div className="w-[50px] h-[50px]">
                <ProfileImage />
            </div>
            <div className="flex flex-col">
                <div className="font-semibold">{mockData.name}</div>
                <div className="flex gap-1">
                    <div className="font-point">lv{mockData.level}</div>
                    <div className="font-point text-primary-second-dark">{mockData.type}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStatus;
