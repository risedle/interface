import React from "react";
import ThreeCards from "../../../modules/homePage/component/v2/ThreeCards";

export default {
    component: ThreeCards,
    title: "Risedle V2/Home Page/Cards",
};

export const Cards = () => {
    return (
        <div className="mt-28">
            <ThreeCards />
        </div>
    );
};
