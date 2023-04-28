/* eslint-disable react/display-name */
import { assertIsNode } from "@src/utils";
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
import { v4 as uuid } from "uuid";
type Props = {
    label: string;
    innerRef: React.RefObject<HTMLInputElement>;
    options?: string[];
} & InputHTMLAttributes<HTMLInputElement>;
function DropDownComp({
    value,
    options,
    selectOption,
    containerRef,
}: {
    value: string;
    options: string[];
    selectOption: Dispatch<string>;
    containerRef: React.RefObject<HTMLElement>;
}) {
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const validOptions = options.filter((val) =>
        val.toLowerCase().includes(value.toLowerCase())
    );
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            assertIsNode(e.target);
            if (!containerRef.current?.contains(e.target)) return;
            switch (e.code) {
                case "Enter":
                    selectOption(options[highlightedIndex]);
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
                // case "Escape":
                //     setIsOpen(false);
                //     break;
            }
        };
        containerRef.current?.addEventListener("keydown", handler);

        return () => {
            containerRef.current?.removeEventListener("keydown", handler);
        };
    }, [highlightedIndex, validOptions]);
    if (!validOptions.length) return null;
    return (
        <ul className="absolute top-full left-0 w-full  bg-neutral-10">
            {validOptions.slice(0, 7).map((val, i) => {
                const startIndex = val
                    .toLowerCase()
                    .indexOf(value.toLowerCase());
                return (
                    <li
                        key={i}
                        onClick={(e) => {
                            e.stopPropagation();
                            selectOption(val);
                        }}
                        className={classNames("py-2 px-4 select-none", {
                            "bg-blue-20 text-blue-60": i == highlightedIndex,
                        })}
                    >
                        {val.slice(0, startIndex)}
                        <b>{value}</b>
                        {val.slice(startIndex + value.length, val.length)}
                    </li>
                );
            })}
        </ul>
    );
}

function Component({  label, innerRef, options, ...props }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [focus, setFocus] = useState(false);
    const setRef = useSyncRefs(inputRef, innerRef);
    const containerRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<string>("");
    const id = uuid();
    useEffect(() => {
        if (!inputRef.current) return;
        const input = inputRef.current;
        function focusIn() {
            setFocus(true);
        }
        function focusOut() {
            setFocus(false);
        }
        input.addEventListener("focusin", focusIn);
        input.addEventListener("focusout", focusOut);
        return () => {
            input.removeEventListener("focusin", focusIn);
            input.removeEventListener("focusout", focusOut);
        };
    }, [inputRef]);
    return (
        <div ref={containerRef}>
            <label
                htmlFor={id}
                className="text-sm text-neutral-40 leading-6"
            >
                {label}
            </label>
            <BottomLine>
                <StyledInput
                    type="text"
                    {...props}
                    id={id}
                    autoComplete="off"
                    ref={setRef}
                    onChange={(ev) => {
                        if (props.onChange) props.onChange(ev);
                        setValue(ev.target.value);
                    }}
                    onFocusCapture={(ev) => {
                        if (props.onFocusCapture) props.onFocusCapture(ev);
                        setFocus(true);
                    }}
                />
                {options && focus && value && (
                    <DropDownComp
                        value={value}
                        options={options}
                        containerRef={containerRef}
                        selectOption={(val) => {
                            if (!inputRef.current) return;
                            inputRef.current.value = val;
                            setValue(val);
                            setFocus(false);
                        }}
                    />
                )}
            </BottomLine>
        </div>
    );
}

const NormalInput = React.forwardRef<
    HTMLInputElement,
    Pick<Props, Exclude<keyof Props, "innerRef">>
>((props, ref) => (
    <Component
        {...props}
        innerRef={ref as any}
    />
));
export default NormalInput;
