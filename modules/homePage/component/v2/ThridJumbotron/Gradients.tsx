import type { FunctionComponent } from "react";

type EthriseGradientsProps = {
    className?: string;
};
type AvaxriseGradientsProps = {
    className?: string;
};
type GohmriseGradientsProps = {
    className?: string;
};

export const EthriseGradients: FunctionComponent<EthriseGradientsProps> = ({ className }) => {
    return <div className={`color-product-ethrise-gradient h-[523.05px] w-[339.24px] rotate-[-52.5deg] blur-[269px] ${className || ""}`}></div>;
};

export const AvaxriseGradients: FunctionComponent<AvaxriseGradientsProps> = ({ className }) => {
    return <div className={`color-product-avaxrise-gradient h-[404px] w-[321.32px] rotate-[-79.02deg] rounded-[176px] opacity-50 blur-[100px] ${className || ""}`}></div>;
};

export const GohmriseGradients: FunctionComponent<GohmriseGradientsProps> = ({ className }) => {
    return <div className={`color-product-gohmrise-gradient h-[906px] w-[447px] rotate-[-77.85deg] rounded-[216px] opacity-[0.4] blur-[268px] ${className || ""}`}></div>;
};
