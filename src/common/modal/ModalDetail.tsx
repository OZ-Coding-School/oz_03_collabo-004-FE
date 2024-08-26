import { motion } from "framer-motion";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { ModalProps } from "../../config/types";
import Button from "../button/Button";

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
                className="fixed flex justify-center items-center inset-0 bg-black w-full h-full"
            ></motion.nav>
            <div
                onClick={onClose}
                className="text-literal-normal inset-0 font-default z-40 fixed flex items-center justify-center"
            >
                <motion.nav
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full h-full md:w-[570px] md:h-[584px] md:rounded-3xl bg-white relative flex justify-center items-center"
                >
                    <form className="md:px-[80px] flex flex-col justify-center items-center">
                        <div className="w-full font-bold text-lg font-point text-center pt-10">훈수 신고</div>
                        <div className="w-full font-default text-center mt-5 text-literal-error">
                            부적절한 신고는 다른 사용자에게 불필요한 피해를 줄 수 있습니다.
                        </div>
                        <div className="w-full font-default text-center text-literal-error">
                            신고 사유를 신중하게 작성해 주시기 바랍니다.
                        </div>
                        <div className="mt-10 relative w-full h-[226px] flex">
                            <div className="absolute bottom-2 right-2 text-gray-600">{length}자</div>
                        </div>
                        <Button className="w-full mt-10" color="danger">
                            신고하기
                        </Button>
                    </form>
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
