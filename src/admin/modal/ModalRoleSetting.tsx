import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import Button from "../../common/button/Button";
import { adminApi } from "../../api";
import useScrollLock from "../../hooks/useScrollLock";

interface ModalRoleSettingProps {
    onClose: () => void;
    isOpen: boolean;
    id: number;
    role: string;
    refetch: () => void;
    parent: string;
}

const ModalRoleSetting = ({ parent, onClose, role, isOpen, id, refetch }: ModalRoleSettingProps) => {
    const modalRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.focus();
        }
    }, [isOpen]);

    const handleConfirm = async () => {
        onClose();
        await adminApi.userRoleUpdate(id, role);
        refetch();
    };

    const handleCancel = () => {
        onClose();
    };

    useScrollLock(isOpen, parent);

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
                    className="outline-none w-full h-full md:w-[570px] md:h-[240px] md:rounded-3xl bg-white relative flex justify-center items-center"
                >
                    <div className="px-12 md:px-[110px] flex flex-col w-full h-full justify-center items-center">
                        <div className="w-full font-bold text-lg font-point text-center ">등급 변경</div>
                        <div className="text-literal-error mt-5 w-full text-center font-semibold">
                            사용자의 등급을 {role === "True" ? "관리자" : "유저"}로 변경하겠습니까?
                        </div>
                        <div className="w-full flex gap-5 mt-10">
                            <Button onClick={handleConfirm} className="w-full" color="danger">
                                확인
                            </Button>
                            <Button onClick={handleCancel} className="w-full">
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

export default ModalRoleSetting;
