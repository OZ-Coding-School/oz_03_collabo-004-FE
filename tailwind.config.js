/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{tsx,ts,js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                default: ["pretendard Variable"],
                point: ["Elice Digital Baeum"],
            },

            fontSize: {
                zero: "0px",
                xs: ["12px", { lineHeight: "18px", fontWeight: "200" }],
                sm: ["14px", { lineHeight: "22px", fontWeight: "300" }],
                md: ["16px", { lineHeight: "24px", fontWeight: "400" }],
                lg: ["20px", { lineHeight: "30px", fontWeight: "500" }],
                xl: ["24px", { lineHeight: "36px", fontWeight: "600" }],
                "2xl": ["32px", { lineHeight: "48px", fontWeight: "700" }],
                "3xl": ["48px", { lineHeight: "64px", fontWeight: "800" }],
            },

            colors: {
                primary: {
                    DEFAULT: "#092232",
                    second: "#FABC75",
                    "second-dark": "#FF941A",
                    background: "#4a3f39",
                    "background-second": "#796661",
                },
                background: {
                    DEFAULT: "#f5f5f7",
                },
                literal: {
                    normal: "#282c31",
                    error: "#ff5656",
                    star: "#ffd250",
                    highlight: "#e11d48",
                    info: "#1e1b4b",
                    confirm: "#747bff",
                },
                gray: {
                    100: "#eeeeee",
                    200: "#cecece",
                    300: "#bfbfbf",
                    400: "#b0b0b0",
                    600: "#989898",
                },
                slate: {
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    600: "#475569",
                },
            },
        },
    },
    plugins: [],
};
