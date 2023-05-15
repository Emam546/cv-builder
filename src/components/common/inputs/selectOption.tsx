import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { BottomLine, GeneralInputProps, LabelElem } from "./styles";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { assertIsNode } from "@src/utils";
import { useSyncRefs } from "@src/utils/hooks";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export interface OptionType {
    val: string | "";
    label: string;
}
export interface Props extends GeneralInputProps<string> {
    label?: string;
    options: OptionType[];
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
            setValue,
            label,
            ...props
        },
        ref
    ) => {
        const [id, setId] = useState("");
        const [expand, setExpand] = useState(false);
        const containerDiv = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);
        const v = inputRef.current?.value;
        const inpVal = options.findIndex((val) => v && val.val == v);
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
        useEffect(() => {
            setId(uuid());
        }, []);
        const [focus, setFocus] = useState(false);

        const allRef = useSyncRefs(ref, inputRef);
        return (
            <LabelElem
                label={label}
                id={id}
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
                                fontSize={"1em"}
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
                                        if (!inputRef.current) return;
                                        inputRef.current.value = options[i].val;
                                        setExpand(false);
                                    }}
                                />
                            );
                        })}
                    </div>
                    <input
                        {...props}
                        type="hidden"
                        ref={allRef}
                        autoComplete="off"
                        className="appearance-none invisible absolute"
                        id={id}
                        onFocusCapture={(ev) => {
                            if (props.onFocusCapture) props.onFocusCapture(ev);
                            setFocus(true);
                        }}
                        onBlurCapture={(ev) => {
                            if (props.onBlurCapture) props.onBlurCapture(ev);
                            setFocus(false);
                        }}
                    />
                </div>
            </LabelElem>
        );
    }
);
export default SelectInput;
