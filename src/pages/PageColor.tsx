import { Link } from "react-router-dom";

const PageColor = () => {
    return (
        <div className="select-none font-default bg-black w-full h-[100vh] p-10">
            <Link
                to={"/"}
                className="font-point text-lg p-2 rounded-md bg-primary-background-second hover:bg-primary-background transition text-white"
            >
                돌아가기
            </Link>
            <div className="text-2xl text-white pt-10 pb-10 select-none">Color</div>
            <div className="flex flex-col gap-4">
                <div className="flex">
                    <div className="w-[150px] h-[150px] bg-primary p-2 text-white">Primary</div>
                    <div className="w-[150px] h-[150px] bg-background p-2">Background</div>
                    <div className="w-[150px] h-[150px] bg-gray-100 p-2 ">gray-100</div>
                    <div className="w-[150px] h-[150px] bg-gray-200 p-2 ">gray-200</div>
                    <div className="w-[150px] h-[150px] bg-gray-300 p-2 ">gray-300</div>
                    <div className="w-[150px] h-[150px] bg-gray-400 p-2 ">gray-400</div>
                    <div className="w-[150px] h-[150px] bg-gray-600 p-2 ">gray-600</div>
                </div>
                <div className="flex">
                    <div className="w-[150px] h-[150px] bg-primary-second p-2 ">primary-second</div>
                    <div className="w-[150px] h-[150px] bg-primary-second-dark p-2">primary-second-dark</div>
                    <div className="w-[150px] h-[150px] bg-primary-background p-2 text-white">primary-background</div>
                    <div className="w-[150px] h-[150px] bg-primary-background-second p-2 text-white">
                        primary-background-second
                    </div>
                </div>
                <div className="flex">
                    <div className="w-[150px] h-[150px] bg-literal-normal p-2 text-white">literal-normal</div>
                    <div className="w-[150px] h-[150px] bg-literal-error p-2 text-white">literal-error</div>
                    <div className="w-[150px] h-[150px] bg-literal-star p-2 text-white">literal-star</div>
                    <div className="w-[150px] h-[150px] bg-literal-highlight p-2 text-white">literal-highlight</div>
                    <div className="w-[150px] h-[150px] bg-literal-info p-2 text-white">literal-info</div>
                    <div className="w-[150px] h-[150px] bg-literal-confirm p-2 text-white">literal-confirm</div>
                </div>
                <div className="flex">
                    <div className="w-[150px] h-[150px] bg-slate-100 p-2">slate-100</div>
                    <div className="w-[150px] h-[150px] bg-slate-200 p-2">slate-200</div>
                    <div className="w-[150px] h-[150px] bg-slate-300 p-2">slate-300</div>
                    <div className="w-[150px] h-[150px] bg-slate-400 p-2">slate-400</div>
                    <div className="w-[150px] h-[150px] bg-slate-600 p-2">slate-600</div>
                </div>
            </div>
        </div>
    );
};

export default PageColor;
