import AdminUserList from "../admin/AdminUserList";
import Header from "../common/header/Header";
import { useQuery } from "@tanstack/react-query";
import AdminLoading from "../admin/AdminLoading";
import { adminApi, articleApi } from "../api";
import { AdminList } from "../config/types";
import AdminReportList from "../admin/AdminReportList";
import AdminReportCommentList from "../admin/AdminReportCommentList";
import AdminAnal from "../admin/AdminAnal";
import AdminArticleList from "../admin/AdminArticleList";

const getUserData = async (): Promise<AdminList> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const listResponse = await adminApi.userListAll();
    const reportResponse = await adminApi.reportStatusAll();
    const articleResponse = await articleApi.articleList();
    return {
        userList: listResponse.data,
        reportList: reportResponse.data,
        articleList: articleResponse.data,
    };
};

const AdminPage = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["userData"],
        queryFn: getUserData,
    });

    if (isLoading || !data) {
        return <AdminLoading />;
    }

    return (
        <div className="admin-container">
            <Header />
            <div className="flex flex-col items-center font-default">
                <div className="mt-[50px]"></div>
                <AdminAnal userData={data} refetch={refetch} />
                <AdminUserList userData={data} refetch={refetch} />
                <AdminReportList userData={data} refetch={refetch} />
                <AdminReportCommentList userData={data} refetch={refetch} />
                <AdminArticleList userData={data} refetch={refetch} />
            </div>
        </div>
    );
};

export default AdminPage;
