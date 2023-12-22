import {
    BaseSingleInputFieldProps,
    DatePickerProps,
    DateValidationError,
    FieldSection,
    DatePicker as OrgDatePicker,
    UseDateFieldProps,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formateDate } from "@src/utils";
import classNames from "classnames";
import { BottomLine, LabelElem, StyledInput } from "./styles";
export type Props = {
    value: Date;
    onChange?: (val: Date) => any;
} & Omit<DatePickerProps<Dayjs>, "value" | "onChange">;
interface ButtonFieldProps
    extends UseDateFieldProps<Dayjs>,
        BaseSingleInputFieldProps<
            Dayjs | null,
            Dayjs,
            FieldSection,
            DateValidationError
        > {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
function CustomField(props: ButtonFieldProps) {
    return (
        
                <div
                    ref={props.InputProps?.ref}
                    aria-disabled={props.disabled}
                    className={classNames(
                        "focus:outline-none bg-neutral-10 px-4 py-3 block w-full"
                    )}
                >
                    <div className="flex items-center">
                        <p aria-disabled={props.disabled} className="flex-1">
                            {formateDate(props.value!.toDate(), "/")}
                        </p>
                        <div className="flex items-center tw-mx-2 tw-flex h-0 ">
                            <button
                                disabled={props.disabled}
                                onClick={() => props.setOpen?.(true)}
                                type="button"
                                className=" p-2 border-none text-gray-400 bg-inherit text-xl"
                            >
                                <FontAwesomeIcon icon={faCalendarDays} />
                            </button>
                        </div>
                    </div>
                </div>

    );
}
export default function DatePicker({ value, onChange, ...props }: Props) {
    const [open, setOpen] = useState(false);
    return (
        <OrgDatePicker
            value={dayjs(value)}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            slots={{
                field: CustomField,
            }}
            slotProps={{
                field: { setOpen } as any,
            }}
            onChange={(v) => onChange && onChange((v as Dayjs).toDate())}
            {...props}
        />
    );
}
