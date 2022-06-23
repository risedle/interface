import type { FunctionComponent } from "react";
import ThreeCards from "./ThreeCards";
import ButtonPrimary from "../../../../../uikit/buttonV2/ButtonPrimary";
import ButtonSecondary from "../../../../../uikit/buttonV2/ButtonSecondary";
import Button from "../../../../../uikit/buttonV2/Button";

/**
 * FirstJumbotronProps is a React Component properties that passed to React Component FirstJumbotron
 */
type FirstJumbotronProps = {};

/**
 * FirstJumbotron is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const FirstJumbotron: FunctionComponent<FirstJumbotronProps> = ({}) => {
    return (
        <>
            {/* overflow hidden (x axis) can be handled in homepage container later */}
            <div className="mx-auto flex max-w-[343px] flex-col items-center gap-14 pt-32 sm:max-w-[552px] sm:flex-row sm:gap-0 lg:max-w-[936px] xl:max-w-[1128px]">
                <div className="flex max-w-2xl flex-col items-center gap-12 text-center sm:items-start sm:text-left">
                    <p className="heading-h1 xl:heading-h0 text-dark-neutral-primary drop-shadow-sm">Leverage Everything</p>
                    <p className="paragraph-m lg:paragraph-l xl:paragraph-xl text-dark-neutral-medium/70 drop-shadow-sm">Boost your exposure to any crypto assets or create your own leverage market on top of Fuse</p>
                    <div className="flex flex-row space-x-2.5 xl:hidden">
                        <Button size="lg" type="default">
                            Explore Risedle
                        </Button>
                        <Button variant="secondary" size="lg" type="default" className="hidden lg:flex">
                            Documentation <span>&rarr;</span>
                        </Button>
                        <Button variant="secondary" size="lg" type="default" className="lg:hidden">
                            Docs <span>&rarr;</span>
                        </Button>
                    </div>
                    <div className="hidden flex-row space-x-2.5 xl:flex">
                        <Button size="xl" type="default">
                            Explore Risedle
                        </Button>
                        <Button variant="secondary" size="xl" type="default">
                            Documentation <span>&rarr;</span>
                        </Button>
                    </div>
                </div>
                <div className="flex h-[390px] w-[376px] items-center justify-center sm:translate-x-[6%] lg:translate-x-[5%] xl:h-[633px] xl:w-[611px] xl:translate-x-[37%] 2xl:translate-x-[50%]">
                    <ThreeCards />
                </div>
            </div>
        </>
    );
};

export default FirstJumbotron;
