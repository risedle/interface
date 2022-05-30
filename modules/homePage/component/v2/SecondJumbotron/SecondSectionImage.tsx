import { useWindowSize } from "../../../../../utils/useWindowSize";

function SecondSectionImage() {
    const size = useWindowSize();
    if (size.width && size.width > 768) {
        return <div className="-mx-16 h-[800px] w-screen bg-contain bg-left bg-no-repeat" style={{ backgroundImage: `url(/assets/images/homepage/section-2.svg)` }} />;
    }
    return <div className=" -mx-6 mt-8 h-[800px] w-screen bg-center bg-no-repeat" style={{ backgroundImage: `url(/assets/images/homepage/section-2-small.svg)` }} />;
}

export { SecondSectionImage };
