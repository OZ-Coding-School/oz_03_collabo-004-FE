import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import Button from "../button/Button";
import { articleApi } from "../../api";
import { useArticleStore, useImageStore } from "../../config/store";
import { useNavigate } from "react-router-dom";

interface ModalConfirmProps {
    onClose: () => void;
    parentOnClose: () => void;
    isOpen: boolean;
}

const ModalConfirm = ({ onClose, parentOnClose, isOpen }: ModalConfirmProps) => {
    const nav = useNavigate();
    const modalRef = useRef<HTMLTextAreaElement>(null);
    const { initArticle } = useArticleStore();
    const { image, resetImage } = useImageStore();
    useEffect(() => {
        if (isOpen) {
            modalRef.current?.focus();
        }
    }, [isOpen]);

    const handleConfirm = async () => {
        nav("/");
        onClose();
        parentOnClose();
        if (image && image.id !== null) {
            image.id.forEach(async (itemId) => {
                await articleApi.articleDeleteImage(itemId);
                resetImage();
            });
        }

        const responseArticle = await articleApi.articleList();
        initArticle(responseArticle.data);
    };

    const handleClose = async () => {
        onClose();
    };

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
                        if (e.key === "Enter") parentOnClose();
                    }}
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full h-full md:w-[570px] md:h-[240px] md:rounded-3xl bg-white relative flex justify-center items-center"
                >
                    <div className="px-12 md:px-[110px] flex flex-col w-full h-full justify-center items-center">
                        <div className="w-full font-bold text-lg font-point text-center ">글 작성 취소</div>
                        <div className="text-literal-error mt-5 w-full text-center font-semibold">
                            작성을 취소하시겠습니까? 내용은 저장되지 않습니다.
                        </div>
                        <div className="w-full flex gap-5 mt-10">
                            <Button onClick={handleConfirm} className="w-full">
                                확인
                            </Button>
                            <Button onClick={handleClose} className="w-full">
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

export default ModalConfirm;
