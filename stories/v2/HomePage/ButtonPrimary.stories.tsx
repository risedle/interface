import React from "react";
import ButtonPrimaryComponent from "../../../uikit/buttonV2/ButtonPrimary";

export default {
    component: ButtonPrimaryComponent,
    title: "Risedle V2/Home Page/Button Primary",
};

export const ButtonPrimary = () => {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <p className="text-white">md</p>
                <ButtonPrimaryComponent>Label</ButtonPrimaryComponent>
                <ButtonPrimaryComponent type="fab">
                    <div className="h-[20px] w-[20px] rounded-md bg-black" />
                </ButtonPrimaryComponent>
                <ButtonPrimaryComponent type="square">Label</ButtonPrimaryComponent>
            </div>
            <div className="flex items-center space-x-2">
                <p className="text-white">lg</p>
                <ButtonPrimaryComponent size="lg">Label</ButtonPrimaryComponent>
                <ButtonPrimaryComponent size="lg" type="fab">
                    <div className="h-[20px] w-[20px] rounded-md bg-black" />
                </ButtonPrimaryComponent>
                <ButtonPrimaryComponent size="lg" type="square">
                    Label
                </ButtonPrimaryComponent>
            </div>
            <div className="flex items-center space-x-2">
                <p className="text-white">xl</p>
                <ButtonPrimaryComponent size="xl">Label</ButtonPrimaryComponent>
                <ButtonPrimaryComponent size="xl" type="fab">
                    <div className="h-[20px] w-[20px] rounded-md bg-black" />
                </ButtonPrimaryComponent>
                <ButtonPrimaryComponent size="xl" type="square">
                    Label
                </ButtonPrimaryComponent>
            </div>
        </div>
    );
};
