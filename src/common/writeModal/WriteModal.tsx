import { RiEditBoxLine } from "react-icons/ri";

interface WriteModalProps {
    onClick?: () => void;
}

const WriteModal = ({ onClick }: WriteModalProps) => {
    return (
        <button onClick={onClick} className="bg-gray-100 border-none rounded-[5px] py-2 px-4 text-left w-full">
            <div className="text-gray-500 flex justify-between items-center h-[20px]">
                <span>|</span>
                <RiEditBoxLine className="text-literal-confirm h-[20px]" />
            </div>
        </button>
    );
};

export default WriteModal;
