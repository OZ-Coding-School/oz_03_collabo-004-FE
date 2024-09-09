import { useState, useEffect } from "react";
import Button from "../button/Button";
import { twMerge as tw } from "tailwind-merge";
import ProfileImage from "../profile/ProfileImage";
import { useUserStore } from "../../config/store";
import { userInfoImageUpdate, userInfoUpdate } from "../../api/account";
import { AxiosError } from "axios";

type InfoMyPageLeftProps = {
    isUserMypage: boolean;
};

const InfoMyPageLeft = ({ isUserMypage }: InfoMyPageLeftProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [bioText, setBioText] = useState("");
    const [nicknameText, setNicknameText] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const { user, updateUser, otherUser } = useUserStore();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user.nickname) setNicknameText(user.nickname);
        if (user.bio) setBioText(user.bio);
    }, [user]);

    const handleUpdate = async () => {
        if (!nicknameText.trim() || !bioText.trim()) {
            setError("*별명과 한 줄 소개 모두 작성해주세요*");
            return;
        }
        try {
            await userInfoUpdate({ nickname: nicknameText, bio: bioText });
            if (profileImage) {
                await userInfoImageUpdate(profileImage);
            }
            setIsEdit(false);
            setError(null);
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                console.error("프로필 업데이트에 실패했습니다.", error);
                if (error.response.status === 400) {
                    setError("별명이 이미 존재합니다.");
                    setIsEdit(true);
                }
            }
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfileImage(file);
            const imageUrl = URL.createObjectURL(file);
            updateUser({ profile_image: imageUrl });
        }
    };

    return (
        <form
            className={tw(
                "bg-white w-full min-w-[300px] rounded-2xl px-5 py-6 flex flex-col sticky top-20 dark:bg-gray-800 ",
                isUserMypage ? "min-h-[300px]" : "min-h-[200px]"
            )}
        >
            <div className="flex flex-col flex-grow gap-8">
                <div className="flex items-center gap-2 lg:gap-5 ">
                    {isUserMypage ? (
                        isEdit ? (
                            <>
                                <input type="file" id="profileImage" className="hidden" onChange={handleImageChange} />
                                <label
                                    htmlFor="profileImage"
                                    className="cursor-pointer w-[80px] h-[80px] flex-shrink-0 rounded-full"
                                >
                                    <div className="relative rounded-full w-[80px] h-[80px]">
                                        <ProfileImage
                                            src={
                                                user.profile_image === "/img/profile_placeholder.png" ||
                                                user.profile_image === null
                                                    ? ""
                                                    : user.profile_image
                                            }
                                        />
                                        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 rounded-full opacity-40"></div>
                                    </div>
                                </label>
                            </>
                        ) : (
                            <div className="relative rounded-full w-[80px] h-[80px] flex-shrink-0">
                                <ProfileImage
                                    src={
                                        user.profile_image === "/img/profile_placeholder.png" ||
                                        user.profile_image === null
                                            ? ""
                                            : user.profile_image
                                    }
                                />
                            </div>
                        )
                    ) : (
                        <div className="relative rounded-full w-[80px] h-[80px]">
                            <ProfileImage
                                src={
                                    otherUser.profile_image === "/img/profile_placeholder.png" ||
                                    otherUser.profile_image === null
                                        ? ""
                                        : otherUser.profile_image
                                }
                            />
                        </div>
                    )}

                    <div className="flex flex-col flex-grow gap-1">
                        <p className="px-2 text-sm font-semibold text-literal-normal dark:text-white">별명</p>
                        {isEdit ? (
                            <input
                                type="text"
                                maxLength={20}
                                defaultValue={nicknameText}
                                onChange={(e) => setNicknameText(e.target.value)}
                                className="w-full px-2 py-1 text-base text-gray-500 border border-gray-300 rounded-md focus:outline-primary-second"
                            />
                        ) : (
                            <div className="py-1 pl-2 text-base border border-transparent rounded-md text-literal-normal dark:text-white">
                                {isUserMypage ? nicknameText : otherUser.nickname}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="px-2 text-sm font-semibold text-literal-normal dark:text-white">한 줄 소개</div>
                    {isEdit ? (
                        <input
                            placeholder="한 줄 소개를 작성해주세요."
                            defaultValue={bioText}
                            maxLength={50}
                            onChange={(e) => setBioText(e.target.value)}
                            className="px-2 py-1 text-base text-gray-500 border border-gray-300 rounded-md focus:outline-primary-second"
                        />
                    ) : (
                        <div className="py-1 pl-2 text-base border border-transparent rounded-md text-literal-normal dark:text-white">
                            {isUserMypage ? bioText : otherUser.bio}
                        </div>
                    )}
                </div>
            </div>
            <p className="mb-1 text-xs font-medium text-center text-literal-highlight">{error}</p>
            {isUserMypage && (
                <Button color="primary" onClick={() => (isEdit ? handleUpdate() : setIsEdit(true))}>
                    {isEdit ? "프로필 수정 완료" : "프로필 수정"}
                </Button>
            )}
        </form>
    );
};

export default InfoMyPageLeft;
