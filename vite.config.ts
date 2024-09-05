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
});
