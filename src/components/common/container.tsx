import classNames from "classnames";
import { ReactNode, useState, useEffect } from "react";

export default function Container({
    hiddenState,
    order,
    children,
}: {
    hiddenState?: boolean;
    order?: number;
    children: ReactNode;
}) {
    const RState = hiddenState == true || hiddenState == undefined;
    return (
        <div
            className={classNames("transition-[max-height] duration-300", {
                "max-h-[10000rem]": !RState,
                "max-h-0 overflow-hidden": RState,
            })}
            style={{ order: order }}
        >
            {children}
        </div>
    );
}
