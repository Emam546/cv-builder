import { assertIsNode, hasOwnProperty } from "@src/utils";
import { useSyncRefs } from "@src/utils/hooks";
import classNames from "classnames";
import React, {
    Dispatch,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react";
import { BottomLine, StyledInput } from "./styles";
import { LabelElem } from "./styles";
import { Control, useController } from "react-hook-form";
export interface PropsWithOutOptions
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    control: Control<any>;
    name: string;
}
export interface PropsWithOptions
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    options: string[];
    control: Control<any>;
    name: string;
}
function DropDownComp({
    value,
    options,
    selectOption,
    containerRef,
    setIsOpen,
    ...props
}: {
    value: string;
    options: string[];
    selectOption: Dispatch<string>;
    containerRef: React.RefObject<HTMLElement>;
    setIsOpen: Dispatch<boolean>;
} & React.HTMLAttributes<HTMLDivElement>) {
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const validOptions = options.filter((val) =>
        val.toLowerCase().includes(value.toLowerCase())
    );
    useEffect(() => {
        const cur = containerRef.current;
        const handler = (e: KeyboardEvent) => {
            assertIsNode(e.target);
            if (!cur?.contains(e.target)) return;
            switch (e.code) {
                case "Enter":
                    selectOption(validOptions[highlightedIndex]);
                    setIsOpen(false);
                    break;
                case "ArrowUp":
                case "ArrowDown": {
                    const newValue =
                        highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue);
                    }
                    break;
                }
                case "Escape":
                    setIsOpen(false);
                    break;
            }
        };
        window.addEventListener("keydown", handler);
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [highlightedIndex, validOptions, value, selectOption]);
    if (
        !validOptions.length ||
        (validOptions.length == 1 && validOptions[0] == value)
    )
        return null;
    return (
        <div
            {...props}
            className={classNames(
                "absolute top-full left-0 w-full bg-neutral-10 z-20",
                props.className
            )}
        >
            {validOptions.slice(0, 7).map((val, i) => {
                const startIndex = val
                    .toLowerCase()
                    .indexOf(value.toLowerCase());
                return (
                    <div
                        key={i}
                        onClick={(e) => {
                            selectOption(validOptions[i]);
                            setIsOpen(false);
                        }}
                        className={classNames(
                            "py-2 px-4 select-none",
                            "aria-selected:bg-blue-20 aria-selected:text-blue-60"
                        )}
                        aria-selected={i == highlightedIndex}
                    >
                        {val.slice(0, startIndex)}
                        <b>{value}</b>
                        {val.slice(startIndex + value.length, val.length)}
                    </div>
                );
            })}
        </div>
    );
}
const NormalInput = React.forwardRef<HTMLInputElement, PropsWithOutOptions>(
    ({ label, control, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { field } = useController({ name: props.name, control });
        return (
            <LabelElem
                ref={containerRef}
                label={label}
            >
                <BottomLine>
                    <StyledInput
                        {...props}
                        autoComplete="off"
                        ref={ref}
                        value={field.value}
                    />
                </BottomLine>
            </LabelElem>
        );
    }
);
export const OptionsInput = React.forwardRef<
    HTMLInputElement,
    PropsWithOptions
>(({ label, control, options, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [focus, setFocus] = useState(false);
    const [open, setIsOpen] = useState(false);
    const allRef = useSyncRefs(ref, inputRef);
    const containerRef = useRef<HTMLDivElement>(null);
    const { field } = useController({ name: props.name, control });
    const value = field.value;
    return (
        <LabelElem
            ref={containerRef}
            label={label}
        >
            <div className="relative">
                <BottomLine>
                    <StyledInput
                        {...props}
                        value={field.value}
                        autoComplete="off"
                        ref={allRef}
                        onChange={(ev) => {
                            if (props.onChange) props.onChange(ev);
                            field.onChange(ev.target.value);
                            setIsOpen(true);
                        }}
                        onFocusCapture={(ev) => {
                            if (props.onFocusCapture) props.onFocusCapture(ev);
                            setFocus(true);
                        }}
                        onBlurCapture={(ev) => {
                            if (props.onBlurCapture) props.onBlurCapture(ev);
                            assertIsNode(ev.target);
                            if (!containerRef.current!.contains(ev.target))
                                setFocus(false);
                        }}
                    />
                </BottomLine>
                {options && value && (
                    <DropDownComp
                        value={value}
                        options={options}
                        containerRef={containerRef}
                        selectOption={(val) => {
                            field.onChange(val);
                            setFocus(false);
                        }}
                        setIsOpen={setIsOpen}
                        className={classNames({
                            hidden: !focus || !open,
                        })}
                    />
                )}
            </div>
        </LabelElem>
    );
});
export default NormalInput;
