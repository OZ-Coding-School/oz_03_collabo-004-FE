import { motion } from "framer-motion";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { ModalProps } from "../../config/types";
import Badge from "../badge/Badge";
import WriteModal from "../writeModal/WriteModal";
import Comment from "../comment/Comment";

const ModalDetail = ({ onClose, isOpen, parent }: ModalProps) => {
    useEffect(() => {
        const parentElement = document.querySelector("." + parent);
        const headerElement = document.querySelector(".header");

        if (isOpen) {
            document.body.style.overflowY = "hidden";
            parentElement?.classList.add("blur-[2px]");
            headerElement?.classList.add("blur-[2px]");
        }

        return () => {
            document.body.style.overflowY = "scroll";
            parentElement?.classList.remove("blur-[2px]");
            headerElement?.classList.remove("blur-[2px]");
        };
    }, [isOpen, parent]);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed flex justify-center items-center inset-0 bg-black w-full h-full "
            ></motion.nav>
            <div
                onClick={onClose}
                className="text-literal-normal inset-0 font-default z-60 fixed flex items-center justify-center md:px-3 comment-parent"
            >
                <motion.nav
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: [1], translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="outline-none w-full h-full md:w-[870px] md:max-h-[90vh] md:rounded-3xl bg-white relative py-10 px-14 overflow-auto "
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <Badge color="yellow">고민</Badge>
                                <Badge color="yellow">소소</Badge>
                            </div>
                            <div className="text-sm text-gray-500">수정 / 삭제</div>
                        </div>
                        <div className="text-gray-500 text-sm">2024년 08월 26일</div>
                        <div className="text-xl my-2">
                            비전공자, 전문대졸..이었던 내가 지금은 풀스택개발자입니다.. 고민상담
                        </div>
                        <div className="mt-3 mb-10">
                            <p>
                                안녕하세요, 저는 현재 중견 기업에서 팀 리더로 일하고 있는 김지훈입니다. 최근 직장에서 몇
                                가지 고민거리가 있어 도움을 요청드립니다. 상황 설명 최근 팀 내에서 업무 처리 방식과
                                관련하여 갈등이 발생했습니다. 팀원 중 한 명이 업무 처리 방식에 대해 불만을 제기하며,
                                이로 인해 팀원들 간의 의견 충돌이 잦아지고 있습니다. 구체적으로는 다음과 같은
                                상황입니다: 업무 처리 방식: 일부 팀원은 제가 설정한 업무 처리 방식을 비효율적이라고
                                생각하며, 자신만의 방식을 고집하고 있습니다. 이로 인해 프로젝트 진행 속도가 느려지고,
                                협업에 어려움을 겪고 있습니다. 의사소통 부족: 팀원들과의 의사소통이 원활하지 않아, 의견
                                조율이 어려워지고 있습니다. 특히, 특정 팀원은 회의 중에 적극적으로 의견을 제시하지
                                않으며, 후에 문제를 제기하는 경우가 많습니다. 팀 분위기: 이러한 갈등으로 인해 팀 내
                                분위기가 무겁고, 일부 팀원들은 스트레스를 많이 받고 있습니다. 팀워크가 약화되면서, 업무
                                효율성에도 부정적인 영향을 미치고 있습니다. 해결 방안 이 문제를 해결하기 위해 몇 가지
                                방안을 고려하고 있습니다: 정기적인 팀 미팅: 팀원들과의 정기적인 미팅을 통해 의견을
                                교환하고, 업무 처리 방식에 대해 함께 논의해보려 합니다. 이를 통해 갈등의 원인을 명확히
                                하고, 해결책을 모색하고자 합니다. 의사소통 개선: 팀원들 간의 의사소통을 개선하기 위해,
                                적극적인 피드백 문화를 조성하고자 합니다. 회의 중 발언의 기회를 충분히 제공하고,
                                의사소통이 원활하게 이루어질 수 있도록 노력할 것입니다. 문제 해결 워크숍: 외부 전문가를
                                초청하여 팀워크 및 갈등 해결에 대한 워크숍을 진행할 계획입니다. 이를 통해 팀원들이
                                갈등을 효과적으로 해결할 수 있는 방법을 배우고, 팀 내 협력을 강화할 수 있을 것입니다.
                                요청 사항 이러한 상황을 해결하기 위한 추가적인 조언이나 경험이 있으신 분들의 조언을 듣고
                                싶습니다. 특히, 비슷한 상황을 겪어본 경험이 있는 분들의 이야기가 큰 도움이 될 것
                                같습니다. 감사합니다.
                            </p>
                        </div>
                        <div className="my-5">
                            <WriteModal onClose={onClose} />
                        </div>
                        <div className="flex flex-col justify-end">
                            <Comment color="default" parent="comment-parent" />
                            <Comment color="default" parent="comment-parent" />
                            <Comment color="default" parent="comment-parent" />
                            <Comment color="default" parent="comment-parent" />
                        </div>
                    </div>
                    <IoClose
                        onClick={onClose}
                        title="닫기"
                        className="absolute text-gray-400 hover:text-gray-800 transition cursor-pointer w-[28px] h-[28px] top-2 right-2"
                    />
                </motion.nav>
            </div>
        </>
    );
};

export default ModalDetail;
