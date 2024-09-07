import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AdminList } from "../config/types";
import { findUserName } from "../util/adminFind";
import { MdArticle } from "react-icons/md";
import { useState } from "react";
import { ModalPortal } from "../config/ModalPortal";
import ModalReportCommentDetail from "./modal/ModalReportCommentDetail";

dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);

interface AdminReportListProps {
    userData: AdminList;
    refetch: () => void;
}

const AdminReportCommentList = ({ userData, refetch }: AdminReportListProps) => {
    const [reportModalStatus, setReportModalStatus] = useState(false);
    const [articleId, setArticleId] = useState<number | null>(null);
    const [reportId, setReportId] = useState<number | null>(null);
    const [reportDetail, setReportDetail] = useState<string | null>(null);

    const filteredData = userData.reportList.comment_reports.sort((a, b) => a.id - b.id);

    const handleReportModalOpen = (id: number, content: string, reportId: number) => {
        setReportModalStatus(true);
        setArticleId(id);
        setReportDetail(content);
        setReportId(reportId);
    };

    const handleReportModalClose = () => {
        setReportModalStatus(false);
        setArticleId(null);
        setReportDetail(null);
        setReportId(null);
    };

    return (
        <>
            <div className="max-w-[1580px] w-full p-4">
                <h1 className="text-xl font-point mb-4">댓글 신고내역 목록</h1>

                <div className="overflow-x-auto">
                    <div className="max-h-[510px] overflow-y-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="sticky top-0 bg-stone-200 ">
                                <tr>
                                    <th className=" px-4 py-2">ID</th>
                                    <th className=" px-4 py-2">신고 작성 일자</th>
                                    <th className=" px-4 py-2">신고한 유저</th>
                                    <th className=" px-4 py-2">신고된 유저</th>
                                    <th className=" px-4 py-2">자세히보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td className="text-center">No Content</td>
                                        <td className="text-center">No Content</td>
                                        <td className="text-center">No Content</td>
                                        <td className="text-center">No Content</td>
                                        <td className="text-center">No Content</td>
                                    </tr>
                                )}
                                {filteredData.map((data) => (
                                    <tr key={data.id}>
                                        <td className="px-4 py-2 text-center">{data.id}</td>
                                        <td className="px-4 py-2 text-center">
                                            {dayjs(data.created_at).format("YYYY년 MM월 DD일 HH:mm")}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <span>{findUserName(userData.userList, data.reporter)}</span>
                                            <span>{`(${data.reporter})`}</span>
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <span>{findUserName(userData.userList, data.reported_user)}</span>
                                            <span>{`(${data.reported_user})`}</span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleReportModalOpen(
                                                        data.reported_article,
                                                        data.report_detail,
                                                        data.id
                                                    )
                                                }
                                                className="w-full bg-stone-500 hover:bg-stone-400 p-1 rounded-sm flex justify-center items-center gap-2"
                                            >
                                                <MdArticle className="text-stone-100" />
                                                <div className="text-stone-100">Detail</div>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ModalPortal>
                {reportModalStatus && (
                    <ModalReportCommentDetail
                        reportId={reportId as number}
                        parent="admin-container"
                        onClose={handleReportModalClose}
                        isOpen={reportModalStatus}
                        articleId={articleId as number}
                        reportDetail={reportDetail as string}
                        refetch={refetch}
                    />
                )}
            </ModalPortal>
        </>
    );
};

export default AdminReportCommentList;
