import { Link } from "react-router-dom";

const PageComponent = () => {
    return (
        <div className="select-none font-default bg-black w-full h-[100vh] p-10">
            <Link
                to={"/"}
                className="font-point text-lg p-2 rounded-md bg-primary-background-second hover:bg-primary-background transition text-white"
            >
                돌아가기
            </Link>
            ;
        </div>
    );
};

export default PageComponent;
