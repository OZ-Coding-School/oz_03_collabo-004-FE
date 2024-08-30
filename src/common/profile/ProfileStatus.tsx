import ProfileImage from "./ProfileImage";

interface ProfileStatusProps {
    userName: string;
}
const mockData = {
    level: 1,
    type: "손님",
};

const ProfileStatus = ({ userName }: ProfileStatusProps) => {
    return (
        <div className="flex gap-[5px] text-literal-normal mb-[5px]">
            <div className="w-[40px] h-[40px]">
                <ProfileImage />
            </div>
            <div className="flex flex-col">
                <div className="font-semibold">{userName}</div>
                <div className="flex gap-1">
                    <div className="font-point">lv{mockData.level}</div>
                    <div className="font-point text-primary-second-dark">{mockData.type}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStatus;
