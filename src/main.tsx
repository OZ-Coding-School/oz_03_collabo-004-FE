import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <Router>
                <App />
            </Router>
        </GoogleOAuthProvider>
    </QueryClientProvider>
);
