import React, { SyntheticEvent } from "react";
import { useWatch } from "react-hook-form";
import FinalEditor from "@src/components/common/inputs/Editor";
import { ElemType } from "./InsertCommonData";
import NormalInput from "@src/components/common/inputs/normal";
import { Elem } from "./InsertCommonData/Elem";
import { uuid } from "@src/utils";
import Grid2Container from "@src/components/common/2GridInputHolder";

export interface InputData {
    id: string;
    title: string;
    desc: string;
}
export const InitData: () => InputData = () => ({
    id: uuid(),
    desc: "<p></p>\n",
    title: "",
});
export type NameType = "paragraph";
export const Name: NameType = "paragraph";

const Professional = React.forwardRef(
    (
        {
            index: i,
            props: {
                form: { control, register },
                name,
            },
            ...props
        },
        ref
    ) => {
        return (
            <Elem
                {...props}
                headLabel={function G() {
                    const { title } = useWatch({
                        control,
                        name: `${name}.data.${i}`,
                    });
                    return (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {title || "(Not Specified)"}
                            </p>
                        </>
                    );
                }}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        control={control}
                        label="Title"
                        {...register(`${name}.data.${i}.title`)}
                    />
                </Grid2Container>
                <div className="my-4">
                    <FinalEditor
                        control={control}
                        {...register(`${name}.data.${i}.desc`)}
                        placeholder="e.g. passionate science teacher with 8+ years of experience and track record of ..."
                    />
                </div>
            </Elem>
        );
    }
) as ElemType<InputData>;

export default Professional;
