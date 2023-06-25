import React, { useMemo } from "react";
import { ListElemType } from "@src/components/main/sections/InsertCommonData/input";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import DatePicker from "@src/components/common/inputs/datePicker";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem } from "@src/components/common/inputs/styles";
import {
    InputData as ImageInputData,
    ListElem as ImageListItem,
    InitData as ImageInitData,
} from "@src/components/main/sections/photos";
import InfoGetter from "./InsertCommonData/input";
import lodash from "lodash";
import { uuid } from "@src/utils";
export const Name = "education";
export type NameType = typeof Name;
export type NameRules = string;
export interface InputData {
    id: string;
    degree: string;
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
        const { register, control } = form;

        const ImagePath = `${Name}.${i}.images`;
        return (
            <Elem
                headLabel={function G() {
                    const { degree, institution } = useWatch({
                        name: `${Name}.${i}`,
                        control,
                    });
                    return (
                        <p className="font-bold group-hover:text-blue-60">
                            {`${
                                (degree == "" &&
                                    institution == "" &&
                                    "(Not specified)") ||
                                ""
                            } ${degree} ${
                                (degree != "" && institution != "" && "at") ||
                                ""
                            } ${institution}`}
                        </p>
                    );
                }}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="Degree"
                        {...register(`${Name}.${i}.degree`)}
                    />
                    <NormalInput
                        label="Collage or Institution"
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
                        control={control}
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
                        Elem={ImageListItem}
                        addButtonLabel="add one more Image"
                        initData={ImageInitData}
                    />
                </LabelElem>
                <LabelElem
                    label={"Description"}
                    className="my-4"
                >
                    <FinalEditor
                        control={control}
                        {...register(`${Name}.${i}.desc`)}
                        placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities"
                    />
                </LabelElem>
            </Elem>
        );
    }) as ListElemType<InputData>;
}
export const InitData: () => InputData = () => ({
    id: uuid(),
    degree: "",
    institution: "",
    date: {
        start: "",
        end: "",
    },
    desc: "<p></p>\n",
    images: [],
});
export default CreateItem(`${Name}.data`) as unknown as ElemType<InputData>;
