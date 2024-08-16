import Badge from "../badge/Badge";
import CommentMyPage from "../comment/CommentMyPage";

const ContentMyPage = () => {
    return (
        <div className="max-w-[780px]">
            <div className="flex gap-2 mb-3 ml-2">
                <p className="text-sm font-medium mr-4 text-literal-normal">따지고 보면 잔소리라 생각되진 않아</p>
                <p className="text-sm text-gray-600 mr-2 font-default">2024년 08월 12일</p>
                <Badge color="yellow">고민</Badge>
                <Badge color="yellow">소소</Badge>
            </div>
            <div className="bg-white px-6 py-4 w-full rounded-2xl">
                <p className="text-lg font-default text-literal-normal pb-3 border-b border-b-gray-100">고민내용</p>
                <p className="font-default text-sm text-gray-600 font-normal p-2">미채택</p>
                {/* <div className="bg-gray-100 rounded-2xl">
                    <p className="text-literal-normal text-sm py-4 px-6">이야기 잘봤음</p>
                </div> */}
                <CommentMyPage />
            </div>
        </div>
    );
};

export default ContentMyPage;
