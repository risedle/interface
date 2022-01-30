import type { FunctionComponent } from "react";
/**
 * AUMLoadingProps is a React Component properties that passed to React
 * Component Button
 */
type AUMLoadingProps = {};

/**
 * AUMLoading is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const AUMLoading: FunctionComponent<AUMLoadingProps> = ({}) => {
    return (
        <p className="m-0 align-middle text-2xl font-semibold leading-normal text-grey">
            <span className="mr-2 inline-block align-middle">AUM</span>
            <span>
                <svg className="inline-block animate-spin fill-current align-middle text-grey" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.02 9.38436C12.4592 9.38436 13.777 3.19468 13.817 1.47754C13.8569 0.678868 13.0183 0 12.02 0C11.0216 0 10.183 0.638935 10.223 1.47754C10.3028 3.19468 11.5807 9.38436 12.02 9.38436Z" />
                    <path d="M9.38436 12.02C9.38436 11.5807 3.19468 10.2629 1.47754 10.223C0.678868 10.183 0 11.0216 0 12.02C0 13.0183 0.638935 13.8569 1.47754 13.817C3.19468 13.7371 9.38436 12.4592 9.38436 12.02Z" />
                    <path d="M10.183 9.10482L3.35441 3.3544L9.14476 10.183C9.42429 9.78368 9.78369 9.42428 10.183 9.10482Z" />
                    <path d="M13.8569 14.9351L20.6855 20.7255L14.9351 13.8569C14.6156 14.2562 14.2562 14.6156 13.8569 14.9351Z" />
                    <path d="M22.5225 10.223C20.8053 10.2629 14.6156 11.5807 14.6156 12.02C14.6156 12.4592 20.8053 13.7371 22.5225 13.817C23.3211 13.8569 24 13.0183 24 12.02C24 11.0216 23.3611 10.183 22.5225 10.223Z" />
                    <path d="M12.02 14.6556C11.5807 14.6556 10.3028 20.8453 10.223 22.5624C10.183 23.3611 11.0216 24.0399 12.02 24.0399C13.0183 24.0399 13.8569 23.401 13.817 22.5624C13.777 20.8453 12.4592 14.6556 12.02 14.6556" />
                    <path d="M14.9351 10.183L20.7255 3.3544L13.8569 9.10482C14.2562 9.42428 14.6156 9.78368 14.9351 10.183" />
                    <path d="M9.10483 13.8569L3.35441 20.6855L10.183 14.8952C9.78369 14.6156 9.42429 14.2562 9.10483 13.8569Z" />
                    <path d="M12.02 13.817C13.0124 13.817 13.817 13.0124 13.817 12.02C13.817 11.0275 13.0124 10.223 12.02 10.223C11.0275 10.223 10.223 11.0275 10.223 12.02C10.223 13.0124 11.0275 13.817 12.02 13.817Z" />
                </svg>
            </span>
        </p>
    );
};

export default AUMLoading;
