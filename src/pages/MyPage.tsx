import { useEffect, useState } from "react";
import InfoMyPageLeft from "../common/info/InfoMyPageLeft";
import InfoMyPageRight from "../common/info/InfoMyPageRight";
import { ModalPortal } from "../config/ModalPortal";
import ModalDetail from "../common/modal/ModalDetail";
import useUser from "../hooks/useUser";
import { accountApi } from "../api";
import Header from "../common/header/Header";
import { useUserStore } from "../config/store";
import TabItem from "../common/tab/TabItem";
import { useParams } from "react-router-dom";

const MyPage = () => {
    const [isUserMypage, setIsUserMypage] = useState<boolean>(true); //마이페이지에 들어온 유저가 본인인지 아닌지 확인할거
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const { getUserInfo } = useUser();
    const { user } = useUserStore();
    const { userId } = useParams(); // 유저 클릭해서 마이페이지 보는 경우 볼려는 유저의 아이디

    //! -> 다른 사용자 클릭하면 사용자 아이디랑 자기 아이디를 같이 백엔드에 보내서 거기서 true/false로 판단하는 값 + 클릭한 아이디의 마이페이지 정보 보내주기..?
    // 다른 유저 마이페이지 조회하기
    useEffect(() => {
        const getDataUserProfile = async () => {
            if (!userId) return;
            try {
                // const response = await accountApi.userInfo();
                const response = await accountApi.userInfoPublic(parseInt(userId));
                console.log(response.data);
            } catch (error) {
                console.error("Error: ", error);
            }
        };
        getDataUserProfile();
    }, [userId]);
    console.log(user.comments);

    //새로고침해도 store에 있는 user 유지되도록
    useEffect(() => {
        const refreshUserInfo = async () => {
            await getUserInfo();
            setIsUserMypage(user.status);
        };
        refreshUserInfo();
    }, [getUserInfo, user.status]);

    //모달관련
    const openDetailModal = () => {
        setIsDetailModalOpen(true);
    };
    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    return (
        <>
            <Header />
            <div className="max-w-[1280px] mx-auto py-10 px-3 detail-parent">
                <div className="flex flex-col gap-3 md:flex-row md:justify-evenly">
                    <div className="md:mr-3 md:w-[387px]">
                        <InfoMyPageLeft isUserMypage={isUserMypage} />
                        <button onClick={openDetailModal}>모달테스트</button>
                    </div>
                    <div className="flex flex-col w-full md:w-[780px]">
                        <InfoMyPageRight isUserMypage={isUserMypage} />
                        <TabItem />
                    </div>
                </div>
                <ModalPortal>
                    {isDetailModalOpen && (
                        <ModalDetail isOpen={isDetailModalOpen} parent="detail-parent" onClose={closeDetailModal} />
                    )}
                </ModalPortal>
            </div>
        </>
    );
};

export default MyPage;
