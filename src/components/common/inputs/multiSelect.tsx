import React from "react";
import CreatableSelect from "react-select/creatable";
import { SelectInstance } from "react-select";
import makeAnimated from "react-select/animated";
import { GeneralInputProps, SetInputProps } from "./styles";
const animatedComponents = makeAnimated();
interface Props extends GeneralInputProps<(string | number)[]> {
    options: { value: string; label: string }[];
    defaultValues?: { value: string; label: string }[];
}
const MultiSelectInput = React.forwardRef<SelectInstance, Props>(
    ({ setValue, options, defaultValues, ...props }, ref) => {
        return (
            <CreatableSelect
                {...props}
                ref={ref}
                onChange={(newValue: any, e) => {
                    if (setValue)
                        setValue(newValue.map((val: any) => val.value));
                }}
                closeMenuOnSelect={true}
                components={animatedComponents}
                isMulti
                defaultValue={defaultValues as any[]}
                options={options as any}
            />
        );
    }
);
export default MultiSelectInput;
