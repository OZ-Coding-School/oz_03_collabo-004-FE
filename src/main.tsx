import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
console.log(CLIENT_ID);

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Router>
            <App />
        </Router>
    </GoogleOAuthProvider>
);
