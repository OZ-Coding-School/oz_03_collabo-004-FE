import { useEffect, useState } from "react";
import Header from "../common/header/Header";
import Topic from "./../common/topic/Topic";
import ContentMyPage from "./../common/content/ContentMyPage";
import ContentFooter from "./../common/content/ContentFooter";
import TrendingContent from "./../common/trending/TrendingContent";
import ProfileStatus from "./../common/profile/ProfileStatus";
import TrendingComment from "./../common/trending/TrendingComment";
import ProfileImage from "./../common/profile/ProfileImage";
import WriteModal from "./../common/writeModal/WriteModal";

const HomePage = () => {
    const [isHidden, setIsHidden] = useState(false);

    const checkScreenSize = () => {
        const screenWidth = window.innerWidth;
        setIsHidden(screenWidth <= 768);
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    return (
        <>
            <div className="relative min-h-screen">
                <div className="fixed top-0 left-0 z-10 w-full">
                    <Header />
                </div>
                <div className="flex justify-center flex-1 p-4 mt-16">
                    {!isHidden && (
                        <div className="flex justify-center w-1/4">
                            <Topic />
                        </div>
                    )}
                    <div className="flex flex-col w-2/4 px-4">
                        <div className="flex items-center mb-[25px] space-x-4">
                            <ProfileImage />
                            <WriteModal />
                        </div>
                        <ProfileStatus />
                        <div className="items-center mt-2">
                            <ContentMyPage />
                            <ContentFooter />
                        </div>
                    </div>
                    {!isHidden && (
                        <div className="w-1/4 space-y-4">
                            <TrendingContent />
                            <TrendingComment />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HomePage;
