import { twMerge as tw } from "tailwind-merge";
import { FcGoogle } from "react-icons/fc";

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    type: "normal" | "social";
}

const ButtonLogin = ({ onClick, type }: ButtonProps) => {
    return (
        <button
            className={tw(
                "rounded-[5px] font-default w-[409px] h-[42px] text-literal-normal flex justify-center items-center",
                type === "normal" && "bg-primary-second hover:bg-primary-second-dark transition font-semibold",
                type === "social" &&
                    "text-white bg-primary-background-second hover:bg-primary-background transition font-semibold"
            )}
            onClick={onClick}
        >
            {type === "normal" && "아이디 / 비밀번호로 로그인"}
            {type === "social" && (
                <>
                    <FcGoogle className="w-[20px] h-[20px] mr-1" />
                    <div>구글 계정으로 로그인</div>
                </>
            )}
        </button>
    );
};

export default ButtonLogin;
