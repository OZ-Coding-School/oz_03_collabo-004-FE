import { IoMdArrowDropdown } from "react-icons/io";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import TagSkill from "../tag/TagSkill";
import { DUMMY_TAGS } from "../../config/const";
import { useUserStore } from "../../config/store";
import { userInfoUpdate } from "../../api/account";
import useLevelTitle from "../../hooks/useLevelTitle";
import { AnimatePresence, motion } from "framer-motion";
import { IoWarning } from "react-icons/io5";

type InfoMyPageLeftProps = {
    isUserMypage: boolean;
};

const InfoMyPageRight = ({ isUserMypage }: InfoMyPageLeftProps) => {
    const { user, otherUser } = useUserStore();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const len = selectedTags.length;
    const progress = user.exp;
    const userLevel = isUserMypage ? user.hunsoo_level : otherUser.hunsoo_level;
    const levelTitle = useLevelTitle(userLevel);
    const [isAlert, setIsAlert] = useState(false);
    const [alertText, setAlertText] = useState<null | string>(null);

    const alertHandler = (text: string) => {
        setIsAlert(true);
        setAlertText(text);
    };

    useEffect(() => {
        setSelectedTags(user.selected_tags);
    }, [user]);

    const handleTagClick = (index: number) => {
        if (selectedTags.includes(index)) {
            // 선택된 태그를 클릭하면 선택 해제
            setSelectedTags(selectedTags.filter((tagIndex) => tagIndex !== index));
        } else if (selectedTags.length < 3) {
            setSelectedTags([...selectedTags, index]);
        } else {
            alertHandler("태그는 3개까지 선택 가능합니다.");
        }
    };

    const handleTagUpdate = async () => {
        await userInfoUpdate({ selected_tags: selectedTags });
        setIsEdit(false);
    };

    useEffect(() => {
        if (isAlert) {
            const timer = setTimeout(() => {
                setIsAlert(false);
                setAlertText(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isAlert]);

    return (
        <div className="bg-white w-full min-w-[300px] md:mt-10 rounded-2xl py-6 px-10 flex-col relative dark:bg-gray-800">
            <div className="flex mb-6">
                <div className="text-lg font-bold font-point text-literal-normal dark:text-white">
                    훈수 레벨 : LV {isUserMypage ? user.hunsoo_level : otherUser.hunsoo_level}
                </div>
                <div className="flex flex-col items-end ml-auto font-default">
                    <p className="text-literal-info dark:text-primary-second-dark">
                        채택된 훈수 {isUserMypage ? user.selected_comment_count : otherUser.selected_comment_count}개
                    </p>
                    <p className="text-literal-highlight">
                        받은 경고 {isUserMypage ? user.warning_count : otherUser.warning_count}건
                    </p>
                </div>
                <AnimatePresence>
                    {isAlert && (
                        <motion.div
                            initial={{ translateY: -100 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: -100 }}
                            transition={{ type: "spring", duration: 1 }}
                            className="absolute top-0 flex items-center gap-2 p-2 bg-orange-600 rounded-lg text-background"
                        >
                            <IoWarning />
                            <div>{alertText}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {isUserMypage && (
                <div className="relative w-full h-11">
                    <div
                        className="absolute flex flex-col items-center transition-all duration-300"
                        style={{
                            left: `${progress}%`,
                            transform: "translateX(-50%)",
                            bottom: "20px",
                        }}
                    >
                        <p className="text-sm font-medium text-center font-default text-primary-second-dark min-w-24">
                            {levelTitle}
                        </p>
                        <IoMdArrowDropdown className="text-primary-second-dark" />
                    </div>
                    <div className="absolute bottom-0 w-full h-2 bg-gray-100 rounded-full">
                        <div
                            className="h-full transition-all duration-300 rounded-full bg-primary-second-dark"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            <div className="flex justify-between mb-5 mt-9">
                <p className="text-lg font-point text-literal-normal dark:text-white">
                    {isUserMypage ? "나의 전문 훈수는" : <>' {otherUser.nickname} ' 님의 전문 훈수</>}
                </p>
                {isUserMypage && (
                    <Button
                        onClick={() => (isEdit ? handleTagUpdate() : setIsEdit(true))}
                        className={"text-sm w-13 h-6 flex justify-center items-center"}
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
                        <div className="w-full my-2 text-sm text-center font-default">
                            나만의 훈수 태그를 골라보세요!
                        </div>
                    ) : (
                        DUMMY_TAGS.filter((tag) => tag.id !== 8)
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
