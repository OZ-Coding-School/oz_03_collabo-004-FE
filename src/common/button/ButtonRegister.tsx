import { twMerge as tw } from "tailwind-merge";
import { FcGoogle } from "react-icons/fc";

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    type: "normal" | "social";
}

const ButtonRegister = ({ onClick, type }: ButtonProps) => {
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
            {type === "normal" && "이메일 계정으로 가입"}
            {type === "social" && (
                <>
                    <FcGoogle className="w-[20px] h-[20px] mr-1" />
                    <div>구글 계정으로 가입</div>
                </>
            )}
        </button>
    );
};

export default ButtonRegister;
