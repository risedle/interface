import React from "react";
import ButtonSecondaryComponent from "../../../uikit/buttonV2/ButtonSecondary";

export default {
    component: ButtonSecondaryComponent,
    title: "Risedle V2/Home Page/Button Secondary",
};

export const ButtonSecondary = () => {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <p className="text-white">md</p>
                <ButtonSecondaryComponent>Label</ButtonSecondaryComponent>
                <ButtonSecondaryComponent type="fab">
                    <div className="h-[20px] w-[20px] rounded-md bg-white" />
                </ButtonSecondaryComponent>
                <ButtonSecondaryComponent type="square">Label</ButtonSecondaryComponent>
            </div>
            <div className="flex items-center space-x-2">
                <p className="text-white">lg</p>
                <ButtonSecondaryComponent size="lg">Label</ButtonSecondaryComponent>
                <ButtonSecondaryComponent size="lg" type="fab">
                    <div className="h-[20px] w-[20px] rounded-md bg-white" />
                </ButtonSecondaryComponent>
                <ButtonSecondaryComponent size="lg" type="square">
                    Label
                </ButtonSecondaryComponent>
            </div>
            <div className="flex items-center space-x-2">
                <p className="text-white">xl</p>
                <ButtonSecondaryComponent size="xl">Label</ButtonSecondaryComponent>
                <ButtonSecondaryComponent size="xl" type="fab">
                    <div className="h-[20px] w-[20px] rounded-md bg-white" />
                </ButtonSecondaryComponent>
                <ButtonSecondaryComponent size="xl" type="square">
                    Label
                </ButtonSecondaryComponent>
            </div>
        </div>
    );
};
