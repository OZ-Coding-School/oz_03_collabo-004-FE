import { useState } from "react";

const InfoMyPageLeft = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    return (
        <div className="bg-white w-[387px] min-h-[298px] rounded-2xl px-5 py-6 flex flex-col">
            <div className="flex flex-col flex-grow gap-8">
                <div className="flex gap-5 items-center">
                    <input type="file" id="profileImage" className="hidden" />
                    <label htmlFor="profileImage" className="cursor-pointer">
                        <img
                            src="https://dummyimage.com/80x80/000/fff"
                            alt="user_image"
                            className="rounded-full w-[80px] h-[80px] object-cover"
                        />
                    </label>
                    <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm px-2 font-semibold text-literal-normal">별명</p>
                        {isEdit ? (
                            <input
                                type="text"
                                defaultValue="나는 훈수왕"
                                className="text-base text-gray-500 border border-gray-300 rounded-md px-2 py-1 focus:outline-primary-second"
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
                            defaultValue="안녕하세요 최고의 훈수가가 되는 게 꿈입니다."
                            className="text-base text-gray-500 border border-gray-300 rounded-md px-2 py-1 focus:outline-primary-second"
                        />
                    ) : (
                        <div className="text-base text-literal-normal border border-transparent rounded-md px-2 py-1">
                            안녕하세요 최고의 훈수가가 되는 게 꿈입니다.
                        </div>
                    )}
                </div>
            </div>
            <button
                onClick={() => setIsEdit(!isEdit)}
                className="bg-primary-second py-2 rounded-md text-sm hover:bg-primary-second-dark"
            >
                {isEdit ? "프로필 수정 완료" : "프로필 수정"}
            </button>
        </div>
    );
};

export default InfoMyPageLeft;
