import { PropsWithChildren } from "react";
import { RiEmotionHappyLine, RiLightbulbLine, RiGroupLine } from "react-icons/ri";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { twMerge as tw } from "tailwind-merge";
import { motion } from "framer-motion";

interface BadgeProps extends PropsWithChildren {
    icon: React.ReactNode;
    text: string;
}

const Badge = ({ icon, text }: BadgeProps) => {
    return (
        <div className="flex items-center space-x-2 w-[409px]">
            {icon}
            <div
                className={tw(
                    "bg-primary-second bg-opacity-50 rounded-full text-literal-normal h-[30px] flex items-center px-4"
                )}
            >
                {text}
            </div>
        </div>
    );
};

const BadgeDesc = () => {
    return (
        <motion.div
            animate={{ translateX: [10, 0], opacity: [0, 1] }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-[22px] font-default"
        >
            <Badge
                icon={<RiGroupLine className="text-primary-second-dark size-6" />}
                text="전문가와 조언을 나누고 싶어요."
            />
            <Badge
                icon={<RiEmotionHappyLine className="text-primary-second-dark size-6" />}
                text="유머와 창의성으로 피드백을 받고 싶어요."
            />
            <Badge
                icon={<RiLightbulbLine className="text-primary-second-dark size-6" />}
                text="훈수와 아이디어로 영감을 얻고 싶어요."
            />
            <Badge
                icon={<HiOutlineMegaphone className="text-primary-second-dark size-6" />}
                text="내 조언을 널리 알리고 싶어요."
            />
        </motion.div>
    );
};

export default BadgeDesc;
