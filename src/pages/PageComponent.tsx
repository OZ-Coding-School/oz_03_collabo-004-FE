import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import TagSkill from "../common/tag/TagSkill";
import InfoMyPageLeft from "../common/info/InfoMyPageLeft";
import InfoMyPageRight from "../common/info/InfoMyPageRight";
import Button from "../common/button/Button";
import ButtonLogin from "../common/button/ButtonLogin";
import Badge from "../common/badge/Badge";
import BadgeTopic from "../common/badge/BadgeTopic";
import ProfileImage from "../common/profile/ProfileImage";
import ProfileStatus from "../common/profile/ProfileStatus";
import Header from "../common/header/Header";
import Toast from "../common/toast/Toast";
import ContentMyPage from "../common/content/ContentMyPage";
import { DUMMY_TAGS } from "../config/const";
import Skeleton from "../common/skeleton/Skeleton";
import SkeletonContent from "../common/skeleton/SkeletonContent";
import SkeletonTrendingContent from "../common/skeleton/SkeletonTrendingContent";
import SkeletonTrendingComment from "../common/skeleton/SkeletonTrendingComment";
import ModalPicture from "../common/modal/ModalPicture";
import ModalRegister from "../common/modal/ModalRegister";
import ModalLogin from "../common/modal/ModalLogin";
import ModalReport from "../common/modal/ModalReport";
import ModalDelete from "../common/modal/ModalDelete";
import { ModalPortal } from "../config/modalPortal";
import { useToastStore } from "../config/store";
import { useGoogleLogin } from "@react-oauth/google";
import { authApi } from "../api";

const PageComponent = () => {
    const [modalStates, setModalStates] = useState({
        picture: false,
        register: false,
        login: false,
        report: false,
        deleted: false,
    });

    const { toast, setToast } = useToastStore();

    const modalHandler = (modalType: string, isOpen: boolean) => {
        setModalStates((prevState) => ({ ...prevState, [modalType]: isOpen }));
    };

    const toastHandler = () => {
        setToast(true, "으아아아아아아악");
    };

    const googleLoginRequest = async (token: string) => {
        console.log(token);
        try {
            const result = await authApi.userGoogleAccessTokenReceiver(token);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    const googleLoginHandler = useGoogleLogin({
        onSuccess: (res) => {
            googleLoginRequest(res.access_token);
        },

        onError: () => {
            console.error("Unexpected Login Request Error");
        },
    });

    return (
        <div className="test-parent">
            <Header />
            <div className="pt-[100px] select-none font-default bg-background w-full h-full p-10">
                <Link
                    to="/"
                    className="font-point text-lg p-2 rounded-md bg-primary-background-second hover:bg-primary-background transition text-white"
                >
                    돌아가기
                </Link>

                <section className="mt-4">
                    <h2 className="text-2xl">Buttons</h2>
                    <div className="mt-4 flex gap-2">
                        <Button>Continue</Button>
                        <Button color="danger">Danger</Button>
                        <Button color="info">Info</Button>
                        <Button color="confirm">Confirm</Button>
                        <Button color="primary">Primary</Button>
                        <Button onClick={toastHandler}>Toast Test</Button>
                    </div>
                    <div className="mt-4 flex gap-2">
                        {Object.keys(modalStates).map((modalType) => (
                            <Button key={modalType} onClick={() => modalHandler(modalType, true)}>
                                {modalType.charAt(0).toUpperCase() + modalType.slice(1)} 모달
                            </Button>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <ButtonLogin type="normal" />
                        <ButtonLogin onClick={googleLoginHandler} type="social" />
                    </div>
                </section>

                <section className="mt-4">
                    <h2 className="text-2xl">Badges</h2>
                    <div className="mt-4 flex gap-2">
                        <Badge>댓글</Badge>
                        <Badge>싫어요</Badge>
                        <Badge>조회수</Badge>
                        <Badge>좋아요</Badge>
                    </div>
                    <div className="mt-4 flex gap-2">
                        {["연애", "상상", "게임", "고민", "집안일", "패션", "교육", "소소"].map((tag) => (
                            <Badge key={tag} color="yellow">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="mt-4 flex">
                        <BadgeTopic />
                    </div>
                </section>

                <section className="mt-4 flex gap-4">
                    <div className="w-[50px] h-[50px]">
                        <ProfileImage />
                    </div>
                    <ProfileStatus />
                </section>

                <section className="mt-4 flex flex-col gap-4">
                    <div className="bg-white p-2 m-2 flex flex-wrap gap-2">
                        {DUMMY_TAGS.map((tag) => (
                            <TagSkill key={tag.id} tagIcon={tag.icon} tagText={tag.text} />
                        ))}
                    </div>
                    <ContentMyPage />
                    <div className="flex flex-col gap-1">
                        {["xs", "s", "m", "l", "xl", "2xl", "3xl"].map((size) => (
                            <Skeleton key={size} size={size as "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl"} />
                        ))}
                    </div>
                    <div>
                        <p className="text-xl mb-2">Skeleton Content 타입 1</p>
                        <SkeletonContent type="1" />
                    </div>
                    <div>
                        <p className="text-xl mb-2">Skeleton Content 타입 2</p>
                        <SkeletonContent type="2" />
                    </div>
                    <SkeletonTrendingContent />
                    <SkeletonTrendingComment />
                    <InfoMyPageLeft />
                    <InfoMyPageRight />
                </section>

                <ModalPortal>
                    <AnimatePresence>
                        {toast.status && <Toast />}
                        {modalStates.picture && (
                            <ModalPicture
                                parent="test-parent"
                                isOpen={modalStates.picture}
                                onClose={() => modalHandler("picture", false)}
                            />
                        )}
                        {modalStates.register && (
                            <ModalRegister
                                parent="test-parent"
                                isOpen={modalStates.register}
                                onClose={() => modalHandler("register", false)}
                            />
                        )}
                        {modalStates.login && (
                            <ModalLogin
                                parent="test-parent"
                                isOpen={modalStates.login}
                                onClose={() => modalHandler("login", false)}
                            />
                        )}
                        {modalStates.report && (
                            <ModalReport
                                parent="test-parent"
                                isOpen={modalStates.report}
                                onClose={() => modalHandler("report", false)}
                            />
                        )}
                        {modalStates.deleted && (
                            <ModalDelete
                                parent="test-parent"
                                isOpen={modalStates.deleted}
                                onClose={() => modalHandler("deleted", false)}
                            />
                        )}
                    </AnimatePresence>
                </ModalPortal>
            </div>
        </div>
    );
};

export default PageComponent;
