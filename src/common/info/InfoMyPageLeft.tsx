import { useState } from "react";
import Button from "../button/Button";
import ProfileImage from "../profile/ProfileImage";

const InfoMyPageLeft = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [bioText, setBioText] = useState("");
    const [nicknameText, setNicknameText] = useState("");

    return (
        <div className="bg-white w-full min-w-[300px] min-h-[298px] rounded-2xl px-5 py-6 flex flex-col sticky top-5">
            <div className="flex flex-col flex-grow gap-8">
                <div className="flex gap-5 items-center">
                    {isEdit ? (
                        <>
                            <input type="file" id="profileImage" className="hidden" />
                            <label htmlFor="profileImage" className="cursor-pointer w-[80px] h-[80px] flex-shrink-0">
                                <img
                                    src="https://dummyimage.com/80x80/000/fff"
                                    alt="user_image"
                                    className="rounded-full w-[80px] h-[80px] object-cover"
                                />
                            </label>
                        </>
                    ) : (
                        <ProfileImage />
                    )}

                    <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm px-2 font-semibold text-literal-normal">별명</p>
                        {isEdit ? (
                            <input
                                type="text"
                                value={nicknameText}
                                className="text-base text-gray-500 border border-gray-300 rounded-md px-2 py-1 focus:outline-primary-second w-full"
                            />
                        ) : (
                            <div className="text-base text-literal-normal border border-transparent rounded-md px-2 py-1">
                                나는 훈수왕
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-literal-normal text-sm font-semibold px-2">한 줄 소개</div>
                    {isEdit ? (
                        <input
                            value={bioText}
                            maxLength={50}
                            onChange={(e) => setBioText(e.target.value)}
                            className="text-base text-gray-500 border border-gray-300 rounded-md px-2 py-1 focus:outline-primary-second"
                        />
                    ) : (
                        <div className="text-base text-literal-normal border border-transparent rounded-md px-2 py-1">
                            {/* 안녕하세요 최고의 훈수가가 되는 게 꿈입니다. */}
                            {bioText}
                        </div>
                    )}
                </div>
            </div>
            <Button color="primary" onClick={() => setIsEdit(!isEdit)}>
                {isEdit ? "프로필 수정 완료" : "프로필 수정"}
            </Button>
        </div>
    );
};

export default InfoMyPageLeft;
