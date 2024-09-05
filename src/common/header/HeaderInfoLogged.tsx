import { useNavigate } from "react-router-dom";
import ProfileImage from "../profile/ProfileImage";
import { useUserStore } from "../../config/store";
import Button from "../button/Button";
import { accountApi, authApi } from "../../api";
import { useEffect, useState } from "react";
import { IoPencil } from "react-icons/io5";
import { ModalPortal } from "../../config/ModalPortal";
import ModalEditor from "../modal/ModalEditor";
import { HiMiniBellAlert } from "react-icons/hi2";
const HeaderInfoLogged = () => {
    const nav = useNavigate();
    const { user, initUser } = useUserStore();
    const [modalEditorStatus, setModalEditorStatus] = useState(false);

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

    return (
        <>
            <div className="flex justify-center items-center relative">
                <div onClick={() => nav("/my")} className="w-[36px] h-[36px] cursor-pointer">
                    <ProfileImage src={user.profile_image} />
                </div>
            </div>
            <div className="flex gap-2">
                <div className="flex mr-2 justify-center items-center">
                    <HiMiniBellAlert className="text-yellow-200 cursor-pointer transition hover:text-yellow-400 text-lg" />
                </div>
                <Button
                    onClick={() => setModalEditorStatus(true)}
                    color="confirm"
                    className="py-1 flex gap-2 justify-center items-center"
                >
                    <div>새 포스트</div> <IoPencil />
                </Button>
                <Button onClick={handleLogout} color="danger" className="py-1">
                    로그아웃
                </Button>
            </div>
            <ModalPortal>
                {modalEditorStatus && (
                    <ModalEditor parent="home-parent" onClose={modalEditorStatusClose} isOpen={modalEditorStatus} />
                )}
            </ModalPortal>
        </>
    );
};

export default HeaderInfoLogged;
