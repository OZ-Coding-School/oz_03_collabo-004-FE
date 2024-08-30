import { useCallback, useEffect, useState } from "react";
import { adminApi } from "../api";
import dayjs from "dayjs";
import { CgArrowsExchange } from "react-icons/cg";
import { twMerge as tw } from "tailwind-merge";
dayjs.locale("ko");
import { FcGoogle } from "react-icons/fc";
import { RiDeleteBin5Fill } from "react-icons/ri";
interface UserList {
    created_at: string;
    email: string;
    hunsoo_level: number;
    id: number;
    is_active: boolean;
    is_superuser: boolean;
    last_login: string;
    selected_tags: number[];
    social_platform: string;
    updated_at: string;
    username: string;
    warning_count: number;
}

const AdminUserList = () => {
    const [userData, setUserData] = useState<null | UserList[]>(null);

    const updateUserData = useCallback(async () => {
        const response = await adminApi.userListAll();
        setUserData(response.data as UserList[]);
    }, []);

    useEffect(() => {
        updateUserData();
    }, [updateUserData]);

    const deleteHandler = async (id: number) => {
        await adminApi.userAccountDelete(id);
        updateUserData();
    };

    const roleHandler = async (id: number, bool: string) => {
        await adminApi.userRoleUpdate(id, bool);
        updateUserData();
    };

    const filteredData = userData?.sort((a, b) => a.id - b.id);

    return (
        <div className="max-w-[1380px] w-full p-4">
            <h1 className="text-xl font-point mb-4">사용자 목록</h1>

            <div className="overflow-x-auto">
                <div className="max-h-[510px] overflow-y-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="sticky top-0 bg-slate-200 ">
                            <tr>
                                <th className=" px-4 py-2">ID</th>
                                <th className=" px-4 py-2">가입 일자</th>
                                <th className=" px-4 py-2">방문 일자</th>
                                <th className=" px-4 py-2">닉네임</th>
                                <th className=" px-4 py-2">이메일</th>
                                <th className=" px-4 py-2">가입 방식</th>
                                <th className=" px-4 py-2">권한 부여</th>
                                <th className=" px-4 py-2">계정 삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData ? (
                                filteredData.map((data) => (
                                    <tr key={data.id}>
                                        <td className="px-4 py-2 text-center">{data.id}</td>
                                        <td className=" px-4 py-2 text-center">
                                            {dayjs(data.created_at).format("YYYY년 MM월 DD일")}
                                        </td>
                                        <td className=" px-4 py-2 text-center">
                                            {dayjs(data.last_login).format("YYYY년 MM월 DD일")}
                                        </td>
                                        <td className=" px-4 py-2 text-center">{data.username}</td>
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
                                                    data.is_superuser && "bg-rose-400 hover:bg-rose-600",
                                                    !data.is_superuser && "bg-indigo-400 hover:bg-indigo-600"
                                                )}
                                            >
                                                {data.is_superuser ? (
                                                    <div
                                                        onClick={() => roleHandler(data.id, "False")}
                                                        className="flex gap-2 items-center justify-center"
                                                    >
                                                        <CgArrowsExchange /> 유저
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => roleHandler(data.id, "True")}
                                                        className="flex gap-2 items-center justify-center"
                                                    >
                                                        <CgArrowsExchange /> 관리자
                                                    </div>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => deleteHandler(data.id)}
                                                className={tw(
                                                    "px-2 rounded-sm text-white w-full bg-slate-400 hover:bg-slate-600 flex justify-center items-center gap-2"
                                                )}
                                            >
                                                <RiDeleteBin5Fill />
                                                <div>삭제</div>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="border px-4 py-2 text-center">
                                        Loading...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUserList;
