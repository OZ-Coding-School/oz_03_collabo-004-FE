import { useState } from "react";
import Header from "../common/header/Header";
import TagSkill from "../common/tag/TagSkill";
import { DUMMY_TAGS } from "../config/const";
import Toast from "../common/toast/Toast";
import { useToastStore } from "../config/store";
import Button from "../common/button/Button";
import { Link } from "react-router-dom";

const TagPage = () => {
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const { toast, setToast } = useToastStore();

    const toastHandler = () => {
        setToast(true, "최대 3개의 태그만 선택할 수 있습니다.");
    };

    const handleTagClick = (index: number) => {
        if (selectedTags.includes(index)) {
            // 선택된 태그를 클릭하면 선택 해제
            setSelectedTags(selectedTags.filter((tagIndex) => tagIndex !== index));
        } else if (selectedTags.length < 3) {
            // 3개 미만일 때만 추가
            setSelectedTags([...selectedTags, index]);
        } else {
            toastHandler();
        }
    };
    return (
        <>
            <Header />
            <div className="flex w-screen justify-center items-center min-h-screen sm:bg-transparent bg-white ">
                {toast.status && <Toast />}
                <div className="max-w-[580px] sm:bg-white sm:rounded-[40px] sm:border-2 sm:border-[#4d3e3971] gap-16 flex flex-col justify-center items-center py-14 px-10">
                    <p className="font-point text-xl sm:text-2xl text-literal-normal w-full text-center flex flex-wrap justify-center">
                        <span>내가 전문가다,&nbsp; </span> <span>훈수 태그 고르기</span>
                    </p>
                    <div className="flex flex-col gap-14">
                        <div className="grid grid-cols-3 gap-5 md:gap-3">
                            {DUMMY_TAGS.filter((tag) => tag.id !== 6).map((tag) => (
                                <TagSkill
                                    key={tag.id}
                                    tagIcon={tag.icon}
                                    tagText={tag.text}
                                    isEdit={true}
                                    isClicked={selectedTags.includes(tag.id)}
                                    onClick={() => handleTagClick(tag.id)}
                                />
                            ))}
                        </div>
                        <div>
                            <Button color="primary" className="w-full">
                                완료
                            </Button>
                            <div className="flex justify-center gap-3 font-default text-sm pt-5 px-1">
                                <p className="text-gray-500  text-center">훈수 태그는 나중에 다시 수정할 수 있어요!</p>
                                <Link to={"/"}>
                                    <p className=" text-literal-normal hover:underline cursor-pointer">
                                        지금은 넘어가기
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TagPage;
