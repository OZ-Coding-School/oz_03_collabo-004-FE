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

const MyPage = () => {
    const [isUserMypage, setIsUserMypage] = useState<boolean>(true); //마이페이지에 들어온 유저가 본인인지 아닌지 확인할거
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const { getUserInfo } = useUser();
    const { user } = useUserStore();

    //! -> 다른 사용자 클릭하면 사용자 아이디랑 자기 아이디를 같이 백엔드에 보내서 거기서 true/false로 판단하는 값 + 클릭한 아이디의 마이페이지 정보 보내주기..?
    //나중에 지울것 잠깐 콘솔만 보느라..
    useEffect(() => {
        const getDataUserProfile = async () => {
            try {
                const response = await accountApi.userInfo();
                console.log(response.data);
            } catch (error) {
                console.error("Error: ", error);
            }
        };
        getDataUserProfile();
    }, []);
    console.log(user);

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
