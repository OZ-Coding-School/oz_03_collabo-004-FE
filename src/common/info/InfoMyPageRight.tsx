import { IoMdArrowDropdown } from "react-icons/io";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import TagSkill from "../tag/TagSkill";
import { DUMMY_TAGS } from "../../config/const";
import { useToastStore, useUserStore } from "../../config/store";
import Toast from "../../common/toast/Toast";
import { userInfoUpdate } from "../../api/account";

const InfoMyPageRight = () => {
    const { toast, setToast } = useToastStore();
    const { user } = useUserStore();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const len = selectedTags.length;
    const progress = 0;

    useEffect(() => {
        setSelectedTags(user.selected_tags);
    }, [user]);

    const toastHandler = () => {
        setToast(true, "최대 3개의 태그만 선택할 수 있습니다.");
    };

    const handleTagClick = async (index: number) => {
        if (selectedTags.includes(index)) {
            // 선택된 태그를 클릭하면 선택 해제
            setSelectedTags(selectedTags.filter((tagIndex) => tagIndex !== index));
        } else if (selectedTags.length < 3) {
            setSelectedTags([...selectedTags, index]);
        } else {
            toastHandler();
        }
    };

    const handleTagUpdate = async () => {
        await userInfoUpdate({ selected_tags: selectedTags });
        setIsEdit(false);
    };

    return (
        <div className="bg-white w-full min-w-[300px] rounded-2xl py-6 px-10 flex-col">
            {toast.status && <Toast />}
            <div className="flex mb-6">
                <div className="font-point font-bold text-lg text-literal-normal">
                    훈수 레벨 : LV {user.hunsoo_level}
                </div>
                <div className="flex flex-col items-end font-default text-xs ml-auto">
                    <p className="text-literal-normal">채택된 훈수 {user.selected_comment_count}개</p>
                    <p className="text-literal-highlight">받은 경고 {user.warning_count}건</p>
                </div>
            </div>
            <div className="w-full h-[42px]">
                <div
                    className="flex flex-col items-center rounded-full transition-all duration-300"
                    style={{ width: `${progress * 2}%` }}
                >
                    <p className="font-default text-sm text-primary-second-dark min-w-[60px] text-center">훈수 새싹</p>
                    <IoMdArrowDropdown className="text-primary-second-dark" />
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className="bg-primary-second-dark h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
            <div className="flex mt-9 mb-5 justify-between">
                <p className="font-point text-base text-literal-normal">나의 전문 훈수는</p>
                <Button
                    onClick={() => (isEdit ? handleTagUpdate() : setIsEdit(true))}
                    className={"text-xs w-13 h-6 py-1"}
                >
                    {isEdit ? "완료" : "수정"}
                </Button>
            </div>
            <div className="flex flex-wrap gap-1 md:gap-3">
                {isEdit ? (
                    DUMMY_TAGS.map((tag, index) => (
                        <TagSkill
                            key={tag.id}
                            tagIcon={tag.icon}
                            tagText={tag.text}
                            isEdit={isEdit}
                            isClicked={selectedTags.includes(index)}
                            onClick={() => handleTagClick(index)}
                        />
                    ))
                ) : len <= 0 ? (
                    <div className="font-default text-sm text-center w-full my-2">나만의 훈수 태그를 골라보세요!</div>
                ) : (
                    DUMMY_TAGS.filter((_, index) => selectedTags.includes(index)).map((tag, index) => (
                        <TagSkill
                            key={tag.id}
                            tagIcon={tag.icon}
                            tagText={tag.text}
                            isEdit={isEdit}
                            isClicked={true}
                            onClick={() => handleTagClick(index)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default InfoMyPageRight;
