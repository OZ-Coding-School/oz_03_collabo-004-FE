import { FaFireAlt } from "react-icons/fa";

const TrendingComment = () => {
    const items: { rank: number; comment: string }[] = [
        { rank: 1, comment: "s" },
        { rank: 2, comment: "m" },
        { rank: 3, comment: "s" },
        { rank: 4, comment: "l" },
        { rank: 5, comment: "s" },
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
                                <div className="my-auto"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingComment;
