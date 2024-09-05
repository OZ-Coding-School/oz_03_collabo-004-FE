import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import Button from "../button/Button";
import { commentReport } from "../../api/report";
import Toast from "../toast/Toast";
import { useToastStore } from "../../config/store";

interface ModalReportProps {
    onClose: () => void;
    comment_id: number;
    isOpen: boolean;
}

const ModalReport = ({ onClose, isOpen, comment_id }: ModalReportProps) => {
    const [text, setText] = useState("");
    const length = text.length < 100 ? 100 - text.length : 0;
    const modalRef = useRef<HTMLTextAreaElement>(null);
    const { toast, setToast } = useToastStore();

    useEffect(() => {
        if (isOpen) {
            setToast(false, "");
            modalRef.current?.focus();
        }
    }, [isOpen, setToast]);

    const handleReport = async () => {
        if (!comment_id) return;
        try {
            const response = await commentReport(comment_id, text);
            console.log(response);
            if (response.status === 201) toastHandler();
        } catch (error) {
            console.log(error);
        }
    };

    const toastHandler = () => {
        setToast(true, "댓글 신고가 완료되었습니다.");
        setTimeout(() => {
            onClose();
        }, 2000);
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
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full h-full md:w-[570px] md:h-[584px] md:rounded-3xl bg-white relative flex justify-center items-center"
                >
                    {toast.status && <Toast />}
                    <form className="md:px-[80px] flex flex-col justify-center items-center">
                        <div className="w-full font-bold text-lg font-point text-center pt-10">훈수 신고</div>
                        <div className="w-full font-default text-center mt-5 text-literal-error">
                            부적절한 신고는 다른 사용자에게 불필요한 피해를 줄 수 있습니다.
                        </div>
                        <div className="w-full font-default text-center text-literal-error">
                            신고 사유를 신중하게 작성해 주시기 바랍니다.
                        </div>
                        <div className="mt-10 relative w-full h-[226px] flex">
                            <textarea
                                ref={modalRef}
                                onKeyDown={(e) => e.key === "Escape" && onClose()}
                                placeholder="신고 사유를 입력해주세요."
                                maxLength={100}
                                value={text}
                                onChange={(e) => setText(e.currentTarget.value)}
                                className="placeholder:text-gray-600 w-full h-full rounded-xl outline-none p-3 resize-none bg-gray-100"
                            />
                            <div className="absolute bottom-2 right-2 text-gray-600">{length}자</div>
                        </div>
                        <Button onClick={handleReport} className="w-full mt-10" color="danger">
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

export default ModalReport;
