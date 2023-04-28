import classNames from "classnames";
import React, { RefObject } from "react";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    innerRef: RefObject<HTMLDivElement>;
}
function Component({ innerRef, ...props }: Props) {
    return (
        <div
            {...props}
            ref={innerRef}
            className={classNames(
                "grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-4 transition-[width] duration-700",
                props.className
            )}
        >
            {props.children}
        </div>
    );
}
// eslint-disable-next-line react/display-name
const Grid2Container = React.forwardRef<
    HTMLDivElement,
    Pick<Props, Exclude<keyof Props, "innerRef">>
>((props, ref) => (
    <Component
        {...props}
        innerRef={ref as any}
    />
));
export default Grid2Container;
