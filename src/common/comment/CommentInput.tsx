import { FaArrowCircleUp, FaImage } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import ProfileImage from "../profile/ProfileImage";
import { useUserStore } from "../../config/store";
import { useForm } from "react-hook-form";
import { twMerge as tw } from "tailwind-merge";
import { commentCreate } from "../../api/comment";
import { CommentFormData, MyComment } from "../../config/types";

interface CommentInputProps {
    onClose?: () => void;
    articleId?: number;
    onCommentSubmit: (newComments: MyComment) => void;
}

const CommentInput = ({ onClose = () => {}, articleId, onCommentSubmit }: CommentInputProps) => {
    const [preview, setPreview] = useState<string[]>([]);
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
        const formData = new FormData();
        formData.append("content", data.content);
        if (data.images) {
            Array.from(data.images).forEach((file) => {
                formData.append("images", file);
            });
        }
        try {
            const response = await commentCreate(articleId, formData);
            const newComment: MyComment = response.data;
            onCommentSubmit(newComment);
        } catch (error) {
            console.error("훈수작성 실패", error);
        }
        reset();
        setPreview([]);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length <= 3) {
            const previews = Array.from(files).map((file) => URL.createObjectURL(file));
            setPreview((prevPreviews) => [...prevPreviews, ...previews]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setPreview((img) => img.filter((_, i) => i !== index));
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
        <div className="flex gap-2">
            <div className="w-12 self-start">
                <div className="size-12">
                    {user.profile_image ? (
                        <img
                            src={user.profile_image}
                            alt="user_image"
                            className="rounded-full w-full h-full object-cover"
                        />
                    ) : (
                        <ProfileImage />
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
        </div>
    );
};

export default CommentInput;
