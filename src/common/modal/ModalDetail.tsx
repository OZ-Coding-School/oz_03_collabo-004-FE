import { motion } from "framer-motion";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { ModalProps } from "../../config/types";
import Badge from "../badge/Badge";
import WriteModal from "../writeModal/WriteModal";
import Comment from "../comment/Comment";

const ModalDetail = ({ onClose, isOpen, parent }: ModalProps) => {
    useEffect(() => {
        const parentElement = document.querySelector("." + parent);
        const headerElement = document.querySelector(".header");

        if (isOpen) {
            document.body.style.overflowY = "hidden";
            parentElement?.classList.add("blur-[2px]");
            headerElement?.classList.add("blur-[2px]");
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
                className="fixed flex justify-center items-center inset-0 bg-black w-full h-full "
            ></motion.nav>
            <div
                onClick={onClose}
                className="text-literal-normal inset-0 font-default z-60 fixed flex items-center justify-center md:px-2 comment-parent"
            >
                <motion.nav
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full h-full md:w-[870px] md:max-h-[650px] md:rounded-3xl bg-white relative py-10 px-14 "
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <Badge color="yellow">고민</Badge>
                                <Badge color="yellow">소소</Badge>
                            </div>
                            <div className="text-sm text-gray-500">수정 / 삭제</div>
                        </div>
                        <div className="text-gray-500 text-sm">2024년 08월 26일</div>
                        <div className="text-xl my-2">
                            비전공자, 전문대졸..이었던 내가 지금은 풀스택개발자입니다.. 고민상담
                        </div>
                        <div className="mt-3 mb-10">
                            <p>내용들..</p>
                        </div>
                        <form className="my-5">
                            <WriteModal onClose={onClose} />
                        </form>
                        <div className="flex justify-end">
                            <Comment color="ai" parent="comment-parent" />
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

export default ModalDetail;
