import type { FunctionComponent } from "react";

/**
 * GradientsProps is a React Component properties that passed to React Component Gradients
 */
type GradientsProps = {};

/**
 * Gradients is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Gradients: FunctionComponent<GradientsProps> = ({}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-[800px] bg-dark-background-default pt-32">
            <div className="color-product-ethrise-gradient h-[523px] w-[339px] rotate-[-52.5deg] blur-[269px]"></div>
            <div className="color-product-avaxrise-gradient h-[404px] w-[321px] rotate-[-79deg] rounded-[176px] opacity-50 blur-[100px]"></div>
            <div className="color-product-gohmrise-gradient h-[906px] w-[447px] rotate-[-77.85deg] rounded-[216px] opacity-[0.4] blur-[268px]"></div>
        </div>
    );
};

export default Gradients;
