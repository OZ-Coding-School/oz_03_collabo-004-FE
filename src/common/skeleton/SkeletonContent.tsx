import Skeleton from "./Skeleton";

interface SkeletonContentProps {
    type: 1 | 2;
}

const SkeletonContent1 = () => {
    return (
        <div className="w-[626px]">
            <div className="mb-3 flex gap-2">
                <div className="rounded-full bg-gray-200 size-10 animate-pulse"></div>
                <div className="flex flex-col justify-evenly">
                    <Skeleton size="s" />
                    <Skeleton size="xs" />
                </div>
            </div>
            <div className="w-[626px] h-[350px] bg-white rounded-2xl p-5 flex flex-col items-center">
                <Skeleton size="3xl" className="h-[200px]" />
                <div className="w-full mt-auto flex flex-col gap-5">
                    <div className="flex gap-2">
                        <Skeleton size="xl" />
                        <Skeleton size="xl" />
                        <Skeleton size="xl" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton size="s" />
                        <Skeleton size="s" />
                    </div>
                    <div className="flex justify-around">
                        <Skeleton size="l" />
                        <Skeleton size="l" />
                        <Skeleton size="l" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const SkeletonContent2 = () => {
    return (
        <div className="w-[626px]">
            <div className="mb-3 flex gap-2">
                <div className="rounded-full bg-gray-200 size-10 animate-pulse"></div>
                <div className="flex flex-col justify-evenly">
                    <Skeleton size="s" />
                    <Skeleton size="2xl" />
                </div>
            </div>
            <div className="w-[626px] h-[350px] bg-white rounded-2xl p-5 flex flex-col items-center">
                <Skeleton size="3xl" className="h-[200px]" />
                <div className="w-full mt-auto flex flex-col gap-5">
                    <div className="flex gap-2">
                        <Skeleton size="3xl" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton size="2xl" />
                    </div>
                    <div className="flex justify-around">
                        <Skeleton size="l" />
                        <Skeleton size="l" />
                        <Skeleton size="l" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const SkeletonContent = ({ type }: SkeletonContentProps) => {
    if (type === 1) {
        return <SkeletonContent1 />;
    }
    if (type === 2) {
        return <SkeletonContent2 />;
    }
};

export default SkeletonContent;
