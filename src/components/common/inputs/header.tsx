import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen,
    faRotateRight,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import React from "react";
import { useSyncRefs } from "@src/utils/hooks";
import { assertIsNode } from "@src/utils";
import { GeneralInputProps } from "./styles";

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
export interface Props extends GeneralInputProps<string> {
    reset: Function;
    defaultValue?: string;
    setDelete?: Function;
}

const Header = React.forwardRef<HTMLInputElement, Props>(
    ({ defaultValue, reset, setDelete, ...props }, ref) => {
        const [editable, setEditable] = useState(false);
        const input = useRef<HTMLInputElement>(null);
        const textValue = input.current?.value || defaultValue;
        const containerDiv = useRef<HTMLDivElement>(null);
        useEffect(() => {
            if (!input.current) return;
            function Listener(e: MouseEvent) {
                if (!input.current) return;
                if (!e.target) return;
                assertIsNode(e.target);
                if (!containerDiv.current!.contains(e.target)) {
                    setEditable(false);
                }
            }
            window.addEventListener("click", Listener);
            return () => {
                window.removeEventListener("click", Listener);
            };
        }, [input]);

        const allRef = useSyncRefs<HTMLInputElement>(input, ref);

        return (
            <div
                ref={containerDiv}
                className="flex items-center gap-2 group text-xl leading-8 my-3 w-fit"
            >
                <div
                    className="self-start text-neutral-90"
                    onClick={() => {
                        input.current?.focus();
                    }}
                >
                    <h2
                        className={classNames(
                            { hidden: editable },
                            "font-bold"
                        )}
                    >
                        {textValue}
                    </h2>
                    <div
                        onClick={() => {
                            input.current!.focus();
                        }}
                        className={classNames(
                            "after:invisible p-0 relative after:content-[attr(data-value)] min-w-[5rem] w-fit min-h-[1rem] font-bold h-fit",
                            { hidden: !editable }
                        )}
                        data-value={textValue}
                    >
                        <input
                            placeholder="Untitled"
                            type="text"
                            {...props}
                            ref={allRef}
                            className={classNames(
                                "focus:outline-none p-0 top-0 left-0 absolute font-bold border-b-2 border-blue-50 border-solid w-full max-w-full",
                                props.className
                            )}
                        />
                    </div>
                </div>
                <CustomButton
                    editable={editable}
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        setEditable(true);
                        input.current!.focus();
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
                {setDelete && (
                    <CustomButton
                        editable={false}
                        type="button"
                        onClick={() => {
                            setDelete();
                        }}
                        className="font-bold"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </CustomButton>
                )}
            </div>
        );
    }
);
export default Header;
