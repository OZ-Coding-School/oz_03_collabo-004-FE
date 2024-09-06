import { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { twMerge as tw } from "tailwind-merge";

interface ModalEditorProps {
    onClick?: () => void;
}

const EditorInput = ({ onClick }: ModalEditorProps) => {
    const [hover, setHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="transition bg-white hover:bg-sky-100 border-none rounded-[5px] py-2 px-4 text-left w-full md:w-[603px]"
        >
            <div className="text-gray-500 transition flex justify-end items-center h-[20px]">
                <RiEditBoxLine className={tw("text-literal-confirm h-[20px]", hover && "text-sky-600")} />
            </div>
        </button>
    );
};

export default EditorInput;
