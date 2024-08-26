import { FaArrowCircleUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

interface WriteModalProps {
    onClose: () => void;
}

const WriteModal = ({ onClose }: WriteModalProps) => {
    const writeRef = useRef<HTMLInputElement>(null);
    const [text, setText] = useState("");

    useEffect(() => {
        if (writeRef.current) {
            writeRef.current.focus();
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("훈수글: ", text);
        setText("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
            return;
        }
        if (e.key === "Enter") {
            handleSubmit(e);
            return;
        }
    };
    return (
        <form className="bg-gray-100 border-none rounded-[5px] py-2 px-4 text-left w-full flex">
            <input
                className="bg-transparent w-full focus:outline-none py-1"
                ref={writeRef}
                onKeyDown={handleKeyDown}
                placeholder="훈수를 작성해주세요."
                maxLength={150}
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
            />
            <FaArrowCircleUp
                onClick={handleSubmit}
                className="my-auto size-5 cursor-pointer text-primary-background-second hover:text-primary-background"
            />
        </form>
    );
};

export default WriteModal;
