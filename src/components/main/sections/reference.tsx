import React from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import { uuid } from "@src/utils";
export type NameType = "references";
export const Name: NameType = "references";
export interface InputData {
    id: string;
    name: string;
    company: string;
    phone: string;
    email: string;
}
export const InitData = () => ({
    id: uuid(),
    name: "string",
    company: "string",
    phone: "string",
    email: "string",
});
const ReferenceElem: ElemType<InputData> = React.forwardRef(
    (
        {
            index: i,
            props: {
                form: { register, control, setValue },
            },
            ...props
        },
        ref
    ) => {
        return (
            <Elem
                headLabel={function G() {
                    const { name, company } = useWatch({
                        name: `${Name}.data.${i}`,
                        control,
                    });
                    return (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {name || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">{company}</p>
                        </>
                    );
                }}
                {...props}
                ref={ref}
            >
                <Grid2Container className="pb-4">
                    <NormalInput
                        label="Referent's Full Name"
                        {...register(`${Name}.data.${i}.name`)}
                    />
                    <NormalInput
                        label="Company"
                        {...register(`${Name}.data.${i}.company`)}
                    />
                    <NormalInput
                        label="Phone"
                        {...register(`${Name}.data.${i}.phone`)}
                    />
                    <NormalInput
                        label="Email"
                        {...register(`${Name}.data.${i}.email`)}
                    />
                </Grid2Container>
            </Elem>
        );
    }
);
export default ReferenceElem;
