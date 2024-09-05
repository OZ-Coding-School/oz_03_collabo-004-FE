import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import TagPage from "./pages/TagPage";
import PublicRoute from "./routes/PublicRoute";
import MyPage from "./pages/MyPage";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<PublicRoute element={LoginPage} />}></Route>
            <Route path="/register" element={<PublicRoute element={RegisterPage} />}></Route>
            <Route path="/tag" element={<TagPage />}></Route>
            <Route path="/admin" element={<AdminRoute element={AdminPage} />}></Route>
            <Route index element={<HomePage />}></Route>
            <Route path="/my/:userId?" element={<PrivateRoute element={MyPage} />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
    );
}

export default App;
