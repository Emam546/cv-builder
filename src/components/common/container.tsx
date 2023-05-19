import classNames from "classnames";
import { ReactNode, useState, useEffect } from "react";

export default function Container({
    hiddenState: lastState,
    order,
    children,
}: {
    hiddenState?: boolean;
    order?: number;
    children: ReactNode;
}) {
    const [curOrder, setCurOrder] = useState(order);
    const [state, setState] = useState(lastState);
    useEffect(() => {
        setCurOrder(order);
        setState(lastState);
    }, [lastState]);
    return (
        <div
            className={classNames("transition-[max-height] duration-300", {
                "max-h-[10000rem]": !state,
                "max-h-0 overflow-hidden": state,
            })}
            style={{ order: curOrder }}
        >
            {children}
        </div>
    );
}
