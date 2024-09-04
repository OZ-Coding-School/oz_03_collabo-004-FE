import { useEffect, useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { axiosInstance } from "../../api/axios";
import { Article } from "../../config/types";

const TrendingContent = () => {
    const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchTrendingArticles = async () => {
            try {
                const response = await axiosInstance.get<Article[]>("/article/", { withCredentials: true });

                const sortedArticles = response.data.sort((a, b) => b.like_count - a.like_count).slice(0, 5);

                setTrendingArticles(sortedArticles);
            } catch (error) {
                console.error("Failed to fetch trending articles:", error);
            }
        };

        fetchTrendingArticles();
    }, []);

    return (
        <div className="w-full sticky top-20 min-w-[170px]">
            <div className="flex items-center gap-1">
                <FaFireAlt className="ml-1 text-literal-highlight" />
                <p className="font-default text-md text-literal-highlight">인기 게시글</p>
            </div>
            <div className="flex flex-col w-full h-auto px-1 py-1 bg-white rounded-md ">
                {trendingArticles.map((article, index) => (
                    <div
                        key={article.article_id}
                        className="flex items-center gap-2 px-2 py-1 transition rounded-md cursor-pointer hover:bg-gray-100"
                    >
                        <p className="text-base font-point text-slate-600">{index + 1}</p>
                        <img
                            src={article.thumbnail_image || "https://dummyimage.com/32x32/000/fff"}
                            alt="trending-content-image"
                            className="rounded-md w-[32px] h-[32px]"
                        />
                        <p className="text-xs font-normal font-default text-literal-normal">{article.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingContent;
