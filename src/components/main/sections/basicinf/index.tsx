import { SyntheticEvent, useRef, useState } from "react";
import Header from "@src/components/common/inputs/header";
import {
    Control,
    Controller,
    ControllerFieldState,
    ControllerRenderProps,
    FieldValues,
    UseFormReturn,
    UseFormStateReturn,
    useWatch,
} from "react-hook-form";
import NormalInput, {
    OptionsInput,
} from "@src/components/common/inputs/normal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Grid2Container from "@src/components/common/2GridInputHolder";
import data from "./data.json";
import UploadButton from "@src/components/common/uploadAvatar";
import classNames from "classnames";
import SelectInput, {
    OptionType,
} from "@src/components/common/inputs/selectOption";
import UploadPDF from "./uploadPdf";
import PhoneNumber from "./phoneNumber";
import React from "react";
import { onDelete as AvatarOnDelete } from "./uploadPdf";
import DatePicker from "@src/components/common/inputs/datePickerComplete";
import { BottomLine, LabelElem } from "@src/components/common/inputs/styles";
const COUNTRIES = Object.keys(data.countries).map((name) => name);
const CITIES: Map<string, string[]> = new Map(Object.entries(data.countries));
const JOP_TITLES = data.jobs;

export interface InputData {
    info: {
        head: string;
        data: {
            imgUrl: string;
            jobTitle?: string;
            firstName?: string;
            lastName?: string;
            email?: string;
            phone?: string;
            country?: string;
            city?: string;
            address?: string;
            postalCode?: string;
            nationality?: string;
            placeOfBirth?: string;
            availability?: string;
            militaryState?: string;
            maritalState?: string;
            dateOfBirth?: string;
            cv?: string;
        };
    };
}
export const onDelete: (val: InputData) => Promise<void> = async (val) => {
    return AvatarOnDelete(val.info.data.imgUrl);
};
const AvailabilityOptions: OptionType[] = data.availabilityOptions;
type CityInputProps = Omit<Parameters<typeof OptionsInput>[0], "options"> & {
    control: Control<any>;
};
const CityInput = React.forwardRef<HTMLInputElement, CityInputProps>(
    ({ control, ...props }, ref) => {
        const country = useWatch({ control, name: "info.data.country" });
        return (
            <OptionsInput
                control={control}
                options={CITIES.get(country) || []}
                {...props}
            />
        );
    }
);
function DatePickerG({ control }: { control: Control<InputData> }) {
    return (
        <Controller
            render={({ field }) => {
                return (
                    <LabelElem label="Date Of Birth">
                        <div className="relative">
                            <BottomLine>
                                <DatePicker
                                    value={
                                        field.value
                                            ? new Date(field.value)
                                            : new Date()
                                    }
                                    onChange={(val) => {
                                        if (!val) return;
                                        field.onChange(val.toString());
                                    }}
                                />
                            </BottomLine>
                        </div>
                    </LabelElem>
                );
            }}
            name={"info.data.dateOfBirth"}
            control={control}
        />
    );
}
export default function BasicInfo({
    register,
    resetField,
    control,
}: UseFormReturn<InputData>) {
    const [eddData, setEddData] = useState(false);

    return (
        <section className="my-4">
            <Header
                control={control}
                reset={() => resetField("info.head")}
                {...register("info.head", {
                    onBlur(e: SyntheticEvent<HTMLInputElement>) {
                        if (!e.currentTarget.value) resetField("info.head");
                    },
                })}
            />
            <Grid2Container>
                <OptionsInput
                    label="Wanted Job Title"
                    placeholder="e.g. Teacher"
                    options={JOP_TITLES}
                    control={control}
                    {...register("info.data.jobTitle")}
                />
                <UploadButton
                    label="Upload photo"
                    name="info.data.imgUrl"
                    imageId="info.data.imgUrl"
                    control={control}
                />
                <NormalInput
                    control={control}
                    label="First Name"
                    {...register("info.data.firstName")}
                />
                <NormalInput
                    control={control}
                    label="Last Name"
                    {...register("info.data.lastName")}
                />
                <NormalInput
                    control={control}
                    label="Email"
                    type="email"
                    {...register("info.data.email")}
                />
                <PhoneNumber
                    label="Phone"
                    control={control}
                    name="info.data.phone"
                />
                <OptionsInput
                    label="Country"
                    options={COUNTRIES}
                    control={control}
                    {...register("info.data.country")}
                />
                <SelectInput
                    options={AvailabilityOptions}
                    label="Availability"
                    control={control}
                    {...register(`info.data.availability`)}
                />
            </Grid2Container>
            <div
                className={classNames(
                    "transition-all duration-300 grid grid-rows-[0fr]",
                    {
                        "grid-rows-[1fr] mt-4": eddData,
                    }
                )}
            >
                <div className="overflow-hidden">
                    <Grid2Container>
                        <CityInput
                            label="City"
                            control={control}
                            {...register("info.data.city")}
                        />
                        <NormalInput
                            control={control}
                            label="Address"
                            {...register("info.data.address")}
                        />
                        <NormalInput
                            control={control}
                            label="Postal Code"
                            {...register("info.data.postalCode")}
                        />
                        <NormalInput
                            control={control}
                            label="Nationality"
                            {...register("info.data.nationality")}
                        />
                        <DatePickerG control={control} />
                        <UploadPDF
                            pdfId="info.data.cv"
                            label="Upload you Cv"
                            control={control}
                            name="info.data.cv"
                        />
                    </Grid2Container>
                </div>
            </div>

            <button
                type="button"
                className="text-blue-60 hover:text-blue-90 font-medium mt-5"
                onClick={() => setEddData(!eddData)}
            >
                {eddData && <span>Hide additional details</span>}
                {!eddData && <span>Edit additional details</span>}
                <FontAwesomeIcon icon={eddData ? faChevronDown : faChevronUp} />
            </button>
        </section>
    );
}
