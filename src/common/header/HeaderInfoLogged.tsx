import { useLocation, useNavigate } from "react-router-dom";
import ProfileImage from "../profile/ProfileImage";
import { useLikeStore, useUserStore } from "../../config/store";
import Button from "../button/Button";
import { accountApi, articleApi, authApi, notificationApi } from "../../api";
import { useCallback, useEffect, useState } from "react";
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
import { MdAdminPanelSettings } from "react-icons/md";
import { calculateUserLevel } from "../../util/experience";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminNotificationList } from "../../api/notification";
import { AiFillAlert } from "react-icons/ai";

const getAdminNotificationList = async (): Promise<notification[] | null> => {
    if (location.pathname === "/admin") {
        try {
            const response = await adminNotificationList();
            return response.data;
        } catch (error) {
            console.error("알림 :", error);
            return null;
        }
    } else {
        return null;
    }
};

const getNotificationList = async (): Promise<notification[] | null> => {
    try {
        const response = await notificationApi.notificationList();

        return response.data;
    } catch (error) {
        console.error("알림:", error);
        return null;
    }
};

const HeaderInfoLogged = () => {
    const nav = useNavigate();
    const { user, updateUser } = useUserStore();
    const [modalEditorStatus, setModalEditorStatus] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState<number>();
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const queryClient = useQueryClient();
    const { initLike } = useLikeStore();

    const openDetailModal = (article_id: number, notification_id: number) => {
        setSelectedArticleId(article_id);

        setIsDetailModalOpen(true);
        if (location.pathname === "/admin") {
            return adminReadNotificationMutation.mutate(notification_id);
        }
        readNotificationMutation.mutate(notification_id);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const editModalNewHandler = () => {
        nav(`?editor=new`);
    };
    const editModalSelectHandler = (id: string) => {
        nav(`?editor=${id}`);
    };

    const modalEditorStatusClose = () => {
        setModalEditorStatus(false);
    };

    const handleLogout = async () => {
        await authApi.userLogout();
        const likeResponse = await articleApi.likeList();
        initLike(likeResponse.data);
        window.location.reload();
    };

    const userLevelCalculate = useCallback(async () => {
        const result = await calculateUserLevel(user.hunsoo_level, user.user_id, user.selected_comment_count);

        const userResponse = await accountApi.userInfo();
        updateUser(userResponse.data);
        updateUser({ exp: result.experience });
    }, [updateUser, user.hunsoo_level, user.selected_comment_count, user.user_id]);

    useEffect(() => {
        const fetchData = async () => {
            const roleResponse = await authApi.userRoleStatus();
            await userLevelCalculate();
            setIsAdmin(roleResponse.data.status);
        };
        fetchData();
    }, [updateUser, userLevelCalculate]);

    //? admin Notification

    const { data: adminNotificationData } = useQuery({
        queryKey: ["adminNotifications"],
        queryFn: getAdminNotificationList,
        refetchInterval: 30000,
    });

    const adminDeleteNotificationMutation = useMutation({
        mutationFn: (notificationId: number) => notificationApi.adminNotificationDelete(notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
        },
        onError: (error) => {
            console.error("알림 삭제 실패:", error);
        },
    });

    const adminReadNotificationMutation = useMutation({
        mutationFn: (notificationId: number) => notificationApi.adminNotificationRead(notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
        },
        onError: (error) => {
            console.error("알림 읽기 실패:", error);
        },
    });

    //? user Notification
    const { data: notificationData } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotificationList,
        refetchInterval: 30000,
        refetchIntervalInBackground: false,
    });

    const deleteNotificationMutation = useMutation({
        mutationFn: (notificationId: number) => notificationApi.notificationDelete(notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            console.error("알림 삭제 실패:", error);
        },
    });

    const readNotificationMutation = useMutation({
        mutationFn: (notificationId: number) => notificationApi.notificationRead(notificationId),
        onSuccess: (_, notificationId) => {
            queryClient.setQueryData<notification[]>(["notifications"], (oldData) =>
                oldData?.map((notifi) => (notifi.id === notificationId ? { ...notifi, read: true } : notifi))
            );
        },
        onError: (error) => {
            console.error("읽음 처리 안됨", error);
        },
    });

    const generateNotificationMessage = (notification: notification) => {
        const { actor_nickname, description, article_title, verb } = notification;
        if (verb === "ai_response" || verb === "report") {
            return <>{description}</>;
        }
        if (verb === "select") {
            return (
                <>
                    {description} <br /> {article_title && <span> (게시글: {article_title})</span>}
                </>
            );
        }
        return (
            <>
                <span className="font-bold">{actor_nickname}</span>
                {description} <br />
                {article_title && <span> (게시글: {article_title})</span>}
            </>
        );
    };

    return (
        <>
            <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center relative group">
                    {location.pathname === "/admin" ? (
                        <>
                            <AiFillAlert
                                className={tw(
                                    "text-gray-200 mb-1 cursor-pointer transition size-6 text-lg",
                                    adminNotificationData &&
                                        adminNotificationData.filter((notifi) => !notifi.read).length > 0 &&
                                        "text-indigo-500 animate-ring"
                                )}
                            />
                            {adminNotificationData &&
                                adminNotificationData.filter((notifi) => !notifi.read).length > 0 && (
                                    <div className="absolute top-0 right-0 text-xs size-4 text-white font-normal bg-red-500 translate-x-[20%] px-[2px] rounded-full flex justify-center items-center">
                                        {adminNotificationData.filter((notifi) => !notifi.read).length}
                                    </div>
                                )}
                        </>
                    ) : (
                        <>
                            <IoNotifications
                                className={tw(
                                    "text-gray-200 cursor-pointer transition size-6 text-lg",
                                    notificationData &&
                                        notificationData.filter((notifi) => !notifi.read).length > 0 &&
                                        "text-yellow-500 animate-ring"
                                )}
                            />
                            {notificationData && notificationData.filter((notifi) => !notifi.read).length > 0 && (
                                <div className="absolute top-0 right-0 text-xs size-4 text-white font-normal bg-red-500 translate-x-[20%] px-[2px] rounded-full flex justify-center items-center">
                                    {notificationData.filter((notifi) => !notifi.read).length}
                                </div>
                            )}
                        </>
                    )}

                    <div
                        className="min-w-80 max-h-80 overflow-y-auto absolute top-12 right-0 text-sm text-literal-normal font-normal bg-white p-1 rounded-xl shadow-lg
                        invisible group-hover:visible opacity-0 group-hover:opacity-100 duration-300 translate-x-[10%]"
                    >
                        <div className="w-full h-full px-1 py-1 flex flex-col gap-2">
                            {location.pathname === "/admin" ? (
                                <div className="flex flex-col gap-2">
                                    {adminNotificationData && adminNotificationData.length > 0 ? (
                                        adminNotificationData.map((notifi) => (
                                            <div
                                                key={notifi.id}
                                                className={tw(
                                                    "w-full px-2 py-3 bg-white border relative border-gray-100 shadow-sm duration-200 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:shadow-md",
                                                    notifi.read && "bg-gray-100"
                                                )}
                                            >
                                                <HiXCircle
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        adminDeleteNotificationMutation.mutate(notifi.id);
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
                            ) : (
                                <>
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
                                                        deleteNotificationMutation.mutate(notifi.id);
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {location.pathname === "/" && (
                    <Button
                        color="confirm"
                        onClick={editModalNewHandler}
                        className="px-2 py-1 flex gap-1 justify-center items-center"
                    >
                        <PiPencilCircleDuotone className="size-5" />
                        <div className="text-sm font-normal hidden xl:block">훈수 요청</div>
                    </Button>
                )}
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
                                {isAdmin ? (
                                    <div
                                        onClick={() => nav("/admin")}
                                        className="font-normal px-1 py-1 flex gap-2 items-center text-gray-400 duration-200 hover:text-gray-700"
                                    >
                                        <MdAdminPanelSettings className="size-4" /> Admin
                                    </div>
                                ) : null}

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
                        onSelect={editModalSelectHandler}
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
