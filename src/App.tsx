import { Link, Route, Routes } from "react-router-dom";
import PageColor from "./pages/PageColor";
import PageComponent from "./pages/PageComponent";

function Layout() {
    return (
        <div className="flex flex-col gap-2 m-10">
            <div className="font-point text-2xl">개발 페이징 환경</div>
            <Link
                className="p-2 rounded-md bg-primary-second hover:bg-primary-second-dark text-white text-2xl transition"
                to={"/color"}
            >
                Color Page
            </Link>
            <Link
                className="p-2 rounded-md bg-primary-second hover:bg-primary-second-dark text-white text-2xl transition"
                to={"/component"}
            >
                Common Component Page
            </Link>
        </div>
    );
}

function App() {
    return (
        <>
            <Routes>
                <Route index element={<Layout />} />
                <Route path="/color" element={<PageColor />} />
                <Route path="/component" element={<PageComponent />} />
            </Routes>
        </>
    );
}

export default App;
