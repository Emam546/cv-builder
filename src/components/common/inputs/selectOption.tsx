import React, { useEffect, useRef, useState } from "react";
import { BottomLine, GeneralInputProps, LabelElem } from "./styles";
import classNames from "classnames";
import { assertIsNode } from "@src/utils";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Control, useController } from "react-hook-form";
export interface OptionType {
    val: string | "";
    label: string;
}
export interface Props extends GeneralInputProps<string> {
    label?: string;
    control: Control<any>;
    options: OptionType[];
    name: string;
}
function LiElem({
    val,
    label,
    ...props
}: { val: string; label: string } & React.LiHTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={classNames(
                "hover:bg-blue-20 block px-4 py-3 cursor-pointer select-none hover:text-blue-60",
                "aria-selected:text-neutral-40"
            )}
            {...props}
        >
            {label}
        </div>
    );
}

const SelectInput = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            options = [{ val: "", label: "Select Option" }],
            label,
            control,
            name,
            ...props
        },
        ref
    ) => {
        const [expand, setExpand] = useState(false);
        const containerDiv = useRef<HTMLDivElement>(null);
        const { field } = useController({ name, control });
        const inpVal = options.findIndex((val) => val.val == field.value);
        const val = (inpVal > -1 && inpVal) || 0;
        useEffect(() => {
            function handelClick(e: MouseEvent) {
                if (!containerDiv.current) return;
                assertIsNode(e.target);
                const state = containerDiv.current.contains(e.target);
                setFocus(state);
                if (!state) setExpand(false);
            }
            window.addEventListener("click", handelClick);
            return () => window.removeEventListener("click", handelClick);
        }, []);
        const [focus, setFocus] = useState(false);
        return (
            <LabelElem
                label={label}
                ref={containerDiv}
            >
                <div className="relative">
                    <BottomLine focus={focus}>
                        <div
                            onClick={() => {
                                setExpand(!expand);
                                setFocus(true);
                            }}
                            className={classNames(
                                "bg-neutral-10 px-4 py-3 block w-full cursor-pointer select-none",
                                "flex items-center justify-between"
                            )}
                        >
                            <span>{options[val].label}</span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={classNames(
                                    "text-blue-60 transition duration-200",
                                    {
                                        "-rotate-180": expand,
                                    }
                                )}
                            />
                        </div>
                    </BottomLine>
                    <div
                        className={classNames(
                            "absolute z-10 bg-neutral-10  py-1 top-[calc(100%+3px)] w-full left-0 max-h-48 overflow-y-auto",
                            { hidden: !expand || !focus }
                        )}
                        aria-expanded={expand}
                    >
                        {options.map(({ val: valLi, label }, i) => {
                            return (
                                <LiElem
                                    val={valLi}
                                    key={i}
                                    label={label}
                                    tabIndex={i}
                                    aria-selected={i == val}
                                    onClick={() => {
                                        field.onChange(options[i].val);
                                        setExpand(false);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                <input
                    {...props}
                    ref={field.ref}
                    name={name}
                    type="hidden"
                    autoComplete="off"
                    onFocusCapture={(ev) => {
                        if (props.onFocusCapture) props.onFocusCapture(ev);
                        setFocus(true);
                    }}
                    onBlurCapture={(ev) => {
                        if (props.onBlurCapture) props.onBlurCapture(ev);
                        setFocus(false);
                    }}
                />
            </LabelElem>
        );
    }
);
export default SelectInput;
