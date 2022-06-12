import React from "react";
import { GohmriseGradients as Component } from "../../../modules/homePage/component/v2/ThridJumbotron/Gradients";

const StoriesObject = {
    component: Component,
    title: "Risedle V2/Home Page/Gohmrise Gradient",
};

export default StoriesObject;

export const GohmriseGradient = () => (
    <div className="flex min-h-screen flex-row items-center justify-center bg-dark-background-default">
        <Component />
    </div>
);
