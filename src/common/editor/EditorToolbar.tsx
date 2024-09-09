import { twMerge as tw } from "tailwind-merge";
import { FaBold, FaItalic, FaStrikethrough, FaCode, FaImage } from "react-icons/fa6";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { IoText, IoWarning } from "react-icons/io5";
import { LuHeading1, LuHeading2, LuHeading3, LuListOrdered, LuLink } from "react-icons/lu";
import { MdFormatListBulleted } from "react-icons/md";
import { IoMdQuote } from "react-icons/io";
import { articleApi } from "../../api";
import { FaCheck } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";

interface MenuBarProps {
    editor: Editor;
    onImageUpload: (id: string, url: string) => void;
}

const MenuBar = ({ editor, onImageUpload }: MenuBarProps) => {
    const [isLinkInputVisible, setIsLinkInputVisible] = useState(false);
    const [linkInput, setLinkInput] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [alertText, setAlertText] = useState<null | string>(null);

    const alertHandler = (text: string) => {
        setIsAlert(true);
        setAlertText(text);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const linkInputRef = useRef<HTMLInputElement>(null);

    if (!editor) {
        return null;
    }

    const handleImageUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageUpload = async (files: FileList | null) => {
        if (files === null) return;

        const allowedExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;

        const validFiles = Array.from(files).filter((file) => allowedExtensions.test(file.name));

        if (validFiles.length === 0) {
            alertHandler("유효한 이미지를 삽입 해 주세요");
            return;
        }

        const file = files[0];
        const formData = new FormData();
        formData.append("images", file);
        try {
            const imgResponse = await articleApi.articleUploadImage(file);
            const imgURL = imgResponse.data.image_url;
            const imgID = imgResponse.data.id;

            editor?.chain().focus().setImage({ src: imgURL, alt: imgID }).run();

            onImageUpload(imgID, imgURL);
        } catch (error) {
            console.error("error,", error);
        }
    };

    const toggleLinkInput = () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.getHTML().slice(from, to);

        if (selectedText) {
            setIsLinkInputVisible(true);
            linkInputRef.current?.focus();
        } else {
            setIsLinkInputVisible(false);
            alertHandler("텍스트를 선택 후 링크를 지정하세요");
        }
    };

    const handleLinkSubmit = () => {
        if (!linkInput.includes("http")) {
            setLinkInput("");
            setIsLinkInputVisible(false);
            alertHandler("링크내에 http, https를 작성해 온전한 링크를 입력하세요.");
            return;
        }
        setIsLinkInputVisible(false);
        editor.commands.setLink({ href: linkInput, target: "_blank" });
        setLinkInput("");
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (isLinkInputVisible) {
            linkInputRef.current?.focus();
        }
    }, [isLinkInputVisible]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (isAlert) {
            const timer = setTimeout(() => {
                setIsAlert(false);
                setAlertText(null);
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [isAlert]);

    return (
        <div className="flex flex-wrap md:gap-3 gap-1 w-full justify-center items-center text-gray-800 mb-2 bg-gray-100 p-2 rounded-md relative">
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("paragraph") && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <IoText className="text-lg" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("heading", { level: 1 }) && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <LuHeading1 className="text-lg" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("heading", { level: 2 }) && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <LuHeading2 className="text-lg" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("heading", { level: 3 }) && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <LuHeading3 className="text-lg" />
            </button>
            <div>
                <RxDividerVertical className="text-gray-600 text-xl" />
            </div>
            <button
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive({ textAlign: "left" }) && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <FaAlignLeft />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive({ textAlign: "center" }) && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <FaAlignCenter />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive({ textAlign: "right" }) && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <FaAlignRight />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("bold") && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <FaBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("italic") && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <FaItalic />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("strike") && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <FaStrikethrough />
            </button>

            <div>
                <RxDividerVertical className="text-gray-600 text-xl" />
            </div>

            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("code") && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <FaCode />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("bulletList") && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <MdFormatListBulleted className="text-lg" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("orderedList") && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <LuListOrdered className="text-lg" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("blockquote") && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <IoMdQuote />
            </button>
            <div>
                <RxDividerVertical className="text-gray-600 text-xl" />
            </div>
            <div className="relative flex flex-col items-center">
                <button onClick={toggleLinkInput} className={tw("p-1 hover:bg-gray-150 transition rounded-md")}>
                    <LuLink />
                </button>
                {isLinkInputVisible && (
                    <motion.div
                        animate={{ scaleX: [0, 1] }}
                        transition={{ duration: 1, type: "spring" }}
                        className="absolute -bottom-11 flex gap-0"
                    >
                        <input
                            ref={linkInputRef}
                            value={linkInput}
                            onKeyDown={(e) => e.key === "Enter" && handleLinkSubmit()}
                            onChange={(e) => setLinkInput(e.currentTarget.value)}
                            className="px-2 h-[30px] rounded-l-md outline-none border-gray-400 border-2 border-r-0"
                        />
                        <button
                            onClick={handleLinkSubmit}
                            className="hover:bg-gray-700 transition h-[30px] w-fit px-1 rounded-r-md bg-gray-400 text-white"
                        >
                            <FaCheck />
                        </button>
                    </motion.div>
                )}
            </div>
            <button onClick={handleImageUploadClick} className={tw("p-1 hover:bg-gray-150 transition rounded-md")}>
                <FaImage className="text-lg" />
                <input
                    onChange={(e) => {
                        handleImageUpload(e.target.files);
                    }}
                    ref={fileInputRef}
                    tabIndex={-1}
                    type="file"
                    name="img"
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                ></input>
            </button>
            <AnimatePresence>
                {isAlert && (
                    <motion.div
                        initial={{ translateY: -120 }}
                        animate={{ translateY: -50 }}
                        exit={{ translateY: -120 }}
                        transition={{ type: "spring", duration: 1 }}
                        className="flex items-center gap-2 bg-opacity-75 bg-orange-600 p-2 rounded-lg absolute top-0 text-background"
                    >
                        <IoWarning />
                        <div>{alertText}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MenuBar;
