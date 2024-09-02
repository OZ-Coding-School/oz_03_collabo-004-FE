import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";
import ContentMyPage from "../content/ContentMyPage";
import { useOtherUserStore, useUserStore } from "../../config/store";

type TabItemProps = {
    isUserMypage: boolean;
};

const TabItem = ({ isUserMypage }: TabItemProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const { user } = useUserStore();
    const { otherUser } = useOtherUserStore();
    const activeTabStyle = "border-b-primary-second-dark text-primary-second-dark";
    const defaultTabStyle =
        "w-[50%] text-center mt-3 py-5 border-b text-gray-400 cursor-pointer transition-colors duration-300 text-sm font-medium";
    return (
        <>
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
            <div>
                {isUserMypage ? (
                    <>
                        {activeTab === 0 &&
                            user.articles.map((article) => (
                                <ContentMyPage key={article.article_id} activeTab={activeTab} article={article} />
                            ))}
                        {activeTab === 1 &&
                            user.comments.map((comment) => (
                                <ContentMyPage key={comment.id} activeTab={activeTab} comment={comment} />
                            ))}
                    </>
                ) : (
                    <>
                        {activeTab === 0 &&
                            otherUser.articles.map((article) => (
                                <ContentMyPage key={article.article_id} activeTab={activeTab} article={article} />
                            ))}
                        {activeTab === 1 &&
                            otherUser.comments.map((comment) => (
                                <ContentMyPage key={comment.id} activeTab={activeTab} comment={comment} />
                            ))}
                    </>
                )}
            </div>
        </>
    );
};

export default TabItem;
