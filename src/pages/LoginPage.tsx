import { useForm } from "react-hook-form";
import Header from "../common/header/Header";
import Button from "../common/button/Button";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = () => {};
    return (
        <>
            <Header />
            <div className="flex justify-center items-center min-h-screen font-default">
                <div className="w-[610px] h-[582px] bg-white rounded-[50px] border-2 border-[#4d3e3971] flex flex-col items-center py-5 px-20">
                    <img className="w-[150px] mt-8 mb-12" src="img/hunsu_logo_dark.png" alt="hunsuking_logo" />
                    <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-sm font-medium">아이디 *</label>
                        <input
                            className="p-2 rounded-md border border-gray-200"
                            type="text"
                            placeholder="아이디를 입력해주세요."
                            {...register("id", {
                                required: "아이디를 입력해주세요.",
                                minLength: 2,
                                maxLength: 15,
                                pattern: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/i,
                            })}
                        />
                        {errors.id && <p className="px-2 text-xs text-red-500">* 2~12글자 사이입니다</p>}
                        <Button type="submit" color="primary">
                            로그인
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
