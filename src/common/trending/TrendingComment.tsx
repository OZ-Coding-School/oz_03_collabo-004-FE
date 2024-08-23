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
            <div className="w-full h-auto bg-white rounded-md py-1 px-1 flex flex-col">
                {items.map((item) => (
                    <div
                        key={item.rank}
                        className="flex gap-2 px-2 py-1 items-center rounded-md cursor-pointer transition hover:bg-gray-100"
                    >
                        <p className="font-point text-base text-slate-600">{item.rank}</p>
                        <div className="flex flex-col">
                            <div className="flex gap-1 items-center">
                                <img
                                    src="https://dummyimage.com/20x20/000/fff"
                                    alt="trending-content-image"
                                    className="rounded-full size-5"
                                />
                                <p className="text-sm font-default text-literal-normal">김민수</p>
                            </div>
                            <p className="font-default text-xs text-literal-normal">Lorem Ipsum Lorem Ipsum Lorem...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingComment;
