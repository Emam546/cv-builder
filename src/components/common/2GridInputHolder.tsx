import classNames from "classnames";
import React, { RefObject } from "react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {}
// eslint-disable-next-line react/display-name
const Grid2Container = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
    <div
        {...props}
        ref={ref}
        className={classNames(
            "grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-4 transition-[width] duration-700",
            props.className
        )}
    >
        {props.children}
    </div>
));
export default Grid2Container;
