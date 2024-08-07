import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import PrivateRoute from "./PrivateRoute";
function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/home" element={<PrivateRoute element={LoginPage} />}></Route>
        </Routes>
    );
}

export default App;
