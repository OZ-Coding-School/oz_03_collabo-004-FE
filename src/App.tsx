import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";
import MyPage from "./pages/MyPage";
import WelcomePage from "./pages/WelcomePage";
import PasswordFindPage from "./pages/PasswordFindPage";
import PasswordResetPage from "./pages/PasswordResetPage";

function App() {
    return (
        <Routes>
            <Route path="/password-reset/:uidb64/:token" element={<PublicRoute element={PasswordResetPage} />} />
            <Route path="/login" element={<PublicRoute element={LoginPage} />}></Route>
            <Route path="/register" element={<PublicRoute element={RegisterPage} />}></Route>
            <Route path="/welcome" element={<PublicRoute element={WelcomePage} />}></Route>
            <Route path="/find" element={<PublicRoute element={PasswordFindPage} />}></Route>
            <Route path="/admin" element={<AdminRoute element={AdminPage} />}></Route>
            <Route index element={<HomePage />}></Route>
            <Route path="/my/:userId?" element={<PrivateRoute element={MyPage} />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
    );
}

export default App;
