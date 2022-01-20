import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

// Import tailwind in storybook preview
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

// Setup Next.js Image for storybook
// https://xenox.dev/next-image-with-storybookjs/
import * as NextImage from "next/image";

Object.defineProperty(NextImage, "default", {
    configurable: true,
    value: (props) => <img {...props} />,
});

export const parameters = {
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: "fullscreen",
    backgrounds: {
        default: "Light",
        values: [
            { name: "Light", value: "#FCFCFC" },
            { name: "Dark", value: "#161616" },
        ],
    },
};
