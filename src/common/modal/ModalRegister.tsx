import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import BadgeDesc from "../badge/BadgeDesc";
import { IoClose } from "react-icons/io5";
import ButtonRegister from "../button/ButtonRegister";
import { ModalProps } from "../../config/types";
import { useNavigate } from "react-router-dom";
import { accountApi, authApi } from "../../api";
import { useGoogleLogin } from "@react-oauth/google";
import { useUserStore } from "../../config/store";

const ModalRegister = ({ onClose, isOpen, parent }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const nav = useNavigate();
    const { initUser } = useUserStore();
    useEffect(() => {
        const parentElement = document.querySelector("." + parent);
        const headerElement = document.querySelector(".header");

        let scrollY = 0;

        if (isOpen) {
            //? 현재 스크롤 위치 저장
            scrollY = window.scrollY;

            //? 스크롤을 0으로 설정 (모달이 열릴 때)
            window.scrollTo(0, 0);

            //? 스크롤을 고정하고 화면을 고정
            document.body.style.overflowY = "hidden";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";

            //? 부모 및 헤더에 blur 효과 추가
            parentElement?.classList.add("blur-[2px]");
            headerElement?.classList.add("blur-[2px]");
        }

        return () => {
            //? 모달이 닫힐 때 블러 제거
            parentElement?.classList.remove("blur-[2px]");
            headerElement?.classList.remove("blur-[2px]");

            //? 저장된 스크롤 위치로 복원
            const storedScrollY = parseInt(document.body.style.top || "0") * -1;

            //? 스크롤 및 위치 복원
            document.body.style.overflowY = "scroll";
            document.body.style.top = "";
            document.body.style.width = "";

            //? 저장된 스크롤 위치로 이동
            window.scrollTo(0, storedScrollY);
        };
    }, [isOpen, parent]);

    const googleLoginRequest = async (token: string) => {
        try {
            await authApi.userGoogleAccessTokenReceiver(token);
            const accountResponse = await accountApi.userInfo();
            initUser(accountResponse.data);
            nav("/");
            onClose();
        } catch (error) {
            console.error("login failed", error);
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

    const normalRegisterHandler = () => {
        nav("/register");
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed flex justify-center items-center inset-0 bg-black w-full h-full"
            ></motion.nav>
            <div
                onClick={onClose}
                className="text-literal-normal font-default inset-0 z-40 fixed flex items-center justify-center"
            >
                <motion.nav
                    tabIndex={-1}
                    ref={modalRef}
                    onKeyDown={(e) => e.key === "Escape" && onClose()}
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full h-full md:w-[570px] md:h-[584px] md:rounded-3xl bg-white relative flex justify-center items-center"
                >
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full font-bold text-lg font-point text-center md:pt-10">훈수왕 가입</div>
                        <div className="w-full text-center mt-5 text-gray-400">
                            훈수왕은 유머와 창의성으로 가득 찬 전문가들이 모여
                        </div>
                        <div className="w-full text-center text-gray-400">조언과 피드백을 나누는 공간입니다.</div>
                        <div className="mt-10">
                            <BadgeDesc />
                        </div>
                        <div className="flex flex-col justify-center items-center mt-16 gap-[13px]">
                            <ButtonRegister onClick={googleLoginHandler} type="social" />
                            <ButtonRegister onClick={normalRegisterHandler} type="normal" />
                        </div>
                    </div>
                    <IoClose
                        onClick={onClose}
                        title="닫기"
                        className="absolute text-gray-400 hover:text-gray-800 transition cursor-pointer w-[28px] h-[28px] top-2 right-2"
                    />
                </motion.nav>
            </div>
        </>
    );
};

export default ModalRegister;
