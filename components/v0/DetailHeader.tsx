import type { FunctionComponent } from "react";

// Import components
import ButtonBlueLink from "./ButtonBlueLink";

/**
 * DetailHeaderProps is a React Component properties that passed to React
 * Component Button
 */
type DetailHeaderProps = {
    image: string;
    title: string;
    subTitle: string;
    leftTitle: string;
    leftPath: string;
    rightTitle: string;
    rightPath: string;
};

/**
 * DetailHeader is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const DetailHeader: FunctionComponent<DetailHeaderProps> = ({ image, title, subTitle, leftTitle, leftPath, rightTitle, rightPath }) => {
    return (
        <div className="mx-auto flex flex-col" style={{ width: "480px" }}>
            <div className="text-center">
                <img src={image} className="inline-block" alt={title} />
            </div>
            <div className="-mt-6 text-center">
                <h1 className="m-0 text-4xl font-extrabold leading-normal text-white">{title}</h1>
                <p className="m-0 text-2xl font-semibold leading-normal text-grey">{subTitle}</p>
            </div>
            <div className="gap mt-8 flex flex-row justify-center gap-x-4">
                <ButtonBlueLink title={leftTitle} url={leftPath} />
                <ButtonBlueLink title={rightTitle} url={rightPath} />
            </div>
        </div>
    );
};

export default DetailHeader;
