import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../button/Button";
import { HiMenu, HiX } from "react-icons/hi";
import ModalLogin from "../modal/ModalLogin";
import ModalRegister from "../modal/ModalRegister";
import { ModalPortal } from "../../config/ModalPortal";

const menuVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
};

const HeaderInfo = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const loginModalCloseHandler = () => {
        setIsMenuOpen(false);
        setIsLoginOpen(false);
    };
    const loginModalOpenHandler = () => {
        setIsLoginOpen(true);
    };
    const registerModalCloseHandler = () => {
        setIsMenuOpen(false);
        setIsRegisterOpen(false);
    };
    const registerModalOpenHandler = () => {
        setIsRegisterOpen(true);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="flex justify-center items-center relative">
            <div className="gap-[10px] hidden md:flex">
                <Button className="py-0 h-8 text-sm font-medium" onClick={loginModalOpenHandler}>
                    로그인
                </Button>
                <Button className="py-0 h-8 text-sm font-medium" onClick={registerModalOpenHandler}>
                    회원가입
                </Button>
            </div>
            <motion.div className="md:hidden" initial={false} animate={isMenuOpen ? "open" : "closed"}>
                <motion.button
                    className="text-white cursor-pointer hover:bg-gray-700 rounded-full transition p-1 ml-3 h-[32px] w-[32px] block"
                    onClick={toggleMenu}
                    whileTap={{ scale: 0.95 }}
                >
                    {isMenuOpen ? <HiX className="h-full w-full" /> : <HiMenu className="h-full w-full" />}
                </motion.button>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="absolute z-10 right-0 top-full mt-2 bg-white rounded-md shadow-lg overflow-hidden"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="flex flex-col p-2 gap-2 w-[120px]">
                                <Button onClick={loginModalOpenHandler}>로그인</Button>
                                <Button onClick={registerModalOpenHandler}>회원가입</Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <ModalPortal>
                {isLoginOpen && (
                    <ModalLogin onClose={loginModalCloseHandler} isOpen={isLoginOpen} parent="home-parent" />
                )}
                {isRegisterOpen && (
                    <ModalRegister onClose={registerModalCloseHandler} isOpen={isRegisterOpen} parent="home-parent" />
                )}
            </ModalPortal>
        </div>
    );
};

export default HeaderInfo;
