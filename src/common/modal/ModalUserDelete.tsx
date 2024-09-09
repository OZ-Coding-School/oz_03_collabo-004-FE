import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import Button from "../button/Button";
import { authApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { IoWarning } from "react-icons/io5";

interface ModalUserDeleteProps {
    onClose: () => void;
    isOpen: boolean;
    parent: string;
}

const ModalUserDelete = ({ onClose, isOpen, parent }: ModalUserDeleteProps) => {
    const modalRef = useRef<HTMLTextAreaElement>(null);
    const [isAlert, setIsAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState<null | string>(null);
    useEffect(() => {
        if (isOpen) {
            modalRef.current?.focus();
        }
    }, [isOpen]);

    const handleClose = async () => {
        onClose();
    };

    const navigate = useNavigate();

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

    const handleUserAccountDelete = async () => {
        try {
            await authApi.deleteAccount();
            navigate("/");
        } catch (error) {
            console.error("회원 탈퇴 실패:", error);
            alertHandler("문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const alertHandler = (text: string) => {
        setIsAlert(true);
        setAlertMsg(text);
    };

    useEffect(() => {
        if (isAlert) {
            const timer = setTimeout(() => {
                setIsAlert(false);
                setAlertMsg(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isAlert]);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed flex justify-center items-center inset-0 z-50 bg-black w-full h-full"
            ></motion.nav>
            <div
                onClick={onClose}
                className="text-literal-normal inset-0 font-default z-[60] fixed flex items-center justify-center"
            >
                <motion.nav
                    tabIndex={-1}
                    ref={modalRef}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") onClose();
                    }}
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="dark:bg-gray-900 outline-none w-full h-full md:w-[570px] md:h-[240px] md:rounded-3xl bg-white relative flex justify-center items-center"
                >
                    <div className="px-12 md:px-[110px] flex flex-col w-full h-full justify-center items-center">
                        <div className="w-full font-bold text-lg font-point text-center dark:text-gray-100">
                            회원 탈퇴
                        </div>
                        <div className="text-literal-error mt-5 w-full text-center font-semibold">
                            정말 탈퇴 하시겠습니까?
                        </div>
                        <div className="w-full flex gap-5 mt-10">
                            <Button onClick={handleUserAccountDelete} color="danger" className="w-full">
                                탈퇴
                            </Button>
                            <Button onClick={handleClose} className="w-full">
                                취소
                            </Button>
                        </div>
                    </div>

                    <IoClose
                        onClick={onClose}
                        title="닫기"
                        className="absolute text-gray-400 dark:hover:text-gray-100 hover:text-gray-800 transition cursor-pointer w-[28px] h-[28px] top-2 right-2"
                    />
                </motion.nav>
                <AnimatePresence>
                    {isAlert && (
                        <motion.div
                            initial={{ translateY: -100 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: -100 }}
                            transition={{ type: "spring", duration: 1 }}
                            className="fixed flex items-center gap-2 p-2 bg-orange-600 bg-opacity-75 rounded-lg top-14 text-background"
                        >
                            <IoWarning />
                            <div>{alertMsg}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default ModalUserDelete;
