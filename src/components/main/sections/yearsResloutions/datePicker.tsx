import { LabelElem, BottomLine } from "@src/components/common/inputs/styles";
import { Control, Controller } from "react-hook-form";

import DatePicker, {
    Props as DatePickerInputProps,
} from "@src/components/common/inputs/datePickerComplete";
import Grid2Container from "@src/components/common/2GridInputHolder";

interface Props {
    label: string;
    startData: DatePickerInputProps;
    endData: DatePickerInputProps;
    control: Control<any>;
}
export function ExtendedDatePicker({ startData, endData, label }: Props) {
    return (
        <LabelElem label={label}>
            <Grid2Container>
                <BottomLine>
                    <DatePicker {...startData} />
                </BottomLine>

                <BottomLine>
                    <DatePicker {...endData} />
                </BottomLine>
            </Grid2Container>
        </LabelElem>
    );
}
