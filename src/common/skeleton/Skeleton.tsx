import { twMerge as tw } from "tailwind-merge";

interface SkeletonProps {
    size: "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl";
    className?: string;
}

const Skeleton = ({ size, className }: SkeletonProps) => {
    return (
        <div
            className={tw(
                "bg-gray-200 rounded-md h-3 animate-pulse",
                size === "xs" && "w-[48px]",
                size === "s" && "w-[85px]",
                size === "m" && "w-[120px]",
                size === "l" && "w-[150px]",
                size === "xl" && "w-[180px]",
                size === "2xl" && "w-[200px]",
                size === "3xl" && "w-[450px]",
                className
            )}
        ></div>
    );
};

export default Skeleton;
