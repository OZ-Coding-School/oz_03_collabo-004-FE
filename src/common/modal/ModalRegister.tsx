import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import BadgeDesc from "../badge/BadgeDesc";
import { IoClose } from "react-icons/io5";
import ButtonRegister from "../button/ButtonRegister";
import { ModalProps } from "../../config/types";

const ModalRegister = ({ onClose, isOpen, parent }: ModalProps) => {
    const [modalRoot] = useState(() => document.createElement("div"));
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.appendChild(modalRoot);
        return () => {
            document.body.removeChild(modalRoot);
        };
    }, [modalRoot]);

    useEffect(() => {
        const parentElement = document.querySelector("." + parent);
        const headerElement = document.querySelector(".header");

        if (isOpen) {
            document.body.style.overflowY = "hidden";
            modalRef.current?.focus();
            parentElement?.classList.add("blur-[2px]");
            headerElement?.classList.add("blur-[2px]");
        }

        return () => {
            document.body.style.overflowY = "scroll";
            parentElement?.classList.remove("blur-[2px]");
            headerElement?.classList.remove("blur-[2px]");
        };
    }, [isOpen, parent]);

    return ReactDOM.createPortal(
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
                    className="outline-none mx-2 md:mx-0 w-[570px] h-[584px] rounded-3xl bg-white relative"
                >
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full font-bold text-lg font-point text-center pt-10">훈수왕 가입</div>
                        <div className="w-full text-center mt-5 text-gray-400">
                            훈수왕은 유머와 창의성으로 가득 찬 전문가들이 모여
                        </div>
                        <div className="w-full text-center text-gray-400">조언과 피드백을 나누는 공간입니다.</div>
                        <div className="mt-10">
                            <BadgeDesc />
                        </div>
                        <div className="flex flex-col justify-center items-center mt-16 gap-[13px]">
                            <ButtonRegister type="social" />
                            <ButtonRegister type="normal" />
                        </div>
                    </div>
                    <IoClose
                        onClick={onClose}
                        title="닫기"
                        className="absolute text-gray-400 hover:text-gray-800 transition cursor-pointer w-[28px] h-[28px] top-2 right-2"
                    />
                </motion.nav>
            </div>
        </>,
        modalRoot
    );
};

export default ModalRegister;
