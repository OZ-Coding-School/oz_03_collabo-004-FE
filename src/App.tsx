import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/admin" element={<AdminRoute element={AdminPage} />}></Route>
            <Route index element={<HomePage />}></Route>
            <Route path="/my" element={<PrivateRoute element={MyPage} />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
    );
}

export default App;
