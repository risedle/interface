import React from "react";
import ThreeCards from "../../../modules/homePage/component/v2/ThreeCards";

export default {
    component: ThreeCards,
    title: "Risedle V2/Home Page/Cards",
};

export const Cards = () => {
    return (
        <div className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2">
            <ThreeCards />
        </div>
    );
};
