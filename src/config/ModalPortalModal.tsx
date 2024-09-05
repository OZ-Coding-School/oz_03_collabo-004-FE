import ReactDOM from "react-dom";

export const ModalPortalModal = ({ children }: { children: React.ReactNode }) => {
    const el = document.getElementById("portal_root_modal") as Element;
    return ReactDOM.createPortal(children, el);
};
