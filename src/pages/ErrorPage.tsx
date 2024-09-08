import { useNavigate } from "react-router-dom";
import Button from "../common/button/Button";
import Header from "../common/header/Header";
import { IoIosWarning } from "react-icons/io";

const ErrorPage = () => {
    const nav = useNavigate();
    return (
        <>
            <Header />
            <div className="flex flex-col w-screen justify-center items-center min-h-screen font-point text-2xl">
                <img className="mb-10" src="/img/hunsu_logo_dark.png"></img>
                <div className="flex gap-2 items-center bg-rose-100 p-2 rounded-sm border-l-4 border-l-rose-800">
                    <IoIosWarning className="text-rose-600 animate-ring" />
                    <div>주소가 잘못 되거나 요청이 잘못되었습니다.</div>
                </div>
                <Button onClick={() => nav("/", { replace: true })} className="mt-10">
                    돌아가기
                </Button>
            </div>
        </>
    );
};

export default ErrorPage;
