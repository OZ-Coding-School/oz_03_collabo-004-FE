import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../common/header/Header";
import Button from "../common/button/Button";
import { PiConfettiFill } from "react-icons/pi";
import JSConfetti from "js-confetti";

const WelcomePage = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [initConfetti, setInitConfetti] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const jsConfetti = useMemo(() => new JSConfetti(), []);

    const handleClick = useCallback(() => {
        jsConfetti.addConfetti({
            confettiColors: ["#ff0a54", "#1469fb", "#70ffae", "#fdff85", "#e8b1fb", "#ffa600"],
            confettiRadius: 5,
            confettiNumber: 500,
        });
    }, [jsConfetti]);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500);
        if (initConfetti) {
            handleClick();
            setInitConfetti(false);
        }
        return () => clearTimeout(timer);
    }, [initConfetti, handleClick]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    return (
        <>
            <Header />
            <div className="dark:bg-gray-900 welcome-container font-default flex w-full justify-center items-center min-h-screen bg-background">
                <motion.div
                    className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-2xl max-w-xl w-full mx-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    <motion.div variants={itemVariants} className="text-center mb-6">
                        <motion.div
                            whileTap={{ scale: 1.5 }}
                            className="cursor-pointer"
                            initial={{ scale: 1, translateX: 0, translateY: 0 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <PiConfettiFill onClick={handleClick} className=" w-20 h-20 mx-auto text-yellow-400" />
                        </motion.div>
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100"
                    >
                        가입을 축하합니다!
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-center text-gray-600 dark:text-gray-200">
                        회원가입이 성공적으로 완료되었습니다.
                    </motion.p>
                    <motion.p variants={itemVariants} className="text-center text-gray-600 mb-6 dark:text-gray-200">
                        이메일 인증을 통해 계정 활성화를 완료해주세요.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
                        role="alert"
                    >
                        <p className="font-bold font-point text-lg">이메일 인증 안내</p>
                        <p>가입 시 입력하신 이메일 주소로 인증 메일을 발송했습니다.</p>
                        <p>
                            <span className="text-rose-800 font-bold">이메일</span>을 확인하시고 인증 링크를 클릭하여
                            <span className="text-rose-800 font-bold"> 계정 활성화</span>를 완료해주세요.
                        </p>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Button
                            color="primary"
                            className="w-full py-3 text-lg font-semibold"
                            onClick={() => navigate("/login", { replace: true })}
                        >
                            로그인 페이지로 이동
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
            <div
                className="fixed top-0 left-0 w-full h-full pointer-events-none"
                ref={containerRef}
                id="confetti-container"
            ></div>
        </>
    );
};

export default WelcomePage;
