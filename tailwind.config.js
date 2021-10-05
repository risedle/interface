module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                inter: ["'Inter'", "sans-serif"],
            },
            colors: {
                blue: {
                    DEFAULT: "#2D81FF",
                },
            },
            opacity: {
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
