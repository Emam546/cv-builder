import React, { useMemo } from "react";
import { ListElemType as ElemType } from "@src/components/main/sections/InsertCommonData/input";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { Path, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import DatePicker from "@src/components/common/inputs/datePicker";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem } from "@src/components/common/inputs/styles";
import {
    InputData as ImageInputData,
    CreateElem as CreateImageItem,
    InitData as ImageInitData,
} from "@src/components/main/sections/photos";
import InfoGetter from "./InsertCommonData/input";
import lodash from "lodash";
export const Name = "courses";
export type NameType = typeof Name;
export type NameRules = string;
export interface InputData extends FieldsType {
    label: string;
    institution: string;
    date: {
        start: string;
        end: string | "Present";
    };
    desc: string;
    images: ImageInputData[];
}
export function CreateItem(Name: NameRules) {
    return React.forwardRef(({ index: i, props: { form }, ...props }, ref) => {
        const { register, control, setValue } = form;
        const { label, institution } = useWatch({
            name: `${Name}.${i}`,
            control,
        });
        const ImagePath = `${Name}.${i}.images`;
        const ImageItem = useMemo(() => CreateImageItem(ImagePath), [i]);
        return (
            <Elem
                headLabel={() => (
                    <p className="font-bold group-hover:text-blue-60">
                        {`${
                            (label == "" &&
                                institution == "" &&
                                "(Not specified)") ||
                            ""
                        } ${label} ${
                            (label != "" && institution != "" && "at") || ""
                        } ${institution}`}
                    </p>
                )}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="Course"
                        {...register(`${Name}.${i}.label`)}
                    />
                    <NormalInput
                        label="Institution"
                        {...register(`${Name}.${i}.institution`)}
                    />
                    <DatePicker
                        applyPresent
                        label="Start &End Time"
                        startData={{
                            ...register(`${Name}.${i}.date.start`),
                            placeholder: "MM / YYYY",
                        }}
                        endData={{
                            ...register(`${Name}.${i}.date.end`),
                            placeholder: "MM / YYYY",
                        }}
                        control={control as any}
                        labelEnd="Currently Work here."
                    />
                </Grid2Container>
                <LabelElem
                    label={"Images"}
                    className="my-4"
                >
                    <InfoGetter
                        formRegister={form as any}
                        name={ImagePath}
                        Elem={ImageItem}
                        addButtonLabel="add one more Image"
                        initData={ImageInitData}
                    />
                </LabelElem>
                <LabelElem
                    label={"Description"}
                    className="my-4"
                >
                    <FinalEditor
                        control={control as any}
                        defaultValue={
                            lodash.get(
                                control._defaultValues,
                                `${Name}.${i}.desc`
                            ) as any
                        }
                        {...register(`${Name}.${i}.desc`)}
                        placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities"
                    />
                </LabelElem>
            </Elem>
        );
    }) as ElemType<InputData, NameRules>;
}
export const InitData: InputData = {
    label: "",
    institution: "",
    date: {
        start: "",
        end: "",
    },
    desc: "",
    images: [],
};
export default CreateItem(`${Name}.data`);
