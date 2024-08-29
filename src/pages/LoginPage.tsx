import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../common/header/Header";
import Button from "../common/button/Button";
import { twMerge as tw } from "tailwind-merge";
import { Link } from "react-router-dom";

interface LoginData {
    id: string;
    password: string;
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        defaultValues: {
            id: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<LoginData> = (data) => {
        console.log(data);
    };
    return (
        <>
            <Header />
            <div className="flex w-screen justify-center items-center min-h-screen font-default sm:bg-transparent bg-white ">
                <div className="w-[520px] sm:h-[582px] sm:bg-white h-screen sm:rounded-[50px] sm:border-2 sm:border-[#4d3e3971] gap-10 flex flex-col justify-center items-center py-14 px-10">
                    <Link to={"/"}>
                        <img className="w-[150px]" src="img/hunsu_logo_dark.png" alt="hunsuking_logo" />
                    </Link>
                    <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-sm font-medium px-1">아이디 *</label>
                        <input
                            className={tw(
                                "p-2 rounded-md border border-gray-200 focus:outline-primary-second",
                                errors.id && "focus:outline-literal-highlight"
                            )}
                            type="text"
                            placeholder="아이디를 입력해주세요."
                            {...register("id", {
                                required: "아이디를 입력해주세요.",
                                minLength: 2,
                                maxLength: 15,
                                pattern: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/i,
                            })}
                        />
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px]">
                            {errors.id ? "2~15글자 사이로 작성해주세요." : null}
                        </p>
                        <label className="text-sm font-medium px-1">비밀번호 *</label>
                        <input
                            className={tw(
                                "p-2 rounded-md border border-gray-200 focus:outline-primary-second",
                                errors.password && "focus:outline-literal-highlight"
                            )}
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            {...register("password", {
                                required: "비밀번호를 입력해주세요.",
                                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            })}
                        />
                        <p className="px-2 text-xs text-literal-highlight min-h-[20px]">
                            {errors.password ? "영어, 숫자, 특수문자를 포함하여 8글자 이상 작성해주세요." : null}
                        </p>
                        <Button className="mt-4 py-3" type="submit" color="primary">
                            로그인
                        </Button>
                        <Link to={"/register"}>
                            <p className="text-sm text-gray-500 text-right mt-2 hover:text-gray-800 cursor-pointer">
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
