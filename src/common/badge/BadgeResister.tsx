import { PropsWithChildren } from "react";
import { RiEmotionHappyLine, RiLightbulbLine, RiGroupLine } from "react-icons/ri";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { twMerge as tw } from "tailwind-merge";

interface BadgeProps extends PropsWithChildren {
    icon: React.ReactNode;
    text: string;
}

const Badge = ({ icon, text }: BadgeProps) => {
    return (
        <div className="flex items-center space-x-2">
            {icon}
            <div className={tw("bg-primary-second rounded-full text-literal-normal h-[30px] flex items-center px-4")}>
                {text}
            </div>
        </div>
    );
};

const BadgeResister = () => {
    return (
        <div className="space-y-4">
            <Badge icon={<RiGroupLine className="text-primary-second" />} text="전문가와 조언을 나누고 싶어요." />
            <Badge
                icon={<RiEmotionHappyLine className="text-primary-second" />}
                text="유머와 창의성으로 피드백을 받고 싶어요."
            />
            <Badge
                icon={<RiLightbulbLine className="text-primary-second" />}
                text="훈수와 아이디어로 영감을 얻고 싶어요."
            />
            <Badge icon={<HiOutlineMegaphone className="text-primary-second" />} text="내 조언을 널리 알리고 싶어요." />
        </div>
    );
};

export default BadgeResister;
