import { useWindowSize } from "../../../../../utils/useWindowSize";

function FirstSectionImage() {
    const size = useWindowSize();
    if (size.width && size.width > 768) {
        return <div className="-mx-16 h-[800px] w-screen bg-contain bg-left bg-no-repeat" style={{ backgroundImage: `url(/assets/images/homepage/section-1.svg)` }} />;
    }
    return <div className="-mx-6 mt-8 h-[400px] w-screen bg-center bg-no-repeat" style={{ backgroundImage: `url(/assets/images/homepage/section-1-small.svg)` }} />;
}

export { FirstSectionImage };
