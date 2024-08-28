import { Article } from "../../config/types";
import useFormatDate from "../../hooks/useFormatDate";
import Badge from "../badge/Badge";
import CommentMyPage from "../comment/CommentMyPage";

interface ContentMyPageProps {
    activeTab: number;
    article: Article;
}

const ContentMyPage = ({ activeTab, article }: ContentMyPageProps) => {
    //! article 인지 comment인지 판단해서 데이터 넣어야함
    return (
        <div className="max-w-[780px] min-w-[300px] my-4">
            <div className="sm:flex gap-2 mb-3 ml-2">
                {activeTab === 1 && (
                    <p className="text-sm font-medium mr-4 text-literal-normal">따지고 보면 잔소리라 생각되진 않아</p>
                )}
                <div className="flex gap-2 sm:mt-0 mt-2">
                    <p className="text-sm text-gray-600 mr-2 font-default">{useFormatDate(article.created_at)}</p>
                    {article.tags.map((tag) => (
                        <Badge key={tag.tag_id} color="yellow">
                            {tag.name.slice(0, -2)}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="bg-white px-6 py-4 w-full rounded-2xl">
                <p className="text-base sm:text-lg font-default text-literal-normal pb-3 border-b border-b-gray-100">
                    {article.title}
                </p>

                {activeTab === 1 ? (
                    <CommentMyPage />
                ) : (
                    <p className="my-3 text-literal-normal text-sm">고민내용내용내용</p>
                )}
            </div>
        </div>
    );
};

export default ContentMyPage;
