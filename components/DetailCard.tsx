import type { FunctionComponent } from "react";

// Represents pair of title and value to displayed
export type DetailCardListItem = {
    title: string;
    value: string;
};

/**
 * DetailCardProps is a React Component properties that passed to React
 * Component Button
 */
type DetailCardProps = {
    items: Array<DetailCardListItem>;
};

/**
 * DetailCard is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const DetailCard: FunctionComponent<DetailCardProps> = ({ items }) => {
    const list = items.map((item) => {
        return (
            <div key={item.title}>
                <p className="text-sm font-semibold text-grey m-0 leading-normal">
                    {item.title}
                </p>
                <h3 className="text-white text-2xl font-extrabold m-0 leading-normal">
                    {item.value}
                </h3>
            </div>
        );
    });

    return (
        <div
            className="flex flex-col bg-gradient-to-t from-grey-100 rounded-2xl p-6 gap gap-y-4 mx-auto"
            style={{ width: "480px" }}
        >
            {list}
        </div>
    );
};

export default DetailCard;
