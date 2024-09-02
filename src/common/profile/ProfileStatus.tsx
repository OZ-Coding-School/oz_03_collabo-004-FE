import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import useLevelTitle from "../../hooks/useLevelTitle";

interface ProfileStatusProps {
    userName: string;
    userId?: number;
}
const mockData = {
    level: 1,
    type: "손님",
};

const ProfileStatus = ({ userName, userId }: ProfileStatusProps) => {
    return (
        <div className="flex gap-[5px] text-literal-normal mb-[5px]">
            <div className="w-[40px] h-[40px] my-auto">
                <ProfileImage />
            </div>
            <div className="flex flex-col">
                <Link to={`/my/${userId}`}>
                    <div className="font-semibold">{userName}</div>
                </Link>
                <div className="flex gap-1">
                    <div className="font-point">lv{mockData.level}</div>
                    <div className="font-point text-primary-second-dark">{useLevelTitle(mockData.level)}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStatus;
