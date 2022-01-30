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
                <p className="m-0 text-sm font-semibold leading-normal text-grey">{item.title}</p>
                <h3 className="m-0 text-2xl font-extrabold leading-normal text-white">{item.value}</h3>
            </div>
        );
    });

    return (
        <div className="gap mx-auto flex flex-col gap-y-4 rounded-2xl bg-gradient-to-t from-grey-100 p-6" style={{ width: "480px" }}>
            {list}
        </div>
    );
};

export default DetailCard;
