import { RiEditBoxLine } from "react-icons/ri";

interface ModalEditorProps {
    onClick?: () => void;
}

const EditorInput = ({ onClick }: ModalEditorProps) => {
    return (
        <button
            onClick={onClick}
            className="transition bg-white hover:bg-slate-200 border-none rounded-[5px] py-2 px-4 text-left w-full md:w-[603px]"
        >
            <div className="text-gray-500 flex justify-end items-center h-[20px]">
                <RiEditBoxLine className="text-literal-confirm h-[20px]" />
            </div>
        </button>
    );
};

export default EditorInput;
