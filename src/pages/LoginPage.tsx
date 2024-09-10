import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../common/header/Header";
import Button from "../common/button/Button";
import { twMerge as tw } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../api/auth";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { IoWarning } from "react-icons/io5";
import { articleApi } from "../api";
import { useLikeStore } from "../config/store";

interface LoginData {
    id: string;
    password: string;
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginData>({
        defaultValues: {
            id: "",
            password: "",
        },
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const [isAlert, setIsAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState<null | string>(null);
    const { initLike } = useLikeStore();

    const alertHandler = (text: string) => {
        setIsAlert(true);
        setAlertMsg(text);
    };

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        const { id, password } = data;
        setIsSubmit(true);
        try {
            const response = await userLogin({ username: id, password: password });
            const likeResponse = await articleApi.likeList();
            initLike(likeResponse.data);

            if (response.status === 200) {
                setIsSubmit(false);
                navigate("/");
            }
            reset();
        } catch (error) {
            setIsSubmit(false);
            if (error instanceof AxiosError && error.response) {
                console.error("로그인 실패", error);
                if (error.response.status === 400) {
                    reset();
                    return alertHandler("아이디 또는 비밀번호가 일치하지 않습니다.");
                }
                if (error.response.status === 409) {
                    reset();
                    return alertHandler("이메일 인증 이후 로그인이 가능합니다.");
                }
            }
        }
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

    return (
        <>
            <Header />
            <div className="transition-colors flex items-center justify-center w-screen min-h-screen overflow-hidden  font-default md:bg-transparent bg-background dark:bg-slate-700 md:dark:bg-slate-900">
                <div className="w-[520px] md:bg-white md:rounded-[40px] md:border-2 md:border-[#4d3e3971] gap-10 flex flex-col justify-center items-center py-12 px-10 dark:bg-slate-700">
                    <Link to={"/"}>
                        <img className="max-w-[130px]" src={"/img/hunsu_logo_dark.png"} alt="hunsuking_logo" />
                    </Link>
                    <form className="flex flex-col w-full gap-1 " onSubmit={handleSubmit(onSubmit)}>
                        <label className="px-1 text-sm font-medium dark:text-primary-second-dark">아이디 *</label>
                        <input
                            className={tw(
                                "p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
                                errors.id && "focus:outline-literal-highlight"
                            )}
                            type="text"
                            placeholder="아이디를 입력해주세요."
                            {...register("id", {
                                required: "필수 항목입니다.",
                                minLength: {
                                    value: 6,
                                    message: "아이디는 최소 6글자 이상이어야 합니다.",
                                },
                                maxLength: {
                                    value: 15,
                                    message: "아이디는 최대 15글자 이하이어야 합니다.",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]{6,15}$/,
                                    message: "6~15글자 사이로 작성해주세요.",
                                },
                            })}
                        />
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px] font-normal">
                            {errors.id && errors.id.message}
                        </p>
                        <label className="px-1 text-sm font-medium dark:text-primary-second-dark">비밀번호 *</label>
                        <input
                            className={tw(
                                "p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
                                errors.password && "focus:outline-literal-highlight"
                            )}
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            {...register("password", {
                                required: "필수 항목입니다.",
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "영어, 숫자, 특수문자를 포함하여 8글자 이상 작성해주세요.",
                                },
                            })}
                        />
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px] font-normal">
                            {errors.password && errors.password.message}
                        </p>
                        <Button
                            className={tw("mt-4 py-3", isSubmit && "hover:bg-primary-second")}
                            type="submit"
                            color="primary"
                            disabled={isSubmit}
                        >
                            {isSubmit ? "로그인 중.." : "로그인"}
                        </Button>
                        <Link to={"/register"}>
                            <p className="mt-2 text-sm text-right text-gray-500 duration-200 cursor-pointer hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-300">
                                회원가입 하러 가기
                            </p>
                        </Link>
                        <Link to={"/find"}>
                            <p className="text-sm text-right text-gray-500 cursor-pointer hover:text-gray-800 dark:text-gray-100 dark:hover:text-gray-300">
                                비밀번호를 잊으셨나요?
                            </p>
                        </Link>
                    </form>
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

export default LoginPage;
