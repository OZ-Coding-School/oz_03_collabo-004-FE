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
import ContentMyPage from "../common/content/ContentMyPage";
import { DUMMY_TAGS } from "../config/const";
import Skeleton from "../common/skeleton/Skeleton";
import SkeletonContent from "../common/skeleton/SkeletonContent";
import SkeletonTrendingContent from "../common/skeleton/SkeletonTrendingContent";
import SkeletonTrendingComment from "../common/skeleton/SkeletonTrendingComment";
import { useState } from "react";
import ModalPicture from "../common/modal/ModalPicture";
import ModalRegister from "../common/modal/ModalRegister";
import ModalLogin from "../common/modal/ModalLogin";
import ModalReport from "../common/modal/ModalReport";
import ModalDelete from "../common/modal/ModalDelete";

const PageComponent = () => {
    const [picture, setPicture] = useState(false);
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);
    const [report, setReport] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const { modal, setModal } = useModalStore();

    const toastHandler = () => {
        setModal(true);
    };
    //? MODAL OPEN
    const pictureOpenHandler = () => {
        setPicture(true);
    };
    const registerOpenHandler = () => {
        setRegister(true);
    };
    const loginOpenHandler = () => {
        setLogin(true);
    };
    const reportOpenHandler = () => {
        setReport(true);
    };
    const deleteOpenHandler = () => {
        setDeleted(true);
    };
    //? MODAL CLOSE
    const pictureCloseHandler = () => {
        setPicture(false);
    };
    const registerCloseHandler = () => {
        setRegister(false);
    };
    const loginCloseHandler = () => {
        setLogin(false);
    };
    const reportCloseHandler = () => {
        setReport(false);
    };
    const deleteCloseHandler = () => {
        setDeleted(false);
    };
    return (
        <>
            <Header />
            <div className="pt-[100px] select-none font-default bg-background w-full h-full p-10">
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
                        {DUMMY_TAGS.map((tag) => (
                            <TagSkill key={tag.id} tagIcon={tag.icon} tagText={tag.text} />
                        ))}
            <div className="test-parent font-default">
                <div className="pt-[100px] select-none bg-background w-full p-10">
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
                    <div className="mt-4 flex gap-2">
                        <Button onClick={pictureOpenHandler}>사진 모달</Button>
                        <Button onClick={registerOpenHandler}>회원가입 모달</Button>
                        <Button onClick={loginOpenHandler}>로그인 모달</Button>
                        <Button onClick={reportOpenHandler}>신고 모달</Button>
                        <Button onClick={deleteOpenHandler}>게시글 삭제 모달</Button>
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
                    <div className="mt-2">
                        <ContentMyPage />
                    </div>
                    <div className="mt-2 flex flex-col gap-1">
                        <Skeleton size="xs" />
                        <Skeleton size="s" />
                        <Skeleton size="m" />
                        <Skeleton size="l" />
                        <Skeleton size="xl" />
                        <Skeleton size="2xl" />
                        <Skeleton size="3xl" />
                    </div>
                    <div className="mt-2">
                        <p className="text-xl mb-2">Skeleton Content 타입 1</p>
                        <SkeletonContent type="1" />
                    </div>
                    <div className="mt-2">
                        <p className="text-xl mb-2">Skeleton Content 타입 2</p>
                        <SkeletonContent type="2" />
                    </div>
                    <div className="mt-2">
                        <SkeletonTrendingContent />
                    </div>
                    <div className="mt-2">
                        <SkeletonTrendingComment />
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

                <AnimatePresence>
                    {picture && <ModalPicture parent="test-parent" isOpen={picture} onClose={pictureCloseHandler} />}
                    {register && (
                        <ModalRegister parent="test-parent" isOpen={register} onClose={registerCloseHandler} />
                    )}
                    {login && <ModalLogin parent="test-parent" isOpen={login} onClose={loginCloseHandler} />}
                    {report && <ModalReport parent="test-parent" isOpen={report} onClose={reportCloseHandler} />}
                    {deleted && <ModalDelete parent="test-parent" isOpen={deleted} onClose={deleteCloseHandler} />}
                </AnimatePresence>
            </div>
        </>
    );
};

export default PageComponent;
