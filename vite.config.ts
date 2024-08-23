import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import svgr from "@svgr/rollup";

export default defineConfig({
    plugins: [react(), svgr()],
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://52.78.179.207:8000",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, "/api"),
            },
        },
    },
});
