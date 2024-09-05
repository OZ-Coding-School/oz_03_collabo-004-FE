import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ModalPictureProps {
    onClose: () => void;
    imageUrl: string;
    isOpen: boolean;
}

const ModalPicture = ({ onClose, isOpen, imageUrl }: ModalPictureProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.focus();
        }
    }, [isOpen]);

    // useEffect(() => {
    //     const parentElement = document.querySelector("." + parent);
    //     const headerElement = document.querySelector(".header");

    //     let scrollY = 0;

    //     if (isOpen) {
    //         //? 현재 스크롤 위치 저장
    //         scrollY = window.scrollY;

    //         //? 스크롤을 0으로 설정 (모달이 열릴 때)
    //         window.scrollTo(0, 0);

    //         //? 스크롤을 고정하고 화면을 고정
    //         document.body.style.overflowY = "hidden";
    //         document.body.style.top = `-${scrollY}px`;
    //         document.body.style.width = "100%";

    //         //? 부모 및 헤더에 blur 효과 추가
    //         parentElement?.classList.add("blur-[2px]");
    //         headerElement?.classList.add("blur-[2px]");
    //     }

    //     return () => {
    //         //? 모달이 닫힐 때 블러 제거
    //         parentElement?.classList.remove("blur-[2px]");
    //         headerElement?.classList.remove("blur-[2px]");

    //         //? 저장된 스크롤 위치로 복원
    //         const storedScrollY = parseInt(document.body.style.top || "0") * -1;

    //         //? 스크롤 및 위치 복원
    //         document.body.style.overflowY = "scroll";
    //         document.body.style.top = "";
    //         document.body.style.width = "";

    //         //? 저장된 스크롤 위치로 이동
    //         window.scrollTo(0, storedScrollY);
    //     };
    // }, [isOpen, parent]);

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
                    onKeyDown={(e) => e.key === "Escape" && onClose()}
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-[570px] h-[584px] relative"
                >
                    <img className="w-full h-full md:rounded-3xl" src={imageUrl}></img>
                </motion.nav>
            </div>
        </>
    );
};

export default ModalPicture;
