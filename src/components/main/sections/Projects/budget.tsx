import SelectInput, {
    OptionType,
    Props as SelectProps,
} from "@src/components/common/inputs/selectOption";
import {
    StyledInput,
    LabelElem,
    GeneralInputProps,
} from "@src/components/common/inputs/styles";
import currencies from "./options.json";
import { Control } from "react-hook-form";

const options: OptionType[] = currencies.map((val) => ({
    label: `${val.name} (${val.code})`,
    val: val.code,
}));
type Props = {
    label: string;
    price?: GeneralInputProps<number>;
    unit: Omit<SelectProps, "options">;
};

export default function BudgetInput({ label, price, unit }: Props) {
    return (
        <LabelElem label={label}>
            <div className="flex flex-wrap gap-x-3 gap-y-4">
                <div className="flex-1">
                    <StyledInput {...price} />
                </div>
                <div className="flex-1">
                    <SelectInput {...{ ...unit, options: options }} />
                </div>
            </div>
        </LabelElem>
    );
}
