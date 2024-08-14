import { Link } from "react-router-dom";
import Button from "../common/button/Button";
import ButtonLogin from "../common/button/ButtonLogin";

const PageComponent = () => {
    return (
        <div className="select-none font-default bg-black w-full h-[100vh] p-10">
            <Link
                to={"/"}
                className="font-point text-lg p-2 rounded-md bg-primary-background-second hover:bg-primary-background transition text-white"
            >
                돌아가기
            </Link>
            <div className="mt-4 flex gap-2">
                <Button>Continue</Button>
                <Button color="danger">Danger</Button>
                <Button color="info">Info</Button>
                <Button color="confirm">Confirm</Button>
                <Button color="primary">Primary</Button>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                <ButtonLogin type="normal" />
                <ButtonLogin type="social" />
            </div>
        </div>
    );
};

export default PageComponent;
