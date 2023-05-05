/* eslint-disable react/display-name */
import React from "react";
import { ElemType } from "@src/components/common/InsertCommonData";
import { Elem } from "@src/components/common/InsertCommonData/Elem";
import { FieldsType } from "@src/components/common/InsertCommonData/types";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
export type NameType = "references";
export const Name: NameType = "references";
export interface InputData extends FieldsType {
    name: string;
    company: string;
    phone: string;
    email: string;
}
const CourseElem: ElemType<InputData, NameType> = React.forwardRef(
    (
        { index: i, values, form: { register, control, setValue }, ...props },
        ref
    ) => {
        const { name, company } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        return (
            <Elem
                headLabel={() => (
                    <>
                        <p className="font-bold group-hover:text-blue-60">
                            {name || "(Not Specified)"}
                        </p>
                        <p className="text-sm text-neutral-50">{company}</p>
                    </>
                )}
                {...props}
                ref={ref}
            >
                <Grid2Container className="pb-4">
                    <NormalInput
                        label="Referent's Full Name"
                        {...register(`${Name}.data.${i}.label`)}
                    />
                    <NormalInput
                        label="Company"
                        {...register(`${Name}.data.${i}.institution`)}
                    />
                    <NormalInput
                        label="Phone"
                        {...register(`${Name}.data.${i}.label`)}
                    />
                    <NormalInput
                        label="Email"
                        {...register(`${Name}.data.${i}.institution`)}
                    />
                </Grid2Container>
            </Elem>
        );
    }
);
export default CourseElem;
