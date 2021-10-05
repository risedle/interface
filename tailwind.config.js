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
                grey: {
                    DEFAULT: "#808080",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
