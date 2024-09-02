import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ModalProps } from "../../config/types";

const ModalEditor = ({ onClose, isOpen, parent }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

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

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed flex justify-center inset-0 bg-black w-full h-full"
            ></motion.nav>
            <div onClick={onClose} className="inset-0 select-none z-40 fixed flex items-center justify-center">
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
                    <div className="w-full h-full bg-white rounded-3xl p-4">에디터</div>
                </motion.nav>
            </div>
        </>
    );
};

export default ModalEditor;
