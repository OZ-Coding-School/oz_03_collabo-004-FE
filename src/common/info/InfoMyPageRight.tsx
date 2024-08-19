import { IoMdArrowDropdown } from "react-icons/io";
import Button from "../button/Button";
import { useState } from "react";
import TagSkill from "../tag/TagSkill";
import { DUMMY_TAGS } from "../../config/const";

const InfoMyPageRight = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const progress = 15;
    const len = 0;

    return (
        <div className="bg-white max-w-[780px] min-h-[270px] rounded-2xl py-5 px-10 flex-col">
            <div className="flex mb-4">
                <div className="font-point font-bold text-lg text-literal-normal">훈수 레벨 : LV 1</div>
                <div className="flex flex-col items-end font-default text-xs ml-auto">
                    <p className="text-literal-normal">채택된 훈수 1개</p>
                    <p className="text-literal-highlight">받은 경고 1건</p>
                </div>
            </div>
            <div className="w-full h-[42px]">
                <div
                    className="flex flex-col items-center rounded-full transition-all duration-300"
                    style={{ width: `${progress * 2}%` }}
                >
                    <p className="font-default text-sm text-primary-second-dark">손님</p>
                    <IoMdArrowDropdown className="text-primary-second-dark" />
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className="bg-primary-second-dark h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
            <div className="flex mt-9  mb-4 justify-between">
                <p className="font-point text-base text-literal-normal">나의 전문 훈수는</p>
                <Button onClick={() => setIsEdit(!isEdit)} className={"text-xs w-13 h-6 py-1"}>
                    {isEdit ? "완료" : "수정"}
                </Button>
            </div>
            <div className="flex flex-wrap  gap-3">
                {isEdit ? (
                    DUMMY_TAGS.map((tag) => <TagSkill key={tag.id} tagIcon={tag.icon} tagText={tag.text} />)
                ) : len <= 0 ? (
                    <div className="font-default text-sm text-center w-full my-2">나만의 훈수 태그를 골라보세요!</div>
                ) : null}
            </div>
        </div>
    );
};

export default InfoMyPageRight;
