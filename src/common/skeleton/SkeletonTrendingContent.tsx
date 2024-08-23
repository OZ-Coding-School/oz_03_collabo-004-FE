import Skeleton from "./Skeleton";
import { FaFireAlt } from "react-icons/fa";

const SkeletonTrendingContent = () => {
    const items: { rank: number; size: "xs" | "m" | "s" }[] = [
        { rank: 1, size: "xs" },
        { rank: 2, size: "m" },
        { rank: 3, size: "s" },
        { rank: 4, size: "xs" },
        { rank: 5, size: "m" },
    ];

    return (
        <div className="w-[226px]">
            <div className="flex items-center gap-1">
                <FaFireAlt className="text-literal-highlight ml-1" />
                <p className="font-default text-md text-literal-highlight">인기 게시글</p>
            </div>
            <div className="w-full h-[208px] bg-white rounded-md py-2 px-3 flex flex-col justify-between">
                {items.map((item) => (
                    <div key={item.rank} className="flex gap-2 items-center">
                        <p className="font-point text-base text-slate-600">{item.rank}</p>
                        <div className="size-8 bg-gray-200 rounded-sm animate-pulse"></div>
                        <div className="my-auto">
                            <Skeleton size={item.size} className="h-[10px]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkeletonTrendingContent;
