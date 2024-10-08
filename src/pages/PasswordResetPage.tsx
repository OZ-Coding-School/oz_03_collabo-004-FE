import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../common/button/Button";
import { twMerge as tw } from "tailwind-merge";
import { useState } from "react";
import Header from "../common/header/Header";
import { authApi } from "../api";
import { FaKey } from "react-icons/fa";

interface PasswordData {
    password: string;
    confirmPassword: string;
}

const PasswordResetPage = () => {
    const navigate = useNavigate();
    const { uidb64, token } = useParams();
    const [isSubmit, setIsSubmit] = useState(false);

    const {
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
        register,
    } = useForm<PasswordData>({
        defaultValues: {
            password: "",
        },
    });

    const onSubmit: SubmitHandler<PasswordData> = async (data) => {
        setIsSubmit(true);

        const { password } = {
            password: data.password.trim(),
        };

        try {
            if (!uidb64 || !token) {
                return;
            }
            await authApi.passwordResetConfirm(uidb64, token, password);
            reset();
            navigate("/", { replace: true });
        } catch {
            reset();
            navigate("/", { replace: true });
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="relative overflow-hidden flex w-screen justify-center items-center min-h-screen font-default md:bg-transparent bg-white">
                <div className="w-[520px] md:bg-white md:rounded-[40px] md:border-2 md:border-[#4d3e3971] gap-10 flex flex-col justify-center items-center mt-7 py-12 px-10">
                    <Link to={"/"}>
                        <img className="max-w-[130px]" src="/img/hunsu_logo_dark.png" alt="hunsuking_logo" />
                    </Link>
                    <form className="flex flex-col w-full gap-1" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full text-center font-point text-xl mb-20 flex gap-1 items-center">
                            <FaKey className="text-yellow-500 animate-ring" />
                            <div>비밀번호 재수정</div>
                        </div>

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
                            {isSubmit ? "변경 요청중.." : "비밀번호 변경"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetPage;
