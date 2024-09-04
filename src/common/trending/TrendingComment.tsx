import { useEffect, useState } from "react";
import { FaFireAlt } from "react-icons/fa";
import { commentList } from "../../api/comment";
import { Comment } from "../../config/types";

interface TrendingCommentProps {
    articleId: number;
}

const TrendingComment = ({ articleId }: TrendingCommentProps) => {
    const [topComments, setTopComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchTopComments = async () => {
            try {
                const response = await commentList(articleId);
                const comments = response.data;

                const sortedComments = comments
                    .sort((a: Comment, b: Comment) => b.helpful_count - a.helpful_count)
                    .slice(0, 5);

                setTopComments(sortedComments);
            } catch (error) {
                console.error("Failed to fetch top comments:", error);
            }
        };

        fetchTopComments();
    }, [articleId]);

    return (
        <div className="w-[226px]">
            <div className="flex items-center gap-1">
                <FaFireAlt className="ml-1 text-literal-highlight" />
                <p className="font-default text-md text-literal-highlight">인기 훈수</p>
            </div>
            <div className="flex flex-col w-full h-auto px-1 py-1 bg-white rounded-md">
                {topComments.map((item, index) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-2 px-2 py-1 transition rounded-md cursor-pointer hover:bg-gray-100"
                    >
                        <p className="text-base font-point text-slate-600">{index + 1}</p>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <img
                                    src="https://dummyimage.com/20x20/000/fff"
                                    alt="trending-content-image"
                                    className="rounded-full size-5"
                                />
                                <p className="text-sm font-default text-literal-normal">{item.user_nickname}</p>
                            </div>
                            <p className="text-xs font-default text-literal-normal">{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingComment;
