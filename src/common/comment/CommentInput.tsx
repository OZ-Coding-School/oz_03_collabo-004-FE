import { FaArrowCircleUp, FaImage } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import ProfileImage from "../profile/ProfileImage";
import { useUserStore } from "../../config/store";
import { useForm } from "react-hook-form";
import { twMerge as tw } from "tailwind-merge";
import { commentCreate } from "../../api/comment";
import { CommentFormData, MyComment } from "../../config/types";
import { AxiosError } from "axios";
import { motion } from "framer-motion";

interface CommentInputProps {
    onClose?: () => void;
    articleId?: number;
    onCommentSubmit: (newComments: MyComment) => void;
    toast: (text: string) => void;
}

const CommentInput = ({ onClose = () => {}, articleId, onCommentSubmit, toast }: CommentInputProps) => {
    const [preview, setPreview] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]); // 실제 파일 상태
    const { user } = useUserStore();
    const { register, handleSubmit, reset, setFocus, watch } = useForm<CommentFormData>({
        defaultValues: {
            content: "",
            images: null,
        },
    });

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
            return;
        }
    };

    useEffect(() => {
        setFocus("content");
    }, [setFocus]);

    const onSubmit = async (data: CommentFormData) => {
        if (!data.content.trim()) {
            toast("내용을 입력해주세요.");
            return;
        }
        const formData = new FormData();
        formData.append("content", data.content);

        files.forEach((file) => {
            formData.append("images", file);
        });

        try {
            const response = await commentCreate(articleId, formData);
            const newComment: MyComment = response.data;
            onCommentSubmit(newComment);
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                console.error("훈수작성 실패", error);
                if (error.response.status === 401) {
                    toast("로그인 후 사용가능합니다.");
                } else if (error.response.status === 400) {
                    toast("잘못된 요청입니다. 다시 시도해주세요.");
                }
            }
        }
        reset();
        setPreview([]);
        setFiles([]);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length <= 3) {
            const newPreviews = Array.from(selectedFiles).map((file) => URL.createObjectURL(file));
            setPreview((prevPreviews) => [...prevPreviews, ...newPreviews]);
            setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setPreview((img) => img.filter((_, i) => i !== index));
        setFiles((file) => file.filter((_, i) => i !== index));
    };

    const titleValue = watch("content");
    useEffect(() => {
        const textarea = document.querySelector<HTMLTextAreaElement>("textarea[name='content']");
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [titleValue]);

    return (
        <motion.div animate={{ opacity: [0, 1] }} transition={{ delay: 0.3 }} className="flex gap-2">
            <div className="w-12 self-start">
                <div className="size-12 relative">
                    {user.profile_image ? (
                        <img
                            src={user.profile_image}
                            alt="user_image"
                            className="rounded-full w-full h-full object-cover"
                        />
                    ) : (
                        <ProfileImage src={user.profile_image} />
                    )}
                </div>
            </div>
            <form className="bg-gray-100 border-none rounded-[5px] py-2 px-4 text-left w-full flex flex-col gap-2">
                <textarea
                    className="bg-transparent w-full focus:outline-none py-1 resize-none overflow-hidden"
                    onKeyDown={handleKeyDown}
                    placeholder="훈수를 작성해주세요."
                    rows={1}
                    {...register("content")}
                />

                <div className="flex gap-2 flex-wrap">
                    {preview.map((src, index) => (
                        <div key={index} className="relative size-20">
                            <img src={src} alt={`preview-${index}`} className="object-cover w-full h-full rounded" />
                            <IoCloseCircleSharp
                                onClick={() => handleRemoveImage(index)}
                                className="absolute size-5 top-0 right-0 text-literal-highlight cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

                <div className={tw("flex items-center justify-between mt-2", preview.length >= 3 && "justify-end")}>
                    {preview.length < 3 && (
                        <label className="cursor-pointer flex items-center">
                            <FaImage className="text-primary-background-second hover:text-primary-background mr-2" />
                            <span className="text-sm text-gray-500">사진 추가</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                {...register("images", { onChange: handleImageChange })}
                            />
                        </label>
                    )}

                    <FaArrowCircleUp
                        onClick={handleSubmit(onSubmit)}
                        className="size-6 cursor-pointer text-primary-background-second hover:text-primary-background"
                    />
                </div>
            </form>
        </motion.div>
    );
};

export default CommentInput;
