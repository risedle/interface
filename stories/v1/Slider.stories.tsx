import React from "react";

import Slider from "../../uikit/Slider";

export default {
    component: Slider,
    title: "Risedle V1/Slider/Component",
};

export const Component = () => {
    return (
        <div className="space-y-6">
            <div className="relative mt-2 w-52">
                <Slider color="bsc" />
            </div>
            <div className="relative mt-2 w-52">
                <Slider color="arbitrum" />
            </div>
        </div>
    );
};
