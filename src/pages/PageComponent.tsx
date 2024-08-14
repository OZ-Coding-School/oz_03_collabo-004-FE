import { Link } from "react-router-dom";
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

const PageComponent = () => {
    const { modal, setModal } = useModalStore();

    const toastHandler = () => {
        setModal(true);
    };

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
                <AnimatePresence>{modal && <Toast message="Test" />}</AnimatePresence>
            </div>
        </>
    );
};

export default PageComponent;
