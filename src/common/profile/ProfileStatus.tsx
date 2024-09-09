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
        <div>
            <div className="flex gap-2 text-literal-normal mb-[5px]">
                <Link to={`/my/${user_id}`} className="relative w-[40px] h-[40px] my-auto">
                    <ProfileImage src={profile_image} />
                </Link>
                <div className="flex flex-col dark:text-white">
                    <Link to={`/my/${user_id}`} className="font-semibold">
                        {nickname}
                    </Link>

                    <div className="flex gap-1 text-sm dark:text-white">
                        <div className="font-point">Lv{hunsoo_level}</div>
                        <div className="font-point text-primary-second-dark">{useLevelTitle(hunsoo_level)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStatus;
