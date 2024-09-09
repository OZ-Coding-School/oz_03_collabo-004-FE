import ReactDOM from "react-dom";

export const ModalPortal = ({ children }: { children: React.ReactNode }) => {
    const el = document.getElementById("portal_root") as Element;
    return ReactDOM.createPortal(children, el);
};
