import { FaFireAlt } from "react-icons/fa";

const TrendingContent = () => {
    const items: { rank: number; title: string }[] = [
        { rank: 1, title: "게임 1일차 훈수 부탁요" },
        { rank: 2, title: "노래 훈수 부탁드려요" },
        { rank: 3, title: "25조 리버풀 팀평좀요. 훈수.." },
        { rank: 4, title: "30세 남성 115kg 다이어트식.." },
        { rank: 5, title: "컴퓨터 견적 훈수ㄱ" },
    ];

    return (
        <div className="w-[226px]">
            <div className="flex items-center gap-1">
                <FaFireAlt className="text-literal-highlight ml-1" />
                <p className="font-default text-md text-literal-highlight">인기 게시글</p>
            </div>
            <div className="w-full h-auto bg-white rounded-md py-2 px-3 flex flex-col gap-2">
                {items.map((item) => (
                    <div className="flex gap-2 items-center">
                        <p className="font-point text-base text-slate-600">{item.rank}</p>
                        <img
                            src="https://dummyimage.com/32x32/000/fff"
                            alt="trending-content-image"
                            className="rounded-md"
                        />
                        <p className="text-xs font-default font-normal">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingContent;
