import { IoMdArrowDropdown } from "react-icons/io";

const InfoMyPageRight = () => {
    const progress = 15;
    return (
        <div className="bg-white max-w-[780px] min-h-[270px] rounded-2xl py-5 px-10 flex-col">
            <div className="flex mb-4">
                <div className="font-point font-bold text-lg text-literal-normal">훈수 레벨 : LV 1</div>
                <div className="flex flex-col items-end text-gray-700 font-default text-xs ml-auto">
                    <p>채택된 훈수 1개</p>
                    <p>받은 경고 1건</p>
                </div>
            </div>
            <div className="w-full h-[42px]">
                <div
                    className="flex flex-col items-center rounded-full transition-all duration-300"
                    style={{ width: `${progress * 2}%` }}
                >
                    <p className="font-default text-sm text-primary-second-dark">손님</p>
                    <IoMdArrowDropdown className="text-primary-second-dark" />
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className="bg-primary-second-dark h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
            <div className="flex flex-col mt-9">
                <p className="font-point text-base text-literal-normal mb-4">나의 전문 훈수는</p>
            </div>
        </div>
    );
};

export default InfoMyPageRight;
