import { IoMdArrowDropdown } from "react-icons/io";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import TagSkill from "../tag/TagSkill";
import { DUMMY_TAGS } from "../../config/const";
import { useToastStore, useUserStore } from "../../config/store";
import Toast from "../../common/toast/Toast";
import { userInfoUpdate } from "../../api/account";
import useLevelTitle from "../../hooks/useLevelTitle";

type InfoMyPageLeftProps = {
    isUserMypage: boolean;
};

const InfoMyPageRight = ({ isUserMypage }: InfoMyPageLeftProps) => {
    const { toast, setToast } = useToastStore();
    const { user, otherUser } = useUserStore();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const len = selectedTags.length;
    const progress = user.hunsoo_level;
    const userLevel = isUserMypage ? user.hunsoo_level : otherUser.hunsoo_level;
    const levelTitle = useLevelTitle(userLevel);

    useEffect(() => {
        setSelectedTags(user.selected_tags);
    }, [user]);

    const toastHandler = () => {
        setToast(true, "최대 3개의 태그만 선택할 수 있습니다.");
    };

    const handleTagClick = (index: number) => {
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
        <div className="bg-white w-full min-w-[300px] md:mt-10 rounded-2xl py-6 px-10 flex-col">
            {toast.status && <Toast />}
            <div className="flex mb-6">
                <div className="font-point font-bold text-lg text-literal-normal">
                    훈수 레벨 : LV {isUserMypage ? user.hunsoo_level : otherUser.hunsoo_level}
                </div>
                <div className="flex flex-col items-end font-default text-xs ml-auto">
                    <p className="text-literal-normal">
                        채택된 훈수 {isUserMypage ? user.selected_comment_count : otherUser.selected_comment_count}개
                    </p>
                    <p className="text-literal-highlight">
                        받은 경고 {isUserMypage ? user.warning_count : otherUser.warning_count}건
                    </p>
                </div>
            </div>
            <div className="w-full h-11 relative">
                <div
                    className="absolute flex flex-col items-center transition-all duration-300"
                    style={{ left: `${progress}%`, transform: "translateX(-50%)", bottom: "20px" }}
                >
                    <p className="font-default text-sm font-medium text-primary-second-dark min-w-24 text-center">
                        {levelTitle}
                    </p>
                    <IoMdArrowDropdown className="text-primary-second-dark" />
                </div>
                <div className="absolute bottom-0 w-full bg-gray-100 rounded-full h-2">
                    <div
                        className="bg-primary-second-dark h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
            <div className="flex mt-9 mb-5 justify-between">
                <p className="font-point text-base text-literal-normal">
                    {isUserMypage ? "나의 전문 훈수는" : <>' {otherUser.nickname} ' 님의 전문 훈수</>}
                </p>
                {isUserMypage && (
                    <Button
                        onClick={() => (isEdit ? handleTagUpdate() : setIsEdit(true))}
                        className={"text-xs w-13 h-6 py-1"}
                    >
                        {isEdit ? "완료" : "수정"}
                    </Button>
                )}
            </div>
            <div className="flex flex-wrap gap-1 md:gap-3">
                {isUserMypage ? (
                    isEdit ? (
                        DUMMY_TAGS.filter((tag) => tag.id > 1 && tag.id !== 8).map((tag) => (
                            <TagSkill
                                key={tag.id}
                                tagIcon={tag.icon}
                                tagText={tag.text}
                                isEdit={true}
                                isClicked={selectedTags.includes(tag.id)}
                                onClick={() => handleTagClick(tag.id)}
                            />
                        ))
                    ) : len <= 0 ? (
                        <div className="font-default text-sm text-center w-full my-2">
                            나만의 훈수 태그를 골라보세요!
                        </div>
                    ) : (
                        DUMMY_TAGS.filter((tag) => tag.id !== 6)
                            .filter((tag) => selectedTags.includes(tag.id))
                            .map((tag) => (
                                <TagSkill
                                    key={tag.id}
                                    tagIcon={tag.icon}
                                    tagText={tag.text}
                                    isEdit={false}
                                    isClicked={true}
                                    onClick={() => handleTagClick(tag.id)}
                                />
                            ))
                    )
                ) : (
                    DUMMY_TAGS.filter((tag) => tag.id !== 6)
                        .filter((tag) => otherUser.selected_tags.includes(tag.id))
                        .map((tag) => (
                            <TagSkill
                                key={tag.id}
                                tagIcon={tag.icon}
                                tagText={tag.text}
                                isEdit={false}
                                isClicked={true}
                                onClick={() => handleTagClick(tag.id)}
                            />
                        ))
                )}
            </div>
        </div>
    );
};

export default InfoMyPageRight;
