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
const DetailHeader: FunctionComponent<DetailHeaderProps> = ({
    image,
    title,
    subTitle,
    leftTitle,
    leftPath,
    rightTitle,
    rightPath,
}) => {
    return (
        <div className="flex flex-col mx-auto" style={{ width: "480px" }}>
            <div className="text-center">
                <img src={image} className="inline-block" alt={title} />
            </div>
            <div className="text-center -mt-6">
                <h1 className="text-white font-extrabold text-4xl m-0 leading-normal">
                    {title}
                </h1>
                <p className="text-grey font-semibold text-2xl m-0 leading-normal">
                    {subTitle}
                </p>
            </div>
            <div className="justify-center flex flex-row gap gap-x-4 mt-8">
                <ButtonBlueLink title={leftTitle} url={leftPath} />
                <ButtonBlueLink title={rightTitle} url={rightPath} />
            </div>
        </div>
    );
};

export default DetailHeader;
