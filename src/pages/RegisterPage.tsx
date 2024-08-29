import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../common/header/Header";
import Button from "../common/button/Button";
import { twMerge as tw } from "tailwind-merge";
import { Link } from "react-router-dom";

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
    } = useForm<RegisterData>({
        defaultValues: {
            id: "",
            nickname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit: SubmitHandler<RegisterData> = (data) => {
        console.log(data);
    };
    return (
        <>
            <Header />
            <div className="flex w-screen justify-center items-center min-h-screen font-default sm:bg-transparent bg-white">
                <div className="w-[520px] sm:bg-white sm:rounded-[40px] sm:border-2 sm:border-[#4d3e3971] gap-10 flex flex-col justify-center items-center mt-7 py-12 px-10">
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
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px]">
                            {errors.id && errors.id.message}
                        </p>

                        <label className="text-sm font-medium px-1">별명</label>
                        <input
                            className={tw(
                                "p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
                                errors.nickname && "focus:outline-literal-highlight"
                            )}
                            type="text"
                            placeholder="ex) 나는 훈수왕이 될 거야"
                            {...register("nickname", {
                                minLength: 2,
                                maxLength: 20,
                            })}
                        />
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px]">
                            {errors.nickname && "2~20글자 사이로 작성해주세요."}
                        </p>

                        <label className="text-sm font-medium px-1">이메일 *</label>
                        <input
                            className={tw(
                                "p-2 rounded-md border border-gray-200 focus:outline-primary-second h-9",
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
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px]">
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
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px]">
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
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px]">
                            {errors.confirmPassword && errors.confirmPassword.message}
                        </p>
                        <Button className="mt-4 py-3" type="submit" color="primary">
                            회원가입
                        </Button>
                        <Link to={"/login"}>
                            <p className="text-sm text-gray-500 text-right mt-2 hover:text-gray-800 duration-200 cursor-pointer">
                                로그인 하러 가기
                            </p>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
