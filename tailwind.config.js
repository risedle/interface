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
                ibm: ["'IBM Plex Mono'", "monospace"],
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
                        9: "#8F8F8F",
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
                        9: "#707070",
                        10: "#7E7E7E",
                        11: "#AOAOAO",
                        12: "#EDEDED",
                    },
                },
                violet: {
                    light: {
                        3: "#F5F2FF",
                        4: "#EDE9FE",
                    },
                    dark: {
                        2: "#1C172B",
                        3: "#251E40",
                    },
                },
                blue: {
                    light: {
                        1: "#FBFDFF",
                        2: "#F5FAFF",
                        3: "#EDF6FF",
                        4: "#E1F0FF",
                        5: "#CEE7FE",
                    },
                    dark: {
                        1: "#0F1720",
                        2: "#0F1B2D",
                        3: "#10243E",
                        5: "#0F3058",
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
                orange: {
                    light: {
                        2: "#FEF8F4",
                        3: "#FFF1E7",
                        5: "#FFDCC3",
                    },
                    dark: {
                        2: "#2B1400",
                        3: "#391A03",
                        5: "#4F2305",
                    },
                },
                red: {
                    light: {
                        1: "#FFFCFC",
                        9: "#E5484D",
                        10: "#DC3D43",
                    },
                    dark: {
                        2: "#291415",
                        5: "#541B1F",
                        10: "#F2555A",
                        11: "#FF6369",
                        12: "#FEECEE",
                    },
                },
                green: {
                    light: {
                        1: "#FBFEFC",
                        9: "#30A46C",
                        10: "#299764",
                        11: "#18794E",
                    },
                    dark: {
                        2: "#0C1F17",
                        5: "#133929",
                        11: "#4CC38A",
                        12: "#E5FBEB",
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
