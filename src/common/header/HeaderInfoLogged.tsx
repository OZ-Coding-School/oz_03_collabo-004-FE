import { useNavigate } from "react-router-dom";
import ProfileImage from "../profile/ProfileImage";
import { useUserStore } from "../../config/store";
import Button from "../button/Button";
import { accountApi, authApi, notificationApi } from "../../api";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { ModalPortal } from "../../config/ModalPortal";
import ModalEditor from "../modal/ModalEditor";
import { IoNotifications } from "react-icons/io5";
import { PiPencilCircleDuotone } from "react-icons/pi";
import { notification } from "../../config/types";
import dayjs from "dayjs";
import { twMerge as tw } from "tailwind-merge";
import ModalDetail from "../modal/ModalDetail";
import { HiXCircle } from "react-icons/hi";
const HeaderInfoLogged = () => {
    const nav = useNavigate();
    const { user, initUser } = useUserStore();
    const [modalEditorStatus, setModalEditorStatus] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState<number>();
    const [notificationData, setNotificationData] = useState<notification[]>([]);

    const openDetailModal = (article_id: number, notification_id: number) => {
        setSelectedArticleId(article_id);
        setIsDetailModalOpen(true);
        handleNotificationRead(notification_id);
    };
    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const modalEditorStatusClose = () => {
        setModalEditorStatus(false);
    };

    const handleLogout = async () => {
        await authApi.userLogout();
        window.location.reload();
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await accountApi.userInfo();
            initUser(response.data);
        };
        fetchData();
    }, [initUser]);

    useEffect(() => {
        const getNotificationList = async () => {
            try {
                const response = await notificationApi.notificationList();
                console.log(response.data);
                setNotificationData(response.data);
            } catch (error) {
                console.error("알림:", error);
            }
        };
        getNotificationList();
    }, []);

    const handleDeleteNotification = async (notification_id: number) => {
        try {
            await notificationApi.notificationDelete(notification_id);
            setNotificationData((prevData) => prevData?.filter((notifi) => notifi.id !== notification_id));
        } catch (error) {
            console.error("알림 삭제 실패:", error);
        }
    };

    const handleNotificationRead = async (notification_id: number) => {
        try {
            await notificationApi.notificationRead(notification_id);
            setNotificationData((prevData) =>
                prevData.map((notifi) => (notifi.id === notification_id ? { ...notifi, read: true } : notifi))
            );
        } catch (error) {
            console.error("읽음 처리 안됨", error);
        }
    };

    const generateNotificationMessage = (notification: notification) => {
        const { actor_nickname, description, content_type, article_title } = notification;
        const filteredDescription = description.replace(`${actor_nickname}님이`, "");
        if (content_type === "ai_hunsoo") {
            return <>{filteredDescription}</>;
        }
        return (
            <>
                <span className="font-bold">{actor_nickname}</span>님이 {filteredDescription}{" "}
                {article_title && <span> (게시글: {article_title})</span>}
            </>
        );
    };

    return (
        <>
            <div className="flex gap-4">
                <div className="flex justify-center items-center relative group">
                    <IoNotifications
                        className={tw(
                            "text-gray-200 cursor-pointer transition size-6 text-lg",
                            notificationData && notificationData.length > 0 && "text-yellow-500"
                        )}
                    />
                    {notificationData && notificationData.length > 0 && (
                        <div className="absolute top-0 right-0 text-xs size-4 text-white font-normal bg-red-500 translate-x-[20%] px-[2px] rounded-full flex justify-center items-center">
                            {notificationData && notificationData.length}
                        </div>
                    )}

                    <div
                        className="min-w-80 max-h-80 overflow-y-auto absolute top-12 right-0 text-sm text-literal-normal font-normal bg-white p-1 rounded-xl shadow-lg
                       invisible group-hover:visible opacity-0 group-hover:opacity-100 duration-300 translate-x-[10%]"
                    >
                        <div className="w-full h-full px-1 py-2 flex flex-col gap-2">
                            {notificationData && notificationData.length > 0 ? (
                                notificationData.map((notifi) => (
                                    <div
                                        onClick={() => openDetailModal(notifi.article_id, notifi.id)}
                                        key={notifi.id}
                                        className={tw(
                                            "w-full px-2 py-3 bg-white border relative border-gray-100 shadow-sm duration-200 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:shadow-md",
                                            notifi.read && "bg-gray-100"
                                        )}
                                    >
                                        <HiXCircle
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteNotification(notifi.id);
                                            }}
                                            className="absolute top-0 right-0 size-5 translate-x-[20%] translate-y-[-10%] text-gray-600 duration-150 hover:text-literal-info"
                                        />
                                        {generateNotificationMessage(notifi)}
                                        <p className="text-xs font-normal text-gray-500 mt-2">
                                            {dayjs(notifi.timestamp).format("MM월 DD일")}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-literal-normal text-center">새로운 알림이 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => setModalEditorStatus(true)}
                    color="confirm"
                    className="px-2 py-0 flex gap-1 justify-center items-center"
                >
                    <PiPencilCircleDuotone className="size-5" /> <div className="text-sm font-normal">새 포스트</div>
                </Button>
                <div className="flex justify-center items-center relative">
                    <div className="w-[36px] h-[36px] cursor-pointer relative group">
                        <ProfileImage src={user.profile_image} />
                        <div
                            className="min-w-32 h-auto absolute top-12 right-0 text-sm text-literal-normal font-normal bg-white p-1 rounded-xl shadow-lg
                         invisible group-hover:visible opacity-0 group-hover:opacity-100 duration-300 translate-x-[10%]"
                        >
                            <div className="w-full h-full px-1 py-2 flex flex-col gap-2">
                                <div
                                    onClick={() => nav("/my")}
                                    className="font-normal px-1 py-1 flex gap-2 items-center text-gray-400 duration-200 hover:text-gray-700"
                                >
                                    <CgProfile className="size-4" /> 마이페이지
                                </div>
                                <Button onClick={handleLogout} color="danger" className="px-2 py-1 text-sm font-normal">
                                    로그아웃
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalPortal>
                {modalEditorStatus && (
                    <ModalEditor parent="home-parent" onClose={modalEditorStatusClose} isOpen={modalEditorStatus} />
                )}
                {isDetailModalOpen && selectedArticleId && (
                    <ModalDetail
                        isOpen={isDetailModalOpen}
                        parent="home-parent"
                        onClose={closeDetailModal}
                        articleId={selectedArticleId}
                    />
                )}
            </ModalPortal>
        </>
    );
};

export default HeaderInfoLogged;
