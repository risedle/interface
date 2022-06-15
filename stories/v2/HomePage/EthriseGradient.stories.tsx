import React from "react";
import { EthriseGradients as Component } from "../../../modules/homePage/component/v2/ThridJumbotron/Gradients";

const StoriesObject = {
    component: Component,
    title: "Risedle V2/Home Page/Ethrise Gradient",
};

export default StoriesObject;

export const EthriseGradient = () => (
    <div className="flex min-h-screen flex-row items-center justify-center bg-dark-background-default">
        <Component />
    </div>
);
