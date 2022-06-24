module.exports = {
    stories: [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-postcss",
        "storybook-tailwind-dark-mode",
    ],
    framework: "@storybook/react",
    staticDirs: ["../public"],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
        });

        return config;
    },
};
