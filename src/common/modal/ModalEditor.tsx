import { RiEditBoxLine } from "react-icons/ri";

interface ModalEditorProps {
    onClick?: () => void;
}

const ModalEditor = ({ onClick }: ModalEditorProps) => {
    return (
        <button onClick={onClick} className="bg-gray-200 border-none rounded-[5px] py-2 px-4 text-left w-[603px]">
            <div className="text-gray-500 flex justify-between items-center h-[20px]">
                <span>|</span>
                <RiEditBoxLine className="text-literal-confirm h-[20px]" />
            </div>
        </button>
    );
};

export default ModalEditor;