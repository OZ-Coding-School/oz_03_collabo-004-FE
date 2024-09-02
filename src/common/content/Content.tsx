interface ContentProps {
    thumbnail_image: string;
    title: string;
    content: string;
}

const Content = ({ thumbnail_image, title, content }: ContentProps) => {
    return (
        <div className="flex flex-col bg-white rounded-t-lg w-[626px]">
            <div className={`flex justify-center mt-[20px] mb-[10px] ${thumbnail_image ? "" : "hidden"}`}>
                {thumbnail_image && (
                    <img src={thumbnail_image} alt={title} className="object-cover w-[426px] h-[200px] rounded-[5px]" />
                )}
            </div>
            <div className="flex flex-col p-4">
                <h2 className="mb-2 text-lg text-black fontsize-xl">{title}</h2>
                <p className="text-sm text-black">
                    {content.length > 100 ? `${content.substring(0, 100)}...` : content}
                </p>
            </div>
        </div>
    );
};

export default Content;
