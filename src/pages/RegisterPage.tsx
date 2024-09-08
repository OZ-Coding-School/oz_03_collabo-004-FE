import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../common/header/Header";
import Button from "../common/button/Button";
import { twMerge as tw } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../api/auth";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoWarning } from "react-icons/io5";

interface RegisterData {
    id: string;
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm<RegisterData>({
        defaultValues: {
            id: "",
            nickname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [isVerify, setIsVerify] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [alertText, setAlertText] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        setIsSubmit(true);
        if (!isVerify) {
            setIsAlert(true);
            setAlertText("이메일 인증은 필수사항 입니다.");
            return setIsSubmit(false);
        }
        const { id, nickname, email, password } = {
            id: data.id.trim(),
            nickname: data.nickname.trim(),
            email: data.email.trim(),
            password: data.password.trim(),
        };
        try {
            await userRegister({ username: id, nickname: nickname, password: password, email: email });

            reset();
            setIsSubmit(false);
            navigate("/tag");
        } catch (error) {
            setIsSubmit(false);
            setIsAlert(true);
            setAlertText(`회원 가입에 실패했습니다. ${error}`);
        }
    };

    useEffect(() => {
        if (isAlert) {
            const timer = setTimeout(() => {
                setIsAlert(false);
                setAlertText(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isAlert]);

    return (
        <>
            <Header />
            <div className="relative overflow-hidden flex w-screen justify-center items-center min-h-screen font-default md:bg-transparent bg-white">
                <div className="w-[520px] md:bg-white md:rounded-[40px] md:border-2 md:border-[#4d3e3971] gap-10 flex flex-col justify-center items-center mt-7 py-12 px-10">
                    <Link to={"/"}>
                        <img className="max-w-[130px]" src="img/hunsu_logo_dark.png" alt="hunsuking_logo" />
                    </Link>
                    <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-sm font-medium px-1">아이디 *</label>
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
                                    message: "아이디는 알파벳과 숫자만 사용하여 6~15글자 사이로 입력해주세요.",
                                },
                            })}
                        />
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px] font-normal">
                            {errors.id && errors.id.message}
                        </p>

                        <label className="text-sm font-medium px-1">별명 *</label>
                        <input
                            className={tw(
                                "p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
                                errors.nickname && "focus:outline-literal-highlight"
                            )}
                            type="text"
                            placeholder="ex) 나는 훈수왕이 될 거야"
                            {...register("nickname", {
                                required: "필수 항목입니다.",
                                minLength: {
                                    value: 2,
                                    message: "별명은 최소 2글자 이상이어야 합니다.",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "별명은 최대 20글자 이하이어야 합니다.",
                                },
                            })}
                        />
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px] font-normal">
                            {errors.nickname && errors.nickname.message}
                        </p>

                        <label className="text-sm font-medium px-1">이메일 *</label>
                        <div className="flex gap-1">
                            <input
                                className={tw(
                                    "flex-grow p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
                                    errors.email && "focus:outline-literal-highlight"
                                )}
                                type="email"
                                placeholder="hunsuking@example.com"
                                {...register("email", {
                                    required: "필수 항목입니다.",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                        message: "이메일 형식에 먖춰 입력해주세요.",
                                    },
                                })}
                            />
                            <motion.button
                                type="button"
                                initial={{ background: "rgb(231 229 228)" }}
                                whileTap={{ scale: 1.1 }}
                                whileHover={{ background: "rgb(250 188 117)" }}
                                className="p-1 rounded-sm w-[100px]"
                            >
                                이메일 인증
                            </motion.button>
                        </div>
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px] font-normal">
                            {errors.email && errors.email.message}
                        </p>

                        <label className="text-sm font-medium px-1">비밀번호 *</label>
                        <input
                            className={tw(
                                "p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
                                errors.password && "focus:outline-literal-highlight"
                            )}
                            type="password"
                            autoComplete="off"
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

                        <label className="text-sm font-medium px-1">비밀번호 확인 *</label>
                        <input
                            className={tw(
                                "p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
                                errors.confirmPassword && "focus:outline-literal-highlight"
                            )}
                            type="password"
                            autoComplete="off"
                            placeholder="비밀번호를 확인해주세요."
                            {...register("confirmPassword", {
                                required: "필수 항목입니다.",
                                validate: {
                                    check: (value) => {
                                        if (getValues("password") !== value) return "비밀번호가 일치하지 않습니다.";
                                    },
                                },
                            })}
                        />
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px] font-normal">
                            {errors.confirmPassword && errors.confirmPassword.message}
                        </p>
                        <Button
                            className={tw("mt-4 py-3", isSubmit && "hover:bg-primary-second")}
                            type="submit"
                            color="primary"
                            disabled={isSubmit}
                        >
                            {isSubmit ? "회원가입 중.." : "회원가입"}
                        </Button>
                        <Link to={"/login"}>
                            <p className="text-sm text-gray-500 text-right mt-2 hover:text-gray-800 duration-200 cursor-pointer">
                                로그인 하러 가기
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
                            className="flex items-center gap-2 bg-opacity-75 bg-orange-600 p-2 rounded-lg absolute top-20 text-background"
                        >
                            <IoWarning />
                            <div>{alertText}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default RegisterPage;
