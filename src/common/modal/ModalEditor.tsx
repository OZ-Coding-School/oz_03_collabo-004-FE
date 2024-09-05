import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ModalProps } from "../../config/types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactModule from "./ModalEditorModule";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import Button from "../button/Button";
import ModalEditorSelect from "./ModalEditorSelect";
import { articleApi } from "../../api";
import { ModalPortalModal } from "../../config/ModalPortalModal";
import ModalConfirm from "./ModalConfirm";
import { useArticleStore } from "../../config/store";

const placeholderStyle = `
.quill > .ql-container > .ql-editor.ql-blank::before {
color: #999;
font-style: normal;  
font-size: 14px;  
font-weight: normal; 
font-family: Pretendard Variable;  
content: attr(data-placeholder);
position: absolute;
left: 15px;
right: 15px;
pointer-events: none;
}
`;

const ModalEditor = ({ onClose, isOpen, parent }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState(4);
    const [modalConfirmStatus, setModalConfirmStatus] = useState(false);
    const { initArticle } = useArticleStore();

    const handleModalConfirmClose = () => {
        setModalConfirmStatus(false);
    };

    const handleSubmit = async () => {
        await articleApi.articleCreate(title, content, tags);
        const responseArticle = await articleApi.ArticleList();
        initArticle(responseArticle.data);
        onClose();
    };

    const handleSetTag = (number: number) => {
        console.log(number);
        setTags(number);
    };

    useEffect(() => {
        const parentElement = document.querySelector("." + parent);
        const headerElement = document.querySelector(".header");

        if (isOpen) {
            document.body.style.overflowY = "hidden";
            modalRef.current?.focus();
            parentElement?.classList.add("blur-[2px]");
            headerElement?.classList.add("blur-[2px]");
        }

        return () => {
            document.body.style.overflowY = "scroll";
            parentElement?.classList.remove("blur-[2px]");
            headerElement?.classList.remove("blur-[2px]");
        };
    }, [isOpen, parent]);

    const formats: string[] = [
        "header",
        "size",
        "font",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "background",
        "align",
        "script",
        "code-block",
        "clean",
    ];

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    const modules: {} = useMemo(
        () => ({
            toolbar: {
                container: "#toolBar",
            },
            syntax: {
                highlight: (text: string) => hljs.highlightAuto(text).value,
            },
        }),
        []
    );

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed flex justify-center inset-0 bg-black w-full h-full"
            ></motion.nav>
            <div className="inset-0 select-none z-40 fixed flex items-center justify-center">
                <motion.nav
                    tabIndex={-1}
                    ref={modalRef}
                    onKeyDown={(e) => e.key === "Escape" && onClose()}
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full md:w-[870px] h-full md:h-[900px] relative"
                >
                    <div className="w-full h-full bg-white rounded-sm">
                        <div id="toolBar">
                            <ReactModule />
                        </div>
                        <input
                            className="outline-none font-default w-full px-4 py-2 text-sm placeholder:text-[#999]"
                            required
                            placeholder="제목"
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>

                        <style>{placeholderStyle}</style>
                        <ReactQuill
                            modules={modules}
                            formats={formats}
                            placeholder="내용"
                            className="w-full h-[85%] md:h-[770px] font-default"
                            theme="snow"
                            onChange={setContent}
                        />
                        <div className="flex gap-2 absolute bottom-2 right-4">
                            <ModalEditorSelect onChange={handleSetTag} />
                            <Button onClick={handleSubmit} color="confirm">
                                작성
                            </Button>
                            <Button onClick={() => setModalConfirmStatus(true)} color="danger">
                                취소
                            </Button>
                        </div>
                    </div>
                </motion.nav>
            </div>
            <ModalPortalModal>
                {modalConfirmStatus && (
                    <ModalConfirm
                        isOpen={modalConfirmStatus}
                        onClose={handleModalConfirmClose}
                        parentOnClose={onClose}
                    />
                )}
            </ModalPortalModal>
        </>
    );
};

export default ModalEditor;
