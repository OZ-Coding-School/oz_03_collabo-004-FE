import { useState } from "react";

const InfoMyPageLeft = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    return (
        <div className="bg-white w-[387px] h-[298px] rounded-2xl px-5 py-6 flex flex-col">
            <div className="flex flex-col flex-grow gap-8">
                {isEdit ? (
                    <>
                        <div className="flex gap-5 items-center">
                            <input type="file" id="profileImage" className="hidden" />
                            <label htmlFor="profileImage" className="cursor-pointer">
                                <img
                                    src="https://dummyimage.com/80x80/000/fff"
                                    alt="user_image"
                                    className="rounded-full w-[80px] h-[80px] object-cover"
                                />
                            </label>
                            <div className="flex flex-col gap-2 flex-grow">
                                <p className="text-sm font-medium">별명</p>
                                <input
                                    type="text"
                                    value="나는 훈수왕"
                                    className=" text-sm text-literal-normal border border-gray-300 rounded-md px-2 py-1 focus:outline-primary-second"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-primary-background text-sm font-medium">소개</div>
                            <input
                                value="안녕하세요 최고의 훈수가가 되는 게 꿈입니다."
                                className="text-sm text-literal-normal border border-gray-300 rounded-md px-2 py-1 focus:outline-primary-second"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-5">
                            <img
                                src="https://dummyimage.com/80x80/000/fff"
                                alt="user_image"
                                className="rounded-full w-[80px] h-[80px]"
                            />
                            <div className="my-auto text-sm font-medium text-literal-normal">나는 훈수왕</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-primary-background text-sm font-medium">소개</div>
                            <div className="text-sm text-gray-700">안녕하세요 최고의 훈수가가 되는 게 꿈입니다.</div>
                        </div>
                    </>
                )}
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
