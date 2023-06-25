import React from "react";
import CreatableSelect from "react-select/creatable";
import { SelectInstance } from "react-select";
import makeAnimated from "react-select/animated";
import { Control, useController } from "react-hook-form";
const animatedComponents = makeAnimated();
interface Props {
    options: { value: string; label: string }[];
    defaultValue?: { value: string; label: string }[];
    name: string;
    control: Control;
}
const MultiSelectInput = React.forwardRef<SelectInstance, Props>(
    ({ options, defaultValue, ...prop }, ref) => {
        const { field } = useController({ ...prop, defaultValue });
        const value = options.filter((v) =>
            (field.value as string[]).includes(v.value)
        );

        return (
            <CreatableSelect
                ref={ref}
                onChange={(newValue: any, e) => {
                    field.onChange(newValue.map((val: any) => val.value));
                }}
                closeMenuOnSelect={true}
                components={animatedComponents}
                isMulti
                defaultValue={value}
                options={options as any}
            />
        );
    }
);
export default MultiSelectInput;
