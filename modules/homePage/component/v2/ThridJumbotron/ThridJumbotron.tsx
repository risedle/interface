import type { FunctionComponent } from "react";
import ButtonPrimary from "../../../../../uikit/buttonV2/ButtonPrimary";

/**
 * ThridJumbotronProps is a React Component properties that passed to React Component ThridJumbotron
 */
type ThridJumbotronProps = {};

/**
 * ThridJumbotron is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ThridJumbotron: FunctionComponent<ThridJumbotronProps> = ({}) => {
    return (
        <div className="mx-auto flex max-w-[343px] flex-col items-center justify-between gap-[72px] py-32 sm:max-w-[552px] sm:gap-16 lg:max-w-[936px] lg:flex-row lg:gap-8 xl:max-w-[1128px]">
            <div className="flex flex-col items-center gap-16 lg:items-start">
                <div className="flex flex-col items-center gap-6 lg:items-start">
                    <p className="xl:heading-h0 heading-h1 text-center text-dark-neutral-primary drop-shadow-sm lg:text-left">Reliable & Trusted</p>
                    <p className="xl:paragraph-xl lg:paragraph-l paragraph-m text-center text-dark-neutral-soft lg:text-left">Risedle protocol working smooth as a butter in the markets. Running like a porsche.</p>
                </div>
                <ButtonPrimary size="xl" type="default" className="hidden w-fit lg:flex">
                    Open Position
                </ButtonPrimary>
            </div>
            <div className="flex flex-row gap-[72px] lg:flex-col">
                <div className="flex flex-col items-center lg:items-start">
                    <p className="text-xs uppercase tracking-widest text-dark-neutral-soft">Trading Volume 24H</p>
                    <p className="lg:display-d2 display-d3 text-dark-neutral-primary">$2,234,234</p>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                    <p className="text-xs uppercase tracking-widest text-dark-neutral-soft">Transaction 24H</p>
                    <p className="lg:display-d2 display-d3 text-dark-neutral-primary">$2,234,234</p>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                    <p className="text-xs uppercase tracking-widest text-dark-neutral-soft">Total AUM 24H</p>
                    <p className="lg:display-d2 display-d3 text-dark-neutral-primary">$22,234,234</p>
                </div>
            </div>
            <ButtonPrimary size="lg" type="default" className="lg:hidden">
                Open Position
            </ButtonPrimary>
        </div>
    );
};

export default ThridJumbotron;
