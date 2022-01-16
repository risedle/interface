module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                inter: ["'Inter'", "sans-serif"],
            },
            colors: {
                blue: {
                    DEFAULT: "#2D81FF",
                },
                grey: {
                    DEFAULT: "#888888",
                    100: "#121212",
                },
                gray: {
                    light: {
                        1: "#FCFCFC",
                        2: "#F8F8F8",
                        3: "#F3F3F3",
                        4: "#EDEDED",
                        5: "#E8E8E8",
                        10: "#858585",
                        11: "#6F6F6F",
                        12: "#171717",
                    },
                    dark: {
                        1: "#161616",
                        2: "#1C1C1C",
                        3: "#232323",
                        4: "#282828",
                        5: "#2E2E2E",
                        10: "#7E7E7E",
                        11: "#AOAOAO",
                        12: "#EDEDED",
                    },
                },
                violet: {
                    light: {
                        3: "#F5F2FF",
                    },
                    dark: {
                        2: "#1C172B",
                    },
                },
                blue: {
                    light: {
                        3: "#EDF6FF",
                    },
                    dark: {
                        2: "#0F1B2D",
                    },
                },
                sky: {
                    light: {
                        10: "#5FD4F4",
                    },
                    dark: {
                        10: "#8AE8FF",
                    },
                },
            },
            opacity: {
                8: ".08",
                15: ".15",
                95: ".95",
            },
        },
    },
    variants: {
        extend: {
            opacity: ["hover"],
            scale: ["active"],
        },
    },
    plugins: [],
};
