import type { FunctionComponent } from "react";
import ThreeCards from "./ThreeCards";
import ButtonPrimary from "../../../../uikit/buttonV2/ButtonPrimary";
import ButtonSecondary from "../../../../uikit/buttonV2/ButtonSecondary";

/**
 * Jumbotron1Props is a React Component properties that passed to React Component Jumbotron1
 */
type Jumbotron1Props = {};

/**
 * Jumbotron1 is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Jumbotron1: FunctionComponent<Jumbotron1Props> = ({}) => {
    return (
        <>
            {/* overflow hidden (x axis) can be handled in homepage container later */}
            <div className="flex flex-col items-center gap-14 sm:flex-row sm:gap-0">
                <div className="flex max-w-2xl flex-col items-center gap-12 text-center sm:items-start sm:text-left">
                    <p className="heading-h1 xl:heading-h0 text-dark-neutral-primary drop-shadow-sm">Leverage Everything</p>
                    <p className="paragraph-m lg:paragraph-l xl:paragraph-xl text-dark-neutral-medium drop-shadow-sm">Boost your exposure to any crypto assets or create your own leverage market on top of Fuse</p>
                    <div className="flex flex-row">
                        <ButtonPrimary size="xl" type="default">
                            Explore Risedle
                        </ButtonPrimary>
                        <ButtonSecondary size="xl" type="default">
                            Documentation <span>&rarr;</span>
                        </ButtonSecondary>
                    </div>
                </div>
                <div className="grow" />
                <div className="flex h-[390px] w-[376px] items-center justify-center sm:translate-x-[18%] lg:-translate-x-[5%] xl:h-[633px] xl:w-[611px] xl:translate-x-[29%] 2xl:translate-x-[20%]">
                    <ThreeCards />
                </div>
            </div>
        </>
    );
};

export default Jumbotron1;
