import Badge from "../badge/Badge";
import CommentMyPage from "../comment/CommentMyPage";

const ContentMyPage = () => {
    const tab = true;
    return (
        <div className="max-w-[780px]">
            <div className="flex gap-2 mb-3 ml-2">
                {tab && (
                    <p className="text-sm font-medium mr-4 text-literal-normal">따지고 보면 잔소리라 생각되진 않아</p>
                )}
                <p className="text-sm text-gray-600 mr-2 font-default">2024년 08월 12일</p>
                <Badge color="yellow">고민</Badge>
                <Badge color="yellow">소소</Badge>
            </div>
            <div className="bg-white px-6 py-4 w-full rounded-2xl">
                <p className="text-lg font-default text-literal-normal pb-3 border-b border-b-gray-100">고민내용</p>

                {tab ? <CommentMyPage /> : <p className="my-3 text-literal-normal text-sm">고민내용내용내용</p>}
            </div>
        </div>
    );
};

export default ContentMyPage;
