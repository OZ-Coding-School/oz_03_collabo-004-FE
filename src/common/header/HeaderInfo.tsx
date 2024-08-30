import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../button/Button";
import ProfileImage from "../profile/ProfileImage";
import { HiMenu, HiX } from "react-icons/hi";
import { authApi } from "../../api";
import { useGoogleLogin } from "@react-oauth/google";

const menuVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
};

const HeaderInfo = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const googleLoginRequest = async (token: string) => {
        try {
            await authApi.userGoogleAccessTokenReceiver(token);
        } catch (error) {
            console.error("login failed", error);
        }
    };
    const googleLoginHandler = useGoogleLogin({
        onSuccess: (res) => {
            googleLoginRequest(res.access_token);
        },

        onError: () => {
            console.error("Unexpected Login Request Error");
        },
    });

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="flex justify-center items-center relative">
            <div className="w-[36px] h-[36px]">
                <ProfileImage />
            </div>
            <div className="h-[36px] w-[1px] bg-slate-200 mx-3 hidden md:flex"></div>
            <div className="gap-[10px] hidden md:flex">
                <Button onClick={googleLoginHandler}>로그인</Button>
                <Button>회원가입</Button>
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
                                <Button>로그인</Button>
                                <Button>회원가입</Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default HeaderInfo;
