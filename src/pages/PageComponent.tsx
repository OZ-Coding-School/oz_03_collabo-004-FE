import { Link } from "react-router-dom";
import TagSkill from "../common/tag/TagSkill";
import InfoMyPageLeft from "../common/info/InfoMyPageLeft";
import InfoMyPageRight from "../common/info/InfoMyPageRight";
import Button from "../common/button/Button";
import ButtonLogin from "../common/button/ButtonLogin";
import Badge from "../common/badge/Badge";
import BadgeTopic from "../common/badge/BadgeTopic";
import ProfileImage from "../common/profile/ProfileImage";
import ProfileStatus from "../common/profile/ProfileStatus";
import Header from "../common/header/Header";
import Toast from "../common/toast/Toast";
import { useModalStore } from "../config/store";
import { AnimatePresence } from "framer-motion";
import { FaGamepad } from "react-icons/fa";

const PageComponent = () => {
    const { modal, setModal } = useModalStore();

    const toastHandler = () => {
        setModal(true);
    };
    const dummyTags = [
        { id: 0, icon: <FaGamepad />, text: "연애 훈수" },
        { id: 1, icon: <FaGamepad />, text: "집안일 훈수" },
        { id: 2, icon: <FaGamepad />, text: "고민 훈수" },
        { id: 3, icon: <FaGamepad />, text: "소소 훈수" },
        { id: 4, icon: <FaGamepad />, text: "상상 훈수" },
        { id: 5, icon: <FaGamepad />, text: "패션 훈수" },
        { id: 6, icon: <FaGamepad />, text: "게임 훈수" },
        { id: 7, icon: <FaGamepad />, text: "교육 훈수" },
    ];

    return (
        <>
            <Header />
            <div className="pt-[100px] select-none font-default bg-background w-full h-[200vh] p-10">
                <Link
                    to={"/"}
                    className="font-point text-lg p-2 rounded-md bg-primary-background-second hover:bg-primary-background transition text-white"
                >
                    돌아가기
                </Link>
                <div className="text-2xl mt-4">Buttons</div>
                <div className="mt-4 flex gap-2">
                    <Button>Continue</Button>
                    <Button color="danger">Danger</Button>
                    <Button color="info">Info</Button>
                    <Button color="confirm">Confirm</Button>
                    <Button color="primary">Primary</Button>
                    <Button onClick={toastHandler}>Toast Test</Button>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <ButtonLogin type="normal" />
                    <ButtonLogin type="social" />
                </div>
                <div className="text-2xl mt-4">Badges</div>
                <div className="mt-4 flex gap-2">
                    <Badge>댓글</Badge>
                    <Badge>싫어요</Badge>
                    <Badge>조회수</Badge>
                    <Badge>좋아요</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                    <Badge color="yellow">연애</Badge>
                    <Badge color="yellow">상상</Badge>
                    <Badge color="yellow">게임</Badge>
                    <Badge color="yellow">고민</Badge>
                    <Badge color="yellow">집안일</Badge>
                    <Badge color="yellow">패션</Badge>
                    <Badge color="yellow">교육</Badge>
                    <Badge color="yellow">소소</Badge>
                </div>
                <div className="mt-4 flex">
                    <BadgeTopic />
                </div>
                <div className="mt-4 flex gap-4">
                    <div className="w-[50px] h-[50px]">
                        <ProfileImage />
                    </div>

                    <ProfileStatus />
                </div>
                <div className="mt-4 flex flex-col gap-4">
                    <div className="bg-white p-2 m-2 flex flex-wrap gap-2">
                        {dummyTags.map((tag) => (
                            <TagSkill key={tag.id} tagIcon={tag.icon} tagText={tag.text} />
                        ))}
                    </div>
                    <div className="mt-2">
                        <InfoMyPageLeft />
                    </div>
                    <div className="mt-2">
                        <InfoMyPageRight />
                    </div>
                </div>
                <AnimatePresence>{modal && <Toast message="Test" />}</AnimatePresence>
            </div>
        </>
    );
};

export default PageComponent;
