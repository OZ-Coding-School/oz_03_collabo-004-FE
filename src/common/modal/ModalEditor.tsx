import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ModalProps } from "../../config/types";
import Button from "../button/Button";
import ModalEditorSelect from "./ModalEditorSelect";
import { accountApi, articleApi } from "../../api";
import { ModalPortalModal } from "../../config/ModalPortalModal";
import ModalConfirm from "./ModalConfirm";
import { useArticleStore, useImageStore, useUserStore } from "../../config/store";
import TipTapEditor from "../editor/Editor";
import { useLocation, useNavigate } from "react-router-dom";
import { IoClose, IoWarning } from "react-icons/io5";

const ModalEditor = ({ onClose, isOpen, parent }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [warning, setWarning] = useState(false);
    const [warningTitle, setWarningTitle] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState(4);
    const [modalConfirmStatus, setModalConfirmStatus] = useState(false);
    const { initArticle, article } = useArticleStore();
    const { image, resetImage } = useImageStore();
    const { user, initUser } = useUserStore();
    const location = useLocation();
    const nav = useNavigate();
    const editorFormURL = new URLSearchParams(location.search).get("editor");

    useEffect(() => {
        const initEditor = (id: number) => {
            if (article) {
                const selectData = article.find((item) => item.article_id === id);

                setTitle(selectData?.title as string);
                setContent(selectData?.content as string);
            }
        };

        if (editorFormURL === "new") return;
        if (!user.articles.find((item) => item.article_id === Number(editorFormURL))) {
            return nav("/");
        } else {
            initEditor(Number(editorFormURL));
        }
    }, [editorFormURL, user.articles, nav, article]);

    const handleModalConfirmClose = () => {
        setModalConfirmStatus(false);
    };

    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => {
                setWarning(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [warning]);

    const handleSubmit = async () => {
        if (title.trim() === "") {
            setWarning(true);
            setWarningTitle("제목을 작성 해주세요");
            return;
        }
        if (content.trim() === "") {
            setWarning(true);
            setWarningTitle("내용을 작성 해주세요");
            return;
        }

        if (editorFormURL !== "new") {
            const doc = new DOMParser().parseFromString(content, "text/html");
            const currentImagesAlt = Array.from(doc.images).map((img) => img.alt);

            onClose();
            await articleApi.articleRePost(
                title,
                content,
                tags,
                currentImagesAlt ? currentImagesAlt : [],
                Number(editorFormURL)
            );
            resetImage();
            const responseArticle = await articleApi.articleList();
            initArticle(responseArticle.data);
            return;
        }

        onClose();
        await articleApi.articleCreate(title, content, tags, image.id ? image.id : []);
        const responseArticle = await articleApi.articleList();
        const responseUser = await accountApi.userInfo();
        resetImage();
        initArticle(responseArticle.data);
        initUser(responseUser.data);
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

    const handleArticleCancel = () => {
        setModalConfirmStatus(true);
    };

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
                    onKeyDown={(e) => e.key === "Escape" && setModalConfirmStatus(true)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="dark:bg-gray-900 relative outline-none w-full xl:max-w-4xl h-full xl:max-h-[90vh] bg-white xl:rounded-lg shadow-xl flex flex-col"
                >
                    <div className=" flex-grow overflow-hidden p-4">
                        <TipTapEditor
                            initialTitle={title}
                            initialContent={content}
                            onTitleChange={(title) => setTitle(title)}
                            onContentChange={(content) => setContent(content)}
                        />
                    </div>

                    <div className="flex justify-end items-center gap-2 p-4">
                        <ModalEditorSelect onChange={handleSetTag} />
                        <Button onClick={handleSubmit} color="confirm">
                            작성
                        </Button>
                        <Button onClick={handleArticleCancel}>취소</Button>
                    </div>
                    <IoClose
                        onClick={handleArticleCancel}
                        title="닫기"
                        className="absolute dark:hover:text-gray-100 text-gray-400 hover:text-gray-800 transition cursor-pointer w-[28px] h-[28px] top-2 right-2"
                    />
                </motion.nav>
                <AnimatePresence>
                    {warning && (
                        <motion.div
                            initial={{ translateY: -100 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: -100 }}
                            transition={{ type: "spring", duration: 1 }}
                            className="flex items-center gap-2 bg-opacity-75 bg-orange-600 p-2 rounded-lg absolute top-4 text-background"
                        >
                            <IoWarning />
                            <div>{warningTitle}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
