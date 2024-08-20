import { useEffect, useState } from "react";
import { useToastStore } from "../../config/store";
import { motion } from "framer-motion";

interface ToastDefaultProps {
    duration?: number;
}

const Toast = ({ duration = 2000 }: ToastDefaultProps) => {
    const { toast, setToast } = useToastStore();
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const timer = setTimeout(() => {
            setToast(false, "");
        }, duration);

        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevProgress - 100 / (duration / 100);
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [duration, setToast]);
    return (
        <motion.div
            initial={{ opacity: 0, translateX: 200 }}
            animate={{ opacity: 0.8, translateX: 0 }}
            exit={{ opacity: 0, translateX: 200 }}
            transition={{ type: "tween" }}
            className="w-[300px] bottom-10 right-10 h-[80px] bg-white fixed z-50 px-5 py-2 rounded-2xl flex flex-col justify-center"
        >
            <div className="flex-grow">{toast.text}</div>
            <div className="h-1 bg-background rounded-full">
                <div
                    className="h-1 bg-primary-second-dark rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </motion.div>
    );
};

export default Toast;
