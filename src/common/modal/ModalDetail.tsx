import { motion } from "framer-motion";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { ModalProps } from "../../config/types";
import Badge from "../badge/Badge";
import WriteModal from "../comment/CommentInput";
import Comment from "../comment/Comment";
import useFormatDate from "../../hooks/useFormatDate";

const ModalDetail = ({ onClose, isOpen, parent, articleData }: ModalProps) => {
    useEffect(() => {
        const parentElement = document.querySelector("." + parent);
        const headerElement = document.querySelector(".header");

        if (isOpen) {
            document.body.style.overflowY = "hidden";
            parentElement?.classList.add("blur-[2px]");
            headerElement?.classList.add("blur-[2px]");
        }

        return () => {
            document.body.style.overflowY = "scroll";
            parentElement?.classList.remove("blur-[2px]");
            headerElement?.classList.remove("blur-[2px]");
        };
    }, [isOpen, parent]);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed flex justify-center items-center inset-0 bg-black w-full h-full"
            ></motion.nav>

            <div
                onClick={onClose}
                className="text-literal-normal inset-0 font-default fixed flex items-center justify-center md:px-3 z-[40] md:z-auto"
            >
                <motion.nav
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full h-[100vh] md:w-[870px] md:max-h-[90vh] md:rounded-3xl md:mt-10 bg-white relative py-10 px-14 overflow-auto"
                >
                    <div className="flex flex-col gap-2 min-w-[300px]">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                {articleData?.tags.map((tag) => (
                                    <Badge key={tag.tag_id} color="yellow">
                                        {tag.name.slice(0, -2)}
                                    </Badge>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500">수정 / 삭제</div>
                        </div>
                        <div className="text-gray-500 text-sm">{useFormatDate(articleData?.created_at)}</div>
                        <div className="text-xl my-2">{articleData?.title}</div>
                        <div className="mt-3 mb-10">
                            <p>{articleData?.content}</p>
                        </div>
                        <div className="my-5">
                            <WriteModal onClose={onClose} />
                        </div>
                        <div className="flex flex-col justify-end">
                            {articleData?.comments_count !== 0
                                ? articleData?.comments.map((comment) => (
                                      <Comment
                                          key={comment.id}
                                          color="default"
                                          parent="comment-parent"
                                          comment={comment}
                                      />
                                  ))
                                : null}
                        </div>
                    </div>
                    <IoClose
                        onClick={onClose}
                        title="닫기"
                        className="absolute text-gray-400 hover:text-gray-800 transition cursor-pointer w-[28px] h-[28px] top-2 right-2"
                    />
                </motion.nav>
            </div>
        </>
    );
};

export default ModalDetail;
