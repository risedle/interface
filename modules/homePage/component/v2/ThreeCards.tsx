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
        <div className="relative min-h-[487.21px] min-w-[470.28px] scale-[80%] xl:scale-[130%]">
            <Card type="dpx" className="absolute left-0 bottom-0 z-10 translate-x-10 -translate-y-9" />
            <Card type="avax" className="absolute top-0  right-1/2 z-20 translate-x-1/2" />
            <Card type="eth" className="absolute right-0 bottom-0 z-30 -translate-x-10 -translate-y-6" />
        </div>
    );
};

export default ThreeCards;
