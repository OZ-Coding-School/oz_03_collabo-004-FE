import { useEffect, useState } from "react";
import { AdminList } from "../config/types";
import { FaComment, FaUser } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { motion } from "framer-motion";
interface AdminAnalProps {
    userData: AdminList;
    refetch: () => void;
}

const AdminAnal = ({ userData, refetch }: AdminAnalProps) => {
    const [timer, setTimer] = useState(0);

    const commentSum = () => {
        const comments = userData.articleList.reduce((acc, item) => {
            return (acc += item.comments_count);
        }, 0);

        return comments;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev > 500) {
                    refetch();
                    return 0;
                }
                return prev + 1;
            });
        }, 25);

        return () => {
            clearInterval(interval);
        };
    }, [refetch]);

    return (
        <div className="w-full flex gap-10 mt-10 justify-center">
            <div className="flex flex-col justify-center items-center text-lg">
                <div className="w-[200px] bg-stone-600 text-center rounded-t-sm text-stone-100">전체 사용자</div>
                <div className="w-[200px] h-[100px] bg-stone-200 rounded-sm flex justify-center items-center text-xl gap-2">
                    <FaUser className="text-stone-800" />
                    {userData.userList.length}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-lg">
                <div className="w-[200px] bg-stone-600 text-center rounded-t-sm text-stone-100">전체 게시글</div>
                <div className="w-[200px] h-[100px] bg-stone-200 rounded-sm flex justify-center items-center text-xl gap-2">
                    <MdArticle className="text-stone-800" />
                    {userData.articleList.length}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-lg">
                <div className="w-[200px] bg-stone-600 text-center rounded-t-sm text-stone-100">전체 댓글</div>
                <div className="w-[200px] h-[100px] bg-stone-200 rounded-sm flex justify-center items-center text-xl gap-2">
                    <FaComment className="text-stone-800" />
                    {commentSum()}
                </div>
            </div>
            <Gauge progress={timer} />
        </div>
    );
};

export default AdminAnal;

const Gauge = ({ progress }: { progress: number }) => {
    const [strokeDashoffset, setStrokeDashoffset] = useState(0);
    const radius = 50;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        setStrokeDashoffset(circumference - (progress / 500) * circumference);
    }, [progress, circumference]);

    return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="gauge">
            <circle cx="60" cy="60" r={radius} stroke="#e6e6e6" strokeWidth={strokeWidth} fill="none" />
            <motion.circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#57534e"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transition={{ duration: 1, ease: "easeInOut" }}
            />
        </svg>
    );
};
