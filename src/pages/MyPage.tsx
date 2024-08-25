import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import ContentMyPage from "../common/content/ContentMyPage";
import InfoMyPageLeft from "../common/info/InfoMyPageLeft";
import InfoMyPageRight from "../common/info/InfoMyPageRight";
const MyPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const activeTabStyle = "border-b-primary-second-dark text-primary-second-dark";
    const defaultTabStyle =
        "w-[50%] text-center mt-3 py-5 border-b text-gray-400 cursor-pointer transition-colors duration-300 text-sm font-medium";

    return (
        <div className="max-w-[1280px] mx-auto py-4 px-3 ">
            <div className="flex flex-col gap-3 md:flex-row md:justify-evenly">
                <div className="md:mr-3 md:w-[387px]">
                    <InfoMyPageLeft />
                </div>
                <div className="flex flex-col w-full md:w-[780px]">
                    <InfoMyPageRight />
                    <div className="flex max-w-[780px] font-default min-w-[300px]">
                        <p
                            onClick={() => setActiveTab(0)}
                            className={tw(
                                defaultTabStyle,
                                activeTab === 0 ? activeTabStyle : "border-b-gray-300 hover:text-primary-second-dark"
                            )}
                        >
                            요청한 훈수
                        </p>
                        <p
                            onClick={() => setActiveTab(1)}
                            className={tw(
                                defaultTabStyle,
                                activeTab === 1 ? activeTabStyle : "border-b-gray-300 hover:text-primary-second-dark"
                            )}
                        >
                            작성한 훈수
                        </p>
                    </div>
                    <div className="my-5">{activeTab === 0 && <ContentMyPage />}</div>
                    <div className="my-5">{activeTab === 0 && <ContentMyPage />}</div>
                    <div className="my-5">{activeTab === 0 && <ContentMyPage />}</div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
