import DOMPurify from "dompurify";
import "highlight.js/styles/atom-one-dark.css";
import { truncateText } from "../../util/truncate";

interface ContentProps {
    thumbnail_image: string;
    title: string;
    content: string;
    onClick: (number: number) => void;
    id: number;
}

const Content = ({ thumbnail_image, title, content, onClick, id }: ContentProps) => {
    const handleArticleClick = () => {
        onClick(id);
    };

    const sanitizer = DOMPurify.sanitize;

    return (
        <>
            <div
                onClick={handleArticleClick}
                className="cursor-pointer flex flex-col bg-white rounded-t-lg min-w-full md:w-[626px]"
            >
                <div className={`flex justify-center mt-[20px] mb-[10px] ${thumbnail_image ? "" : "hidden"}`}>
                    {thumbnail_image && (
                        <img
                            src={thumbnail_image}
                            alt={title}
                            className="object-cover w-[426px] h-[200px] rounded-[5px]"
                        />
                    )}
                </div>
                <div className="flex flex-col p-4 w-full">
                    <h2 className="mb-2 text-lg text-black fontsize-xl break-words">{title}</h2>
                    <div
                        dangerouslySetInnerHTML={{ __html: sanitizer(truncateText(content, 300)) }}
                        className="custom-code-block text-sm text-black break-words"
                    />
                </div>
            </div>
        </>
    );
};

export default Content;
