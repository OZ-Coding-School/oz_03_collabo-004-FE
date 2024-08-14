import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";

interface TagSkillProps {
    tagIcon: React.ReactNode;
    tagText: string;
}

const TagSkill = ({ tagIcon, tagText }: TagSkillProps) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    return (
        <div
            onClick={handleClick}
            className={tw(
                "w-[150px] h-[40px] flex rounded-full py-2 px-5 cursor-pointer gap-1",
                isClicked ? "bg-primary-background" : " border-primary-background border"
            )}
        >
            <div
                className={tw(
                    "w-7 text-lg my-auto",
                    isClicked ? "text-primary-second-dark" : "text-primary-background"
                )}
            >
                {tagIcon}
            </div>
            <div
                className={tw(
                    "text-sm font-default",
                    isClicked ? "text-primary-second-dark" : "text-primary-background"
                )}
            >
                <p className="font-medium">{tagText}</p>
            </div>
        </div>
    );
};

export default TagSkill;
