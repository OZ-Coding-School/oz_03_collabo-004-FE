import { PropsWithChildren } from "react";
import { twMerge as tw } from "tailwind-merge";

interface BadgeProps extends PropsWithChildren {
    color?: "yellow" | "default";
}

const Badge = ({ color = "default", children }: BadgeProps) => {
    return (
        <>
            <div
                className={tw(
                    "w-[52px] flex justify-center text-literal-normal items-center text-sm font-semibold rounded-[5px]",
                    color === "yellow" && "bg-literal-star",
                    color === "default" && "bg-slate-200"
                )}
            >
                {children}
            </div>
        </>
    );
};

export default Badge;
