import React from "react";

export default function BackgroundBox({ children }: { children?: React.ReactChild }) {
    return (
        <div className="max-w-screen">
            <div className="flex h-[440px] w-[360px] items-center rounded-[36px] bg-dark-background-elevated shadow-cardJumbotron">{children}</div>
        </div>
    );
}
