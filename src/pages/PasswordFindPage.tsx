import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { IoWarning } from "react-icons/io5";
import Header from "../common/header/Header";
import { twMerge as tw } from "tailwind-merge";
import { authApi } from "../api";

const PasswordFindPage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isAlert, setIsAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState<null | string>(null);
    const [id, setId] = useState("");
    const [verify, setVerify] = useState(false);
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const alertHandler = (text: string) => {
        setIsAlert(true);
        setAlertMsg(text);
    };

    useEffect(() => {
        if (isAlert) {
            const timer = setTimeout(() => {
                setIsAlert(false);
                setAlertMsg(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isAlert]);

    const handleValidation = async () => {
        if (id.trim() === "") {
            return inputRef.current?.focus();
        }
        setIsConfirm(true);

        try {
            await authApi.passwordResetEmail(id);
            setVerify(true);
            alertHandler("메일이 전송되었습니다. 메일을 확인해주세요.");
            setIsCompleted(true);
        } catch {
            setVerify(false);
            alertHandler("유효하지 않은 아이디 입니다.");
            setId("");
            inputRef.current?.focus();
        } finally {
            setIsConfirm(false);
        }
    };

    return (
        <>
            <Header />
            <div className="relative flex items-center justify-center w-screen min-h-screen overflow-hidden bg-white font-default md:bg-transparent dark:bg-gray-900">
                <div className="w-[520px] md:bg-white md:rounded-[40px] md:border-2 md:border-[#4d3e3971] gap-10 flex flex-col justify-center items-center py-12 px-10 dark:bg-[#323232]">
                    <img className="max-w-[130px]" src="img/hunsu_logo_dark.png" alt="hunsuking_logo" />

                    <div className="flex flex-col w-full ">
                        <div className="w-full mb-20 text-xl text-center font-point dark:text-primary-second-dark">
                            비밀번호 찾기
                        </div>
                        <label htmlFor="id" className="px-1 text-sm font-medium dark:text-primary-second-dark">
                            아이디
                        </label>
                        <div className="flex gap-1">
                            <input
                                disabled={verify}
                                id="id"
                                className={tw(
                                    "p-2 flex-grow rounded-md border border-gray-200 focus:outline-primary-second h-9"
                                )}
                                ref={inputRef}
                                value={id}
                                onChange={(e) => setId(e.currentTarget.value)}
                                required
                                type="text"
                                placeholder="아이디를 입력해주세요."
                            />
                            <button
                                onClick={handleValidation}
                                disabled={isCompleted || isConfirm}
                                className="p-1 rounded-sm disabled:bg-primary-second disabled:hover:bg-primary-second bg-primary-second hover:bg-primary-second-dark text-stone-50"
                            >
                                {isConfirm === true ? "인증 요청 중" : isCompleted ? "요청 완료" : "인증 요청"}
                            </button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isAlert && (
                        <motion.div
                            initial={{ translateY: -100 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: -100 }}
                            transition={{ type: "spring", duration: 1 }}
                            className="fixed flex items-center gap-2 p-2 bg-orange-600 bg-opacity-75 rounded-lg top-20 text-background"
                        >
                            <IoWarning />
                            <div>{alertMsg}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default PasswordFindPage;
