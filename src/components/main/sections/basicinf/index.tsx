import { SyntheticEvent, useRef, useState } from "react";
import Header from "@src/components/common/inputs/header";
import { FieldValues, UseFormReturn } from "react-hook-form";
import NormalInput from "@src/components/common/inputs/normal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Grid2Container from "@src/components/common/2GridInputHolder";
import data from "./data.json";
import UploadButton from "@src/components/common/uploadAvatar";
import lodash from "lodash";
import classNames from "classnames";
const COUNTRIES = Object.keys(data.countries).map((name) => name);
const CITIES: Map<string, string[]> = new Map(Object.entries(data.countries));
const JOP_TITLES = data.jobs;
export interface InputData extends FieldValues {
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
            [x: string]: any;
        };
    };
}

export default function BasicInfo({
    register,
    resetField,
    control,
    setValue,
}: UseFormReturn<InputData>) {
    const [eddData, setEddData] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [country, setCountry] = useState<string>("");

    return (
        <section className="my-4">
            <Header
                reset={() => resetField("info.head")}
                {...register("info.head", {
                    onBlur(e: SyntheticEvent<HTMLInputElement>) {
                        if (!e.currentTarget.value) resetField("info.head");
                    },
                })}
                defaultValue={control._defaultValues.info?.head}
            />
            <Grid2Container
                ref={ref}
                className="overflow-hidden"
            >
                <NormalInput
                    label="Wanted Job Title"
                    placeholder="e.g. Teacher"
                    options={JOP_TITLES}
                    setValue={(val) => setValue("info.data.jobTitle", val)}
                    {...register("info.data.jobTitle")}
                />
                <UploadButton
                    label="Upload photo"
                    setValue={(val) => setValue("info.data.imgUrl", val)}
                    name="info.data.imgUrl"
                    defaultValue={lodash.get(
                        control._defaultValues,
                        "info.data.imgUrl"
                    )}
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
                    onBlurCapture={(ev) => {
                        setCountry(ev.currentTarget.value);
                    }}
                    {...register("info.data.country")}
                />
                <NormalInput
                    label="City"
                    options={CITIES.get(country)}
                    setValue={(val) => setValue("info.data.city", val)}
                    {...register("info.data.city")}
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
                    </Grid2Container>
                </div>
            </div>

            <button
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
