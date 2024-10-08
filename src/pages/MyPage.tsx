import { useEffect, useState } from "react";
import InfoMyPageLeft from "../common/info/InfoMyPageLeft";
import InfoMyPageRight from "../common/info/InfoMyPageRight";
import { accountApi } from "../api";
import Header from "../common/header/Header";
import { useUserStore } from "../config/store";
import TabItem from "../common/tab/TabItem";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

const MyPage = () => {
    const [isUserMypage, setIsUserMypage] = useState<boolean>(false);
    const { user, updateUser, initOtherUser } = useUserStore();
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getDataUserProfile = async () => {
            if (!userId) return;
            try {
                const response = await accountApi.userInfoPublic(Number(userId));

                if (response.data.status) {
                    updateUser(response.data);
                    setIsUserMypage(response.data.status);
                } else {
                    initOtherUser(response.data);
                    setIsUserMypage(response.data.status);
                }
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    console.error("실패: ", error);
                    if (error.response.status === 404) {
                        alert("해당 유저가 없습니다.");
                        navigate("/");
                    } else {
                        alert("문제가 발생했습니다.");
                        navigate("/");
                    }
                }
            }
        };
        getDataUserProfile();
    }, [userId, navigate, updateUser, initOtherUser]);

    useEffect(() => {
        if (!userId) {
            setIsUserMypage(user.status);
        }
    }, [userId, user.status]);

    return (
        <>
            <div className="min-h-screen home-parent dark:bg-gray-900">
                <Header />
                <div className="max-w-[1280px] mx-auto py-10 px-3 detail-parent ">
                    <div className="flex flex-col gap-3 md:flex-row md:justify-evenly">
                        <div className="md:mr-3 md:w-[387px] mt-7">
                            <InfoMyPageLeft isUserMypage={isUserMypage} />
                        </div>
                        <div className="flex flex-col w-full md:w-[780px]">
                            <InfoMyPageRight isUserMypage={isUserMypage} />
                            <TabItem isUserMypage={isUserMypage} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPage;
