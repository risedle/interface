import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import Button from "../../../uikit/buttonV2/Button";

export default {
    title: "Risedle v2/Uikit/Button",
    component: Button,
    argTypes: {
        disabled: {
            defaultValue: false,
            type: "boolean",
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ButtonV2 = Template.bind({});

ButtonV2.args = {
    variant: "primary",
    children: "Primary",
};
