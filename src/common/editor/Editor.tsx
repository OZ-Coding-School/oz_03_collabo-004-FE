/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import { common, createLowlight } from "lowlight";
import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import { twMerge as tw } from "tailwind-merge";
import { FaBold, FaItalic, FaStrikethrough, FaCode, FaImage } from "react-icons/fa6";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { IoText } from "react-icons/io5";
import { LuHeading1, LuHeading2, LuHeading3, LuListOrdered, LuLink } from "react-icons/lu";
import { MdFormatListBulleted } from "react-icons/md";
import { IoMdQuote } from "react-icons/io";
import { articleApi } from "../../api";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useToastStore } from "../../config/store";

import Toast from "../toast/Toast";
const lowlight = createLowlight(common);

const MenuBar = ({ editor }: any) => {
    const [linkInputStatus, setLinkInputStatus] = useState(false);
    const [linkInput, setLinkInput] = useState("");
    const { setToast, toast } = useToastStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    if (!editor) {
        return null;
    }

    const handleImageUpload = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleUploadPhoto = async (files: FileList | null) => {
        if (files === null) return;
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        const imgResponse = await articleApi.articleUploadImage(file);
        const IMG_URL = imgResponse.data.image_url;

        editor.commands.setImage({ src: IMG_URL });
    };

    const handleLinkInput = () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.getHTML().slice(from, to);

        if (selectedText) {
            setLinkInputStatus(true);
            linkRef.current?.focus();
        } else {
            setLinkInputStatus(false);
            setToast(true, "글자를 드래그 하고 링크를 사용하세요");
        }
    };

    const handleLinkCreate = () => {
        if (!linkInput.includes("http")) {
            setLinkInput("");
            setLinkInputStatus(false);
            return;
        }
        setLinkInputStatus(false);
        editor.commands.setLink({ href: linkInput, target: "_blank" });
        setLinkInput("");
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (linkInputStatus) {
            linkRef.current?.focus();
        }
    }, [linkInputStatus]);

    return (
        <div className="flex gap-3 w-full justify-center items-center text-gray-800 mb-2 bg-gray-100 p-2 rounded-md relative">
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
                <button onClick={handleLinkInput} className={tw("p-1 hover:bg-gray-150 transition rounded-md")}>
                    <LuLink />
                </button>
                {linkInputStatus && (
                    <motion.div
                        animate={{ scaleX: [0, 1] }}
                        transition={{ duration: 1, type: "spring" }}
                        className="absolute -bottom-11 flex gap-0"
                    >
                        <input
                            ref={linkRef}
                            value={linkInput}
                            onKeyDown={(e) => e.key === "Enter" && handleLinkCreate()}
                            onChange={(e) => setLinkInput(e.currentTarget.value)}
                            className="px-2 h-[30px] rounded-l-md outline-none border-gray-400 border-2 border-r-0"
                        />
                        <button
                            onClick={handleLinkCreate}
                            className="hover:bg-gray-700 transition h-[30px] w-fit px-1 rounded-r-md bg-gray-400 text-white"
                        >
                            <FaCheck />
                        </button>
                    </motion.div>
                )}
            </div>
            <button
                onClick={handleImageUpload}
                className={tw(
                    "p-1 hover:bg-gray-150 transition rounded-md",
                    editor.isActive("blockquote") && "bg-gray-200 hover:bg-gray-150 rounded-md"
                )}
            >
                <FaImage className="text-lg" />
                <input
                    onChange={(e) => {
                        handleUploadPhoto(e.target.files);
                    }}
                    ref={inputRef}
                    tabIndex={-1}
                    type="file"
                    className="hidden"
                    id="file-upload"
                ></input>
            </button>
            {toast.status && <Toast />}
        </div>
    );
};
const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] } as any),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
        codeBlock: false,
    }),
    Placeholder.configure({
        placeholder: "내용",
    }),
    Image,
    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
    CodeBlockLowlight.configure({
        lowlight: lowlight,
    }),
    Link,
];

interface EditorProps {
    initialContent?: string | JSONContent;
    onTitleChange?: (title: string) => void;
    onContentChange?: (content: string) => void;
}

const TipTapEditor: React.FC<EditorProps> = ({ initialContent = "", onTitleChange, onContentChange }) => {
    const [title, setTitle] = useState("");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (onTitleChange) {
            onTitleChange(newTitle);
        }
    };

    const editor = useEditor({
        extensions,
        content: initialContent,
        editorProps: {
            attributes: {
                class: "font-default text-[18px] text-black",
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            if (onContentChange) {
                onContentChange(html);
            }
        },
    });

    return (
        <div className="w-full h-full flex flex-col font-default">
            <input
                className="outline-none mb-4 font-default text-lg w-full placeholder:text-[#999]"
                required
                maxLength={30}
                placeholder="제목"
                value={title}
                onChange={handleTitleChange}
            />
            <MenuBar editor={editor} />

            <EditorContent editor={editor} className="mt-10 w-full flex-grow overflow-auto" />
        </div>
    );
};

export default TipTapEditor;
