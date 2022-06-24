import React from "react";

export default function BackgroundBox({ children }: { children?: React.ReactChild }) {
    return (
        <div className="relative ml-0 w-screen md:ml-[120px]">
            <div className="mx-auto flex h-[440px] w-[360px] items-center rounded-[36px] bg-dark-background-elevated shadow-cardJumbotron md:mx-0">{children}</div>
        </div>
    );
}
