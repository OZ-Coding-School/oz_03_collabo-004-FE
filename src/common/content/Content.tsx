import DOMPurify from "dompurify";
import { truncateText } from "../../util/truncate";
import useHighlight from "../../hooks/useHighlight";
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

    const removeImagesFromHtml = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const images = doc.getElementsByTagName("img");

        while (images.length > 0) {
            images[0].parentNode!.removeChild(images[0]);
        }

        return doc.body.innerHTML;
    };

    const sanitizeAndRemoveImages = (html: string) => {
        const sanitized = DOMPurify.sanitize(html);
        return removeImagesFromHtml(sanitized);
    };

    useHighlight();
    return (
        <>
            <div
                onClick={handleArticleClick}
                className="cursor-pointer flex flex-col bg-white rounded-t-lg min-w-full md:w-[626px] dark:bg-gray-800 dark:text-white"
            >
                <div className={`flex justify-center mt-[20px] mb-[10px]  ${thumbnail_image ? "" : "hidden"}`}>
                    {thumbnail_image && (
                        <img
                            src={thumbnail_image}
                            alt={title}
                            className="object-cover w-[426px] h-[200px] rounded-[5px]"
                        />
                    )}
                </div>
                <div className="flex flex-col w-full p-4 dark:text-white">
                    <h2 className="mb-2 text-lg text-black break-words fontsize-xl dark:text-white">{title}</h2>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: sanitizeAndRemoveImages(truncateText(content, 300)),
                        }}
                        className="tiptap prose ProseMirror text-[16px] text-black break-words dark:text-white"
                    />
                </div>
            </div>
        </>
    );
};

export default Content;
