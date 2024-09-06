import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ModalProps } from "../../config/types";
import Button from "../button/Button";
import ModalEditorSelect from "./ModalEditorSelect";
import { articleApi } from "../../api";
import { ModalPortalModal } from "../../config/ModalPortalModal";
import ModalConfirm from "./ModalConfirm";
import { useArticleStore, useImageStore } from "../../config/store";
import TipTapEditor from "../editor/Editor";

const ModalEditor = ({ onClose, isOpen, parent }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState(4);
    const [modalConfirmStatus, setModalConfirmStatus] = useState(false);
    const { initArticle } = useArticleStore();
    const { image, resetImage } = useImageStore();

    const handleModalConfirmClose = () => {
        setModalConfirmStatus(false);
    };

    const handleSubmit = async () => {
        await articleApi.articleCreate(title, content, tags, image.id ? image.id : null);
        const responseArticle = await articleApi.articleList();
        console.log("전송된 이미지", image);
        resetImage();
        initArticle(responseArticle.data);
        onClose();
    };

    const handleSetTag = (number: number) => {
        setTags(number);
    };

    useEffect(() => {
        const parentElement = document.querySelector("." + parent);
        const headerElement = document.querySelector(".header");

        let scrollY = 0;

        if (isOpen) {
            //? 현재 스크롤 위치 저장
            scrollY = window.scrollY;

            //? 스크롤을 0으로 설정 (모달이 열릴 때)
            window.scrollTo(0, 0);

            //? 스크롤을 고정하고 화면을 고정
            document.body.style.overflowY = "hidden";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";

            //? 부모 및 헤더에 blur 효과 추가
            parentElement?.classList.add("blur-[2px]");
            headerElement?.classList.add("blur-[2px]");
        }

        return () => {
            //? 모달이 닫힐 때 블러 제거
            parentElement?.classList.remove("blur-[2px]");
            headerElement?.classList.remove("blur-[2px]");

            //? 저장된 스크롤 위치로 복원
            const storedScrollY = parseInt(document.body.style.top || "0") * -1;

            //? 스크롤 및 위치 복원
            document.body.style.overflowY = "scroll";
            document.body.style.top = "";
            document.body.style.width = "";

            //? 저장된 스크롤 위치로 이동
            window.scrollTo(0, storedScrollY);
        };
    }, [isOpen, parent]);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed flex justify-center inset-0 bg-black w-full h-full"
            ></motion.nav>
            <div className="inset-0 select-none z-40 fixed flex items-center justify-center p-4">
                <motion.nav
                    tabIndex={-1}
                    ref={modalRef}
                    onKeyDown={(e) => e.key === "Escape" && onClose()}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col"
                >
                    <div className="flex-grow overflow-hidden p-4">
                        <TipTapEditor
                            onTitleChange={(title) => setTitle(title)}
                            onContentChange={(content) => setContent(content)}
                        />
                    </div>

                    <div className="flex justify-end items-center gap-2 p-4">
                        <ModalEditorSelect onChange={handleSetTag} />
                        <Button onClick={handleSubmit} color="confirm">
                            작성
                        </Button>
                        <Button onClick={() => setModalConfirmStatus(true)} color="danger">
                            취소
                        </Button>
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
