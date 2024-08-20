import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { ModalProps } from "../../config/types";
import Button from "../button/Button";

const ModalDelete = ({ onClose, isOpen, parent }: ModalProps) => {
    const modalRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const parentElement = document.querySelector("." + parent);
        const headerElement = document.querySelector(".header");

        if (isOpen) {
            document.body.style.overflow = "hidden";
            parentElement?.classList.add("blur-[2px]");
            headerElement?.classList.add("blur-[2px]");
            modalRef.current?.focus();
        }

        return () => {
            document.body.style.overflowY = "scroll";
            parentElement?.classList.remove("blur-[2px]");
            headerElement?.classList.remove("blur-[2px]");
        };
    }, [isOpen, parent]);

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
                className="text-literal-normal inset-0 font-default z-40 fixed flex items-center justify-center"
            >
                <motion.nav
                    tabIndex={-1}
                    ref={modalRef}
                    onKeyDown={(e) => e.key === "Escape" && onClose()}
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full h-full md:w-[570px] md:h-[240px] md:rounded-3xl bg-white relative flex justify-center items-center"
                >
                    <div className="px-12 md:px-[110px] flex flex-col w-full h-full justify-center items-center">
                        <div className="w-full font-bold text-lg font-point text-center ">훈수 삭제</div>
                        <div className="text-literal-error mt-5 w-full text-center font-semibold">
                            정말 게시글을 삭제하시겠습니까?
                        </div>
                        <div className="w-full flex gap-5 mt-10">
                            <Button className="w-full" color="danger">
                                삭제
                            </Button>
                            <Button onClick={onClose} className="w-full">
                                취소
                            </Button>
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

export default ModalDelete;
