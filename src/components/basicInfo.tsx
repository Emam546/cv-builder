import { SyntheticEvent, useState } from "react";
import Header from "@src/components/common/inputs/header";
import { UseFormReturn } from "react-hook-form";
import NormalInput from "@src/components/common/inputs/normal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSmoothExpand } from "@src/utils/hooks";
import Grid2Container from "./common/2GridInputHolder";
export interface InputData {
    basicInfoHead: string;
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
}
export default function BasicInfo({
    register,
    resetField,
    control,
}: UseFormReturn<InputData>) {
    const [eddData, setEddData] = useState(false);
    const ref = useSmoothExpand<HTMLDivElement>(null, eddData);

    return (
        <section className="my-4">
            <Header
                reset={() => resetField("basicInfoHead")}
                {...register("basicInfoHead", {
                    onBlur(e: SyntheticEvent<HTMLInputElement>) {
                        if (!e.currentTarget.value) {
                            resetField("basicInfoHead");
                        }
                    },
                })}
                defaultValue={control._defaultValues.basicInfoHead}
                placeholder="Untitled"
            />
            <Grid2Container
                ref={ref}
                className="transition-[width] duration-700"
            >
                <NormalInput
                    label="Wanted Job Title"
                    placeholder="e.g. Teacher"
                    {...register("jobTitle")}
                />
                <NormalInput
                    label="First Name"
                    {...register("firstName")}
                />
                <NormalInput
                    label="Last Name"
                    {...register("lastName")}
                />
                <NormalInput
                    label="Email"
                    type="email"
                    {...register("email")}
                />
                <NormalInput
                    label="Phone"
                    {...register("phone")}
                />
                <NormalInput
                    label="Country"
                    {...register("country")}
                />
                <NormalInput
                    label="City"
                    {...register("city")}
                />
                {eddData && (
                    <>
                        <NormalInput
                            label="Address"
                            {...register("address")}
                        />
                        <NormalInput
                            label="Postal Code"
                            {...register("postalCode")}
                        />
                        <NormalInput
                            label="Nationality"
                            {...register("nationality")}
                        />
                    </>
                )}
            </Grid2Container>
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
