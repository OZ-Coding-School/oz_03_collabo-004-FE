import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";

const options = [
    { value: 2, label: "연애" },
    { value: 3, label: "집안일" },
    { value: 4, label: "고민" },
    { value: 5, label: "소소" },
    { value: 6, label: "상상" },
    { value: 7, label: "패션" },
    { value: 9, label: "모바일 게임" },
    { value: 10, label: "PC게임" },
    { value: 11, label: "교육" },
];

interface ModalEditorSelect {
    defaultValue?: number;
    onChange: (number: number) => void;
}

interface Option {
    value: number;
    label: string;
}

const ModalEditorSelect = ({ defaultValue = 4, onChange }: ModalEditorSelect) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        options.find((option) => option.value === defaultValue) || options[0]
    );

    const handleSelect = (option: Option) => {
        setSelectedOption(option);
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-40 text-sm">
            <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <span className="block truncate">{selectedOption.label}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FaChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            isOpen ? "transform rotate-180" : ""
                        }`}
                    />
                </span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        {options.map((option) => (
                            <motion.li
                                key={option.value}
                                whileHover={{ backgroundColor: "#F3F4F6" }}
                                className="relative py-2 pl-3 text-gray-900 cursor-default select-none pr-9"
                                onClick={() => handleSelect(option)}
                            >
                                <span className="block truncate">{option.label}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ModalEditorSelect;
