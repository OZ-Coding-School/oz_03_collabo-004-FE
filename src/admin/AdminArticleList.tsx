import dayjs from "dayjs";
dayjs.locale("ko");
import { AdminList } from "../config/types";
import { ModalPortal } from "../config/ModalPortal";
import { useState } from "react";
import { MdArticle } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import ModalDetail from "../common/modal/ModalDetail";
import ModalDeleteArticle from "./modal/ModalDeleteArticle";

interface AdminUserListProps {
    userData: AdminList;
    refetch: () => void;
}

const AdminArticleList = ({ userData, refetch }: AdminUserListProps) => {
    const [detailModalStatus, setDetailModalStatus] = useState(false);
    const [deleteModalStatus, setDeleteModalStatus] = useState(false);
    const [selectId, setSelectId] = useState<number | null>(null);

    const handleDetailModalOpen = (id: number) => {
        setSelectId(id);
        setDetailModalStatus(true);
    };
    const handleDetailModalClose = () => {
        setSelectId(null);
        setDetailModalStatus(false);
    };
    const handleDeleteModalOpen = (id: number) => {
        setSelectId(id);
        setDeleteModalStatus(true);
    };
    const handleDeleteModalClose = () => {
        setSelectId(null);
        setDeleteModalStatus(false);
    };

    const filteredData = userData.articleList.sort((a, b) => a.article_id - b.article_id);

    return (
        <>
            <div className=" max-w-[1580px] w-full p-4">
                <h1 className="text-xl font-point mb-4">전체 게시글 목록</h1>

                <div className="overflow-x-auto">
                    <div className="max-h-[510px] overflow-y-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="sticky top-0 bg-stone-200 ">
                                <tr>
                                    <th className=" px-4 py-2">ID</th>
                                    <th className=" px-4 py-2">작성 일자</th>
                                    <th className=" px-4 py-2">제목</th>
                                    <th className=" px-4 py-2">작성자 닉네임</th>
                                    <th className=" px-4 py-2">자세히 보기</th>
                                    <th className=" px-4 py-2">게시글 삭제</th>
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
                                    <tr key={data.article_id}>
                                        <td className="px-4 py-2 text-center">{data.article_id}</td>
                                        <td className=" px-4 py-2 text-center">
                                            {dayjs(data.created_at).format("YYYY년 MM월 DD일 HH:mm")}
                                        </td>
                                        <td className=" px-4 py-2 text-center">{data.title}</td>
                                        <td className="px-4 py-2 text-center">{data.user.nickname}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDetailModalOpen(data.article_id)}
                                                className="w-full bg-stone-500 hover:bg-stone-400 p-1 rounded-sm flex justify-center items-center gap-2"
                                            >
                                                <MdArticle className="text-stone-100" />
                                                <div className="text-stone-100">Detail</div>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteModalOpen(data.article_id)}
                                                className="w-full bg-stone-500 hover:bg-stone-400 p-1 rounded-sm flex justify-center items-center gap-2"
                                            >
                                                <FaTrashAlt className="text-stone-100" />
                                                <div className="text-stone-100">Delete</div>
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
                {detailModalStatus && (
                    <ModalDetail
                        articleId={selectId as number}
                        parent={"admin-container"}
                        isOpen={detailModalStatus}
                        onClose={handleDetailModalClose}
                    />
                )}
                {deleteModalStatus && (
                    <ModalDeleteArticle
                        id={selectId as number}
                        isOpen={deleteModalStatus}
                        onClose={handleDeleteModalClose}
                        refetch={refetch}
                    />
                )}
            </ModalPortal>
        </>
    );
};

export default AdminArticleList;
