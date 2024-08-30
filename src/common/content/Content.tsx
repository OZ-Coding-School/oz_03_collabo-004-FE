import { Article } from "../../api/article";

interface ContentProps {
    article: Article;
}

const Content = ({ article }: ContentProps) => {
    return (
        <div className="flex flex-col bg-white rounded-t-lg w-[626px]">
            <div className={`flex justify-center mt-[20px] mb-[10px] ${article.thumbnail_image ? "" : "hidden"}`}>
                {article.thumbnail_image && (
                    <img
                        src={article.thumbnail_image}
                        alt={article.title}
                        className="object-cover w-[426px] h-[200px] rounded-[5px]"
                    />
                )}
            </div>
            <div className="flex flex-col p-4">
                <h2 className="mb-2 text-lg text-black fontsize-xl">{article.title}</h2>
                <p className="text-sm text-black">
                    {article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content}
                </p>
            </div>
        </div>
    );
};

export default Content;
