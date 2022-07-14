import { FunctionComponent } from "react";
import ButtonPositive from "../../../../../uikit/button/ButtonPositive";

/**
 * MintFormProps is a React Component properties that passed to React Component MintForm
 */
type MintFormProps = {
    chainID: number;
    address: string;
};

/**
 * MintForm is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const MintForm: FunctionComponent<MintFormProps> = ({ chainID, address }) => {
    return (
        <>
            <div className="mt-2 flex w-full flex-col items-center gap-2 rounded-xl bg-gray-light-2 py-4 dark:bg-gray-dark-2">
                <p className="flex w-fit gap-1 rounded-lg bg-gray-light-3 p-2 font-ibm text-base uppercase leading-4 tracking-[-0.02] text-gray-light-10 dark:bg-gray-dark-3 dark:text-gray-dark-10">ETHRISE</p>
                <input type="number" className="w-1/2 max-w-fit bg-transparent text-center font-ibm text-[40px] font-bold leading-[48px] tracking-[-0.02em] text-gray-light-10 focus:outline-none dark:text-gray-dark-10" placeholder="0.00" step={0.001} />
                <div className="flex flex-row items-center gap-1 text-xs text-gray-light-10 dark:text-gray-dark-10">
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.5 4.00195V12.002C2.5 12.2672 2.60536 12.5215 2.79289 12.7091C2.98043 12.8966 3.23478 13.002 3.5 13.002H13.5C13.6326 13.002 13.7598 12.9493 13.8536 12.8555C13.9473 12.7617 14 12.6346 14 12.502V5.50195C14 5.36934 13.9473 5.24217 13.8536 5.1484C13.7598 5.05463 13.6326 5.00195 13.5 5.00195H3.5C3.23478 5.00195 2.98043 4.8966 2.79289 4.70906C2.60536 4.52152 2.5 4.26717 2.5 4.00195ZM2.5 4.00195C2.5 3.73674 2.60536 3.48238 2.79289 3.29485C2.98043 3.10731 3.23478 3.00195 3.5 3.00195H12"
                            stroke="#7E7E7E"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path d="M11.25 9.75195C11.6642 9.75195 12 9.41617 12 9.00195C12 8.58774 11.6642 8.25195 11.25 8.25195C10.8358 8.25195 10.5 8.58774 10.5 9.00195C10.5 9.41617 10.8358 9.75195 11.25 9.75195Z" fill="#7E7E7E" />
                    </svg>
                    <p>4233</p>
                    <p>&#8231;</p>
                    <p>$0.00</p>
                </div>
            </div>
            {/* State need token approve */}
            <div>
                <p className="p-4 text-center text-xs text-gray-light-10 dark:text-gray-dark-10">First, you need to approve ETHRISE before you can continue buy ETHRISE</p>
                <ButtonPositive full>Yep, Let's Approve ETHRISE</ButtonPositive>
            </div>

            {/* TODO: state ready to mint */}
        </>
    );
};

export default MintForm;
