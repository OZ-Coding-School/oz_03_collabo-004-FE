import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface ModalPictureProps {
    onClose: () => void;
    isOpen: boolean;
    parent: string;
}

const ModalPicture = ({ onClose, isOpen, parent }: ModalPictureProps) => {
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
            <div onClick={onClose} className="inset-0 select-none z-40 fixed flex items-center justify-center">
                <motion.nav
                    tabIndex={-1}
                    ref={modalRef}
                    onKeyDown={(e) => e.key === "Escape" && onClose()}
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none mx-2 md:mx-0 w-[570px] h-[584px] relative"
                >
                    <img
                        className="w-full h-full rounded-3xl"
                        src="https://images.unsplash.com/photo-1723894960978-3f1e1cead774?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    ></img>
                </motion.nav>
            </div>
        </>,
        modalRoot
    );
};

export default ModalPicture;
