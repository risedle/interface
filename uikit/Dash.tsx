import React from "react";

function Dash({ children }: { children?: React.ReactNode }) {
    if (children) {
        return (
            <div className="flex align-middle ">
                <div className="order-2 flex-1 self-center  border-t-2 border-dashed border-t-gray-dark-5 text-white" />
                {children}
            </div>
        );
    }
    return <div className="border-t-2 border-dashed border-t-gray-dark-5 " />;
}

function TextLeftDash({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`order-1  self-start ${className || ""}`}>{children}</div>;
}

function TextRightDash({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`order-3  self-start ${className || ""}`}>{children}</div>;
}

export { Dash, TextLeftDash, TextRightDash };
