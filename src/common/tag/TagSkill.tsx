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
                "md:min-w-[165px] min-w-[100px] max-h-[40px] flex rounded-full py-2 px-1 sm:px-4 md:pl-5 cursor-pointer gap-1 justify-center sm:justify-start",
                isClicked
                    ? "bg-primary-background border dark:bg-slate-500"
                    : " border-primary-background border dark:border-gray-100"
            )}
        >
            <div
                className={tw(
                    "w-5 md:w-7 text-sm md:text-lg my-auto hidden sm:block",
                    isClicked
                        ? "text-primary-second-dark dark:text-gray-100"
                        : "text-primary-background dark:text-gray-100"
                )}
            >
                {tagIcon}
            </div>
            <div
                className={tw(
                    "text-xs md:text-sm font-default",
                    isClicked
                        ? "text-primary-second-dark dark:text-gray-100"
                        : "text-primary-background dark:text-gray-100"
                )}
            >
                <p className="font-medium">{tagText}</p>
            </div>
        </div>
    );
};

export default TagSkill;
