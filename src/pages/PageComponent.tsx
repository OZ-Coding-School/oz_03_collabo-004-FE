import { Link } from "react-router-dom";
import TagSkill from "../common/tag/TagSkill";
import { FaGamepad } from "react-icons/fa";
import InfoMyPageLeft from "../common/info/InfoMyPageLeft";
import InfoMyPageRight from "../common/info/InfoMyPageRight";

const PageComponent = () => {
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
        <div className="select-none font-default bg-black w-full h-[100vh] p-10">
            <Link
                to={"/"}
                className="font-point text-lg p-2 rounded-md bg-primary-background-second hover:bg-primary-background transition text-white"
            >
                돌아가기
            </Link>
            ;
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
    );
};

export default PageComponent;
