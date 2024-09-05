import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import useLevelTitle from "../../hooks/useLevelTitle";

interface ProfileStatusProps {
    nickname: string;
    user_id: number;
    hunsoo_level: number;
    profile_image: string;
}

const ProfileStatus = ({ nickname, user_id, hunsoo_level, profile_image }: ProfileStatusProps) => {
    return (
        <Link to={`/my/${user_id}`}>
            <div className="flex gap-2 text-literal-normal mb-[5px]">
                <div className="relative w-[40px] h-[40px] my-auto">
                    <ProfileImage src={profile_image} />
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold">{nickname}</div>

                    <div className="flex gap-1 text-sm">
                        <div className="font-point">Lv{hunsoo_level}</div>
                        <div className="font-point text-primary-second-dark">{useLevelTitle(hunsoo_level)}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProfileStatus;
