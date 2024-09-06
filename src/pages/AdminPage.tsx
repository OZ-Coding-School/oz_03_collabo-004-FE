import AdminUserList from "../admin/AdminUserList";
import Header from "../common/header/Header";

const AdminPage = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center">
                <div className="mt-[50px]"></div>
                <AdminUserList />
            </div>
        </>
    );
};

export default AdminPage;
