import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import React from "react";
import { useForceUpdate, useSyncRefs } from "@src/utils/hooks";
import { assertIsNode } from "@src/utils";

function CustomButton({
    editable,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { editable: boolean }) {
    return (
        <button
            {...props}
            className={classNames(
                "hover:text-blue-50  text-neutral-30 group-hover:visible",
                {
                    "lg:invisible": !editable,
                },
                props.className
            )}
        >
            {props.children}
        </button>
    );
}
type Props = {
    reset: Function;
    innerRef: React.RefObject<HTMLInputElement>;
    defaultValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;
function Component({ defaultValue, reset, innerRef, ...props }: Props) {
    const [editable, setEditable] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const forceUpdate = useForceUpdate();
    const input = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!ref.current) return;
        function Listener(e: MouseEvent) {
            if (!ref.current) return;
            if (!e.target) return;
            assertIsNode(e.target);
            if (!ref.current.contains(e.target)) {
                setEditable(false);
            }
        }
        window.addEventListener("click", Listener);
        return () => {
            window.removeEventListener("click", Listener);
        };
    }, [ref]);
    useEffect(() => {
        forceUpdate();
    }, [input]);
    const inputEle = useSyncRefs<HTMLInputElement>(input, innerRef);
    const textValue = input.current?.value;
    return (
        <div
            className="flex items-center gap-2 group text-xl leading-8 my-3"
            ref={ref}
        >
            <div
                className="self-start text-neutral-90"
                onClick={() => {
                    input.current?.focus();
                }}
            >
                <h2 className={classNames({ hidden: editable }, "font-bold")}>
                    {textValue}
                </h2>
                <div
                    className={classNames(
                        "after:invisible p-0 relative after:content-[attr(data-value)] min-w-[5rem] w-fit min-h-[1rem] font-bold h-fit",
                        { hidden: !editable }
                    )}
                    data-value={textValue}
                >
                    <input
                        type="text"
                        className={classNames(
                            "focus:outline-none p-0 top-0 left-0 absolute font-bold border-b-2 border-blue-50 border-solid w-full max-w-full"
                        )}
                        ref={inputEle}
                        {...props}
                        onChange={(e) => {
                            if (props.onChange) props.onChange(e);
                            forceUpdate();
                        }}
                    />
                </div>
            </div>
            <CustomButton
                editable={editable}
                type="button"
                onClick={() => {
                    setEditable(true);
                }}
            >
                <FontAwesomeIcon icon={faPen} />
            </CustomButton>
            {(!textValue?.length ||
                (defaultValue && textValue != defaultValue)) && (
                <CustomButton
                    editable={editable}
                    type="button"
                    onClick={() => {
                        reset();
                    }}
                    className="font-bold"
                >
                    <FontAwesomeIcon icon={faRotateRight} />
                </CustomButton>
            )}
        </div>
    );
}
// eslint-disable-next-line react/display-name
const Header = React.forwardRef<
    HTMLInputElement,
    Pick<Props, Exclude<keyof Props, "innerRef">>
>((props, ref) => (
    <Component
        {...props}
        innerRef={ref as any}
    />
));
export default Header;
