import Skeleton from "./Skeleton";
import { FaFireAlt } from "react-icons/fa";

const SkeletonTrendingComment = () => {
    const items: { rank: number; size: "s" | "l" | "m" }[] = [
        { rank: 1, size: "s" },
        { rank: 2, size: "m" },
        { rank: 3, size: "s" },
        { rank: 4, size: "l" },
        { rank: 5, size: "s" },
    ];
    return (
        <div className="w-[226px]">
            <div className="flex items-center gap-1">
                <FaFireAlt className="text-literal-highlight ml-1" />
                <p className="font-default text-md text-literal-highlight">인기 훈수</p>
            </div>
            <div className="w-full h-[186px] bg-white rounded-md py-1 px-3 flex flex-col justify-between">
                {items.map((item) => (
                    <div key={item.rank} className="flex gap-2 items-center">
                        <p className="font-point text-base text-slate-600">{item.rank}</p>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                                <div className="size-4 bg-gray-200 my-auto rounded-full animate-pulse"></div>
                                <div className="my-auto">
                                    <Skeleton size="s" />
                                </div>
                            </div>
                            <Skeleton size={item.size} className="h-2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkeletonTrendingComment;
