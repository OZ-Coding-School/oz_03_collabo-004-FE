import { twMerge as tw } from "tailwind-merge";

interface TagSkillProps {
    tagIcon: React.ReactNode;
    tagText: string;
    isClicked?: boolean;
    isEdit?: boolean;
    onClick: () => void;
}

const TagSkill = ({ tagIcon, tagText, isClicked, isEdit, onClick }: TagSkillProps) => {
    const handleClick = () => {
        if (isEdit || !isClicked) {
            onClick();
        }
    };
    return (
        <div
            onClick={handleClick}
            className={tw(
                "md:min-w-[165px] max-h-[40px] flex rounded-full py-2 px-5 cursor-pointer gap-1",
                isClicked ? "bg-primary-background border" : " border-primary-background border"
            )}
        >
            <div
                className={tw(
                    "w-5 md:w-7 text-sm md:text-lg my-auto hidden sm:block",
                    isClicked ? "text-primary-second-dark" : "text-primary-background"
                )}
            >
                {tagIcon}
            </div>
            <div
                className={tw(
                    "text-xs md:text-sm font-default",
                    isClicked ? "text-primary-second-dark" : "text-primary-background"
                )}
            >
                <p className="font-medium">{tagText}</p>
            </div>
        </div>
    );
};

export default TagSkill;
