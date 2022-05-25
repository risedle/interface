import type { FunctionComponent } from "react";
import Card from "./Card";

/**
 * ThreeCardsProps is a React Component properties that passed to React Component ThreeCards
 */
type ThreeCardsProps = {};

/**
 * ThreeCards is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const ThreeCards: FunctionComponent<ThreeCardsProps> = ({}) => {
    return (
        <div className="relative flex scale-[80%] justify-center sm:scale-100 xl:scale-[130%]">
            <Card type="dpx" className="relative z-10 translate-y-[7%] translate-x-[80%]" />
            <Card type="avax" className="relative z-20" />
            <Card type="eth" className="relative z-30 -translate-x-[80%] translate-y-[13.5%]" />
        </div>
    );
};

export default ThreeCards;
