import { SecondJumbotron } from "../../modules/homePage/component/v2/SecondJumbotron/SecondJumbotron";
import Navigation from "../../modules/homePage/component/v2/Navigation";

export default function HomeV2() {
    return (
        <div className="h-full w-full overflow-clip bg-gray-light-1 font-inter dark:bg-gray-dark-1">
            <Navigation />
            <SecondJumbotron />
        </div>
    );
}
