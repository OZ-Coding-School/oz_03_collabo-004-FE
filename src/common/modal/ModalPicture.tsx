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
