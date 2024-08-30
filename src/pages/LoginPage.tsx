import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../common/header/Header";
import Button from "../common/button/Button";
import { twMerge as tw } from "tailwind-merge";
import { Link } from "react-router-dom";
import { userLogin } from "../api/auth";
import { useState } from "react";
import { AxiosError } from "axios";

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

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        const { id, password } = data;
        setIsSubmit(true);
        try {
            const response = await userLogin({ username: id, password: password });
            console.log(response);
            if (response.status === 200) setIsSubmit(false);
            reset();
        } catch (error) {
            setIsSubmit(false);
            if (error instanceof AxiosError && error.response) {
                console.log("로그인 실패", error);
                if (error.response.status === 400) alert("로그인에 실패하였습니다.");
            }
        }
    };
    return (
        <>
            <Header />
            <div className="flex w-screen justify-center items-center min-h-screen font-default sm:bg-transparent bg-white ">
                <div className="w-[520px] sm:bg-white sm:rounded-[40px] sm:border-2 sm:border-[#4d3e3971] gap-10 flex flex-col justify-center items-center py-12 px-10">
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
                                    message: "6~15글자 사이로 작성해주세요.",
                                },
                            })}
                        />
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px] font-normal">
                            {errors.id && errors.id.message}
                        </p>
                        <label className="text-sm font-medium px-1">비밀번호 *</label>
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
                        <Button className="mt-4 py-3" type="submit" color="primary" disabled={isSubmit}>
                            {isSubmit ? "로그인 중.." : "로그인"}
                        </Button>
                        <Link to={"/register"}>
                            <p className="text-sm text-gray-500 text-right mt-2 hover:text-gray-800 duration-200 cursor-pointer">
                                회원가입 하러 가기
                            </p>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
