import { SyntheticEvent, useRef, useState } from "react";
import Header from "@src/components/common/inputs/header";
import { Control, FieldValues, UseFormReturn, useWatch } from "react-hook-form";
import NormalInput from "@src/components/common/inputs/normal";
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
            cv?: string;
        };
    };
}
const AvailabilityOptions: OptionType[] = data.availabilityOptions;
type CityInputProps = Parameters<typeof NormalInput>[0] & { control: Control };
function CityInput({ control, ...props }: CityInputProps) {
    const country = useWatch({ control, name: "info.data.country" });
    return (
        <NormalInput
            options={CITIES.get(country) || []}
            {...props}
        />
    );
}
export default function BasicInfo({
    register,
    resetField,
    control,
    setValue,
}: UseFormReturn<InputData>) {
    const [eddData, setEddData] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <section className="my-4">
            <Header
                control={control as any}
                reset={() => resetField("info.head")}
                {...register("info.head", {
                    onBlur(e: SyntheticEvent<HTMLInputElement>) {
                        if (!e.currentTarget.value) resetField("info.head");
                    },
                })}
            />
            <Grid2Container ref={ref}>
                <NormalInput
                    label="Wanted Job Title"
                    placeholder="e.g. Teacher"
                    options={JOP_TITLES}
                    setValue={(val) => setValue("info.data.jobTitle", val)}
                    {...register("info.data.jobTitle")}
                />
                <UploadButton
                    label="Upload photo"
                    name="info.data.imgUrl"
                    imageId="info.data.imgUrl"
                    control={control as any}
                />
                <NormalInput
                    label="First Name"
                    {...register("info.data.firstName")}
                />
                <NormalInput
                    label="Last Name"
                    {...register("info.data.lastName")}
                />
                <NormalInput
                    label="Email"
                    type="email"
                    {...register("info.data.email")}
                />
                <NormalInput
                    label="Phone"
                    {...register("info.data.phone")}
                />
                <NormalInput
                    label="Country"
                    options={COUNTRIES}
                    setValue={(val) => setValue("info.data.country", val)}
                    {...register("info.data.country")}
                />
                <SelectInput
                    options={AvailabilityOptions}
                    label="availability"
                    control={control as any}
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
                            control={control as any}
                            setValue={(val: string) =>
                                setValue("info.data.city", val)
                            }
                            {...register("info.data.city")}
                        />
                        <NormalInput
                            label="Address"
                            {...register("info.data.address")}
                        />
                        <NormalInput
                            label="Postal Code"
                            {...register("info.data.postalCode")}
                        />
                        <NormalInput
                            label="Nationality"
                            {...register("info.data.nationality")}
                        />
                        <UploadPDF
                            pdfId="info.data.cv"
                            label="Upload you Cv"
                            control={control as any}
                            {...register("info.data.cv")}
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
