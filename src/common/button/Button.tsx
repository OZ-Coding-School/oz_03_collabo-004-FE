import { PropsWithChildren } from "react";
import { twMerge as tw } from "tailwind-merge";

interface ButtonProps extends PropsWithChildren {
    className?: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    color?: "default" | "danger" | "info" | "confirm" | "primary";
}

const Button = ({ color = "default", className, onClick, type = "button", children }: ButtonProps) => {
    return (
        <button
            className={tw(
                "font-default text-base py-2 px-4 text-literal-normal",
                "hover:text-white transition rounded-md",
                color === "default" && "bg-slate-200 hover:bg-slate-600",
                color === "danger" && "bg-slate-200 hover:bg-literal-error",
                color === "info" && "bg-slate-200 hover:bg-literal-info",
                color === "confirm" && "bg-slate-200 hover:bg-literal-confirm",
                color === "primary" && "bg-primary-second hover:bg-primary-second-dark hover:text-literal-normal",
                className
            )}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
