import dayjs from "dayjs";
import { CgArrowsExchange } from "react-icons/cg";
import { twMerge as tw } from "tailwind-merge";
dayjs.locale("ko");
import { FcGoogle } from "react-icons/fc";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AdminList } from "../config/types";
import { ModalPortal } from "../config/ModalPortal";
import ModalRoleSetting from "./modal/ModalRoleSetting";
import { useState } from "react";
import ModalDeleteAccount from "./modal/ModalDeleteAccount";

interface AdminUserListProps {
    userData: AdminList;
    refetch: () => void;
}

const AdminUserList = ({ userData, refetch }: AdminUserListProps) => {
    const [roleModalStatus, setRoleModalStatus] = useState(false);
    const [deleteModalStatus, setDeleteModalStatus] = useState(false);
    const [selectRole, setSelectRole] = useState<string | null>(null);
    const [selectId, setSelectId] = useState<number | null>(null);

    const handleDeleteModalOpen = (id: number) => {
        setSelectId(id);
        setDeleteModalStatus(true);
    };
    const handleDeleteModalClose = () => {
        setSelectId(null);
        setDeleteModalStatus(false);
    };

    const handleRoleChangeModalOpen = (id: number, bool: string) => {
        setSelectRole(bool);
        setSelectId(id);
        setRoleModalStatus(true);
    };

    const handleRoleChangeModalClose = () => {
        setRoleModalStatus(false);
        setSelectRole(null);
        setSelectId(null);
    };

    const filteredData = userData.userList.sort((a, b) => a.id - b.id);

    return (
        <>
            <div className=" max-w-[1580px] w-full p-4">
                <h1 className="text-xl font-point mb-4">사용자 목록</h1>

                <div className="overflow-x-auto">
                    <div className="max-h-[510px] overflow-y-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="sticky top-0 bg-stone-200 ">
                                <tr>
                                    <th className=" px-4 py-2">ID</th>
                                    <th className=" px-4 py-2">가입 일자</th>
                                    <th className=" px-4 py-2">방문 일자</th>
                                    <th className=" px-4 py-2">닉네임</th>
                                    <th className=" px-4 py-2">경고 횟수</th>
                                    <th className=" px-4 py-2">이메일</th>
                                    <th className=" px-4 py-2">가입 방식</th>
                                    <th className=" px-4 py-2">권한 부여</th>
                                    <th className=" px-4 py-2">계정 삭제</th>
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
                                        <td className="text-center">No Content</td>
                                        <td className="text-center">No Content</td>
                                        <td className="text-center">No Content</td>
                                        <td className="text-center">No Content</td>
                                    </tr>
                                )}
                                {filteredData.map((data) => (
                                    <tr key={data.id}>
                                        <td className="px-4 py-2 text-center">{data.id}</td>
                                        <td className=" px-4 py-2 text-center">
                                            {dayjs(data.created_at).format("YYYY년 MM월 DD일")}
                                        </td>
                                        <td className=" px-4 py-2 text-center">
                                            {dayjs(data.last_login).format("YYYY년 MM월 DD일") === "Invalid Date"
                                                ? "방문기록 없음"
                                                : dayjs(data.last_login).format("YYYY년 MM월 DD일")}
                                        </td>
                                        <td className=" px-4 py-2 text-center">{data.nickname}</td>
                                        <td className=" px-4 py-2 text-center text-rose-400">{data.warning_count}</td>
                                        <td className=" px-4 py-2 text-center">{data.email}</td>
                                        <td className=" px-4 py-2 flex justify-center items-center">
                                            {data.social_platform === "general" ? (
                                                <img src="/favicon/favicon-32x32.png"></img>
                                            ) : (
                                                <FcGoogle className="w-8 h-8" />
                                            )}
                                        </td>
                                        <td className=" px-4 py-2 text-center">
                                            <button
                                                className={tw(
                                                    "px-2 rounded-sm text-white w-full",
                                                    data.is_superuser && "bg-stone-500 hover:bg-stone-400",
                                                    !data.is_superuser && "bg-stone-500 hover:bg-stone-400"
                                                )}
                                            >
                                                {data.is_superuser ? (
                                                    <div
                                                        onClick={() => handleRoleChangeModalOpen(data.id, "False")}
                                                        className="flex gap-2 items-center justify-center"
                                                    >
                                                        <CgArrowsExchange /> 강등
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => handleRoleChangeModalOpen(data.id, "True")}
                                                        className="flex gap-2 items-center justify-center"
                                                    >
                                                        <CgArrowsExchange /> 상향
                                                    </div>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleDeleteModalOpen(data.id)}
                                                className={tw(
                                                    "px-2 rounded-sm text-white w-full bg-stone-500 hover:bg-stone-400 flex justify-center items-center gap-2"
                                                )}
                                            >
                                                <RiDeleteBin5Fill />
                                                <div>삭제</div>
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
                {roleModalStatus && (
                    <ModalRoleSetting
                        parent={"admin-container"}
                        role={selectRole as string}
                        id={selectId as number}
                        isOpen={roleModalStatus}
                        onClose={handleRoleChangeModalClose}
                        refetch={refetch}
                    />
                )}
                {deleteModalStatus && (
                    <ModalDeleteAccount
                        parent={"admin-container"}
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

export default AdminUserList;
