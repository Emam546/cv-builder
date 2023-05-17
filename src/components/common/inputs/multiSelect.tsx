import React, { useMemo, useState } from "react";
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
        const [state, setState] = useState<Props["options"]>(
            defaultValue || []
        );
        const child = useMemo(() => {
            return () => (
                <CreatableSelect
                    ref={ref}
                    onChange={(newValue: any, e) => {
                        field.onChange(newValue.map((val: any) => val.value));
                        setState(newValue);
                    }}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    isMulti
                    defaultValue={state}
                    value={state}
                    options={options as any}
                />
            );
        }, [state]);
        return <>{child()}</>;
    }
);
export default MultiSelectInput;
