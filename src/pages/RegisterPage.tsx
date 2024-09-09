import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../common/header/Header";
import Button from "../common/button/Button";
import { twMerge as tw } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoWarning } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { authApi } from "../api";

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
        setFocus,
        setError,
        clearErrors,
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
    const [isAlert, setIsAlert] = useState(false);
    const [alertText, setAlertText] = useState<string | null>(null);

    const [validation, setValidation] = useState<{
        id: null | boolean;
        name: null | boolean;
        email: null | boolean;
    }>({
        id: null,
        name: null,
        email: null,
    });

    const navigate = useNavigate();

    const alertHandler = (text: string) => {
        setIsAlert(true);
        setAlertText(text);
    };

    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        setIsSubmit(true);
        if (!validation.id) {
            alertHandler("아이디 중복여부를 확인하세요.");
            return setIsSubmit(false);
        }
        if (!validation.email) {
            alertHandler("이메일 중복여부를 확인하세요.");
            return setIsSubmit(false);
        }
        if (!validation.name) {
            alertHandler("별명 중복여부를 확인하세요.");
            return setIsSubmit(false);
        }

        const { id, nickname, email, password } = {
            id: data.id.trim(),
            nickname: data.nickname.trim(),
            email: data.email.trim(),
            password: data.password.trim(),
        };
        const form = {
            username: id,
            nickname: nickname,
            password: password,
            email: email,
        };

        try {
            await authApi.userRegister(form);
            reset();
            setIsSubmit(false);
            navigate("/welcome", { replace: true });
        } catch (error) {
            setIsSubmit(false);
            alertHandler(`회원 가입에 실패했습니다. ${error}`);
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

    //? Validation Check

    const handleIdCheck = async () => {
        const data = getValues("id");
        clearErrors("id");

        if (data.trim() === "") {
            setError("id", { type: "required", message: "필수 항목입니다." });
            return setFocus("id");
        }

        if (data.length < 6 || data.length > 15) {
            setError("id", { type: "length", message: "아이디는 6~15글자 사이여야 합니다." });
            return setFocus("id");
        }

        if (!/^[a-zA-Z0-9]{6,15}$/.test(data)) {
            setError("id", {
                type: "pattern",
                message: "아이디는 알파벳과 숫자만 사용하여 6~15글자 사이로 입력해주세요.",
            });
            return setFocus("id");
        }

        try {
            await authApi.userIdCheck(data);
            setValidation((prev) => ({
                ...prev,
                id: true,
            }));
            setFocus("nickname");
        } catch {
            setValidation((prev) => ({
                ...prev,
                id: false,
            }));
            setError("id", { type: "exists", message: "이미 사용 중인 아이디입니다." });
        }
    };

    const handleNameCheck = async () => {
        const data = getValues("nickname");
        clearErrors("nickname");

        if (data.trim() === "") {
            setError("nickname", { type: "required", message: "필수 항목입니다." });
            return setFocus("nickname");
        }

        if (data.length < 2 || data.length > 20) {
            setError("nickname", { type: "length", message: "별명은 2~20글자 사이여야 합니다." });
            return setFocus("nickname");
        }

        try {
            await authApi.userNameCheck(data);
            setValidation((prev) => ({
                ...prev,
                name: true,
            }));
            setFocus("email");
        } catch {
            setValidation((prev) => ({
                ...prev,
                name: false,
            }));
            setError("nickname", { type: "exists", message: "이미 사용 중인 별명입니다." });
        }
    };

    const handleEmailCheck = async () => {
        const data = getValues("email");
        clearErrors("email");

        if (data.trim() === "") {
            setError("email", { type: "required", message: "필수 항목입니다." });
            return setFocus("email");
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(data)) {
            setError("email", { type: "pattern", message: "이메일 형식에 맞춰 입력해주세요." });
            return setFocus("email");
        }

        try {
            await authApi.userEmailCheck(data);
            setValidation((prev) => ({
                ...prev,
                email: true,
            }));
            setFocus("password");
        } catch {
            setValidation((prev) => ({
                ...prev,
                email: false,
            }));
            setError("email", { type: "exists", message: "이미 사용 중인 이메일입니다." });
        }
    };

    return (
        <>
            <Header />
            <div className="relative flex items-center justify-center w-screen min-h-screen overflow-hidden bg-white font-default md:bg-transparent dark:bg-slate-700 md:dark:bg-slate-900">
                <div className="w-[520px] md:bg-white md:rounded-[40px] md:border-2 md:border-[#4d3e3971] gap-10 flex flex-col justify-center items-center mt-7 py-12 px-10 dark:bg-slate-700   ">
                    <Link to={"/"}>
                        <img className="max-w-[130px]" src="img/hunsu_logo_dark.png" alt="hunsuking_logo" />
                    </Link>
                    <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit(onSubmit)}>
                        <label className="px-1 text-sm font-medium dark:text-primary-second-dark">아이디 *</label>
                        <div className="flex gap-1">
                            <input
                                disabled={validation.id === true}
                                className={tw(
                                    "flex-grow p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
                                    validation.id === true && "border-indigo-400"
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
                            {validation.id ? (
                                <div className="w-[80px] p-1 flex items-center justify-center bg-literal-confirm rounded-sm text-stone-100">
                                    <FaCheck />
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleIdCheck}
                                    className="w-[80px] p-1 flex gap-1 items-center justify-center rounded-sm bg-stone-200 dark:bg-slate-200 dark:hover:bg-slate-400 hover:bg-stone-400"
                                >
                                    <div>중복 확인</div>
                                </button>
                            )}
                        </div>
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px] font-normal">
                            {errors.id && errors.id.message}
                        </p>

                        <label className="px-1 text-sm font-medium dark:text-primary-second-dark">별명 *</label>
                        <div className="flex gap-1">
                            <input
                                disabled={validation.name === true}
                                className={tw(
                                    "flex-grow p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
                                    validation.name === true && "border-indigo-400"
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
                            {validation.name ? (
                                <div className="w-[80px] p-1 flex items-center justify-center bg-literal-confirm rounded-sm text-stone-100">
                                    <FaCheck />
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleNameCheck}
                                    className="dark:bg-slate-200 dark:hover:bg-slate-400 w-[80px] p-1 flex gap-1 items-center justify-center rounded-sm bg-stone-200 hover:bg-stone-400"
                                >
                                    <div>중복 확인</div>
                                </button>
                            )}
                        </div>
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px] font-normal">
                            {errors.nickname && errors.nickname.message}
                        </p>

                        <label className="px-1 text-sm font-medium dark:text-primary-second-dark">이메일 *</label>
                        <div className="flex gap-1">
                            <input
                                disabled={validation.email === true}
                                className={tw(
                                    "flex-grow p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
                                    validation.id === true && "border-indigo-400"
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
                            {validation.email ? (
                                <div className="w-[80px] p-1 flex items-center justify-center bg-literal-confirm rounded-sm text-stone-100">
                                    <FaCheck />
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleEmailCheck}
                                    className="dark:bg-slate-200 dark:hover:bg-slate-400 w-[80px] p-1 flex gap-1 items-center justify-center rounded-sm bg-stone-200 hover:bg-stone-400"
                                >
                                    <div>중복 확인</div>
                                </button>
                            )}
                        </div>
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px] font-normal">
                            {errors.email && errors.email.message}
                        </p>

                        <label className="px-1 text-sm font-medium dark:text-primary-second-dark">비밀번호 *</label>
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

                        <label className="px-1 text-sm font-medium dark:text-primary-second-dark">
                            비밀번호 확인 *
                        </label>
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
                            <p className="mt-2 text-sm text-right text-gray-500 duration-200 cursor-pointer hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100">
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
                            className="absolute flex items-center gap-2 p-2 bg-orange-600 bg-opacity-75 rounded-lg top-20 text-background"
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
