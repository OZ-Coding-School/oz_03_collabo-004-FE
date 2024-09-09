import { useEffect, useRef, useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import { common, createLowlight } from "lowlight";
import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import { articleApi } from "../../api";
import { useImageStore } from "../../config/store";
import MenuBar from "./EditorToolbar";
import { TextStyleOptions } from "@tiptap/extension-text-style";
import { Editor } from "@tiptap/react";
const lowlight = createLowlight(common);

const extensions = [
    Image,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
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
    initialTitle?: string;
    onTitleChange: (title: string) => void;
    onContentChange?: (content: string) => void;
}

const TipTapEditor: React.FC<EditorProps> = ({
    initialTitle = "",
    initialContent = "",
    onTitleChange,
    onContentChange,
}) => {
    const { image, addImage, removeImage } = useImageStore(); // 이미지 스토어에서 상태와 함수 가져오기
    const [title, setTitle] = useState(initialTitle);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        onTitleChange(newTitle);
    };

    const handleImageUpload = (id: string, url: string) => {
        addImage(url, id); // 스토어에 이미지 추가
    };

    const handleImageDelete = async (url: string) => {
        const imgId = image.id?.find((_, idx) => image.src && image.src[idx] === url); // 이미지 ID 가져오기
        if (imgId) {
            try {
                await articleApi.articleDeleteImage(imgId);
                removeImage(url, imgId); // 스토어에서 이미지 삭제
            } catch (error) {
                console.warn(error);
            }
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

            const doc = new DOMParser().parseFromString(html, "text/html");
            const currentImages = Array.from(doc.images).map((img) => img.src);

            image.src?.forEach((url) => {
                if (!currentImages.includes(url)) {
                    handleImageDelete(url);
                }
            });
        },
    });

    const contentSetRef = useRef(false);

    useEffect(() => {
        if (editor && !contentSetRef.current && initialContent && initialTitle) {
            editor.commands.setContent(initialContent, true);
            setTitle(initialTitle);
            contentSetRef.current = true;
        }
    }, [editor, initialContent, initialTitle]);

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
            <MenuBar onImageUpload={handleImageUpload} editor={editor as Editor} />

            <EditorContent editor={editor} className="mt-10 w-full flex-grow overflow-auto" />
        </div>
    );
};
export default TipTapEditor;
