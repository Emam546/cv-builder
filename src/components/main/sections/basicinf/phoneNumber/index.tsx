import PhoneInput from "react-phone-number-input";
import React from "react";
import { Control, useController } from "react-hook-form";
import { LabelElem } from "@src/components/common/inputs/styles";
import style from "./style.module.scss";
interface Props {
    name: string;
    control: Control;
    label?: string;
}
const PhoneNumber = React.forwardRef<HTMLInputElement, Props>(
    ({ name, control, label }, ref) => {
        const { field } = useController({ control, name });
        return (
            <LabelElem label={label}>
                <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="US"
                    placeholder="Enter phone number"
                    onChange={(val: string) => field.onChange(val)}
                    value={field.value}
                    className={style.phone_number}
                />
            </LabelElem>
        );
    }
);
export default PhoneNumber;
