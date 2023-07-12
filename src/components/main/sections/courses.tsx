import React from "react";
import { ListElemType } from "@src/components/main/sections/InsertCommonData/input";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import DatePicker from "@src/components/common/inputs/datePicker";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem, WrapElem } from "@src/components/common/inputs/styles";
import {
    InputData as ImageInputData,
    ListElem as ImageListItem,
    InitData as ImageInitData,
    onDelete as ImageOnDelete,
} from "@src/components/main/sections/photos";
import InfoGetter from "./InsertCommonData/input";
import { uuid } from "@src/utils";
export const Name = "courses";
export type NameType = typeof Name;
export type NameRules = string;
export interface InputData {
    id: string;
    label: string;
    institution: string;
    date: {
        start: string;
        end: string | "Present";
    };
    desc: string;
    images: ImageInputData[];
}
export const InitData: () => InputData = () => ({
    id: uuid(),
    label: "",
    institution: "",
    date: {
        start: "",
        end: "",
    },
    desc: "<p></p>\n",
    images: [],
});
export const onDelete: (val: InputData) => Promise<void> = async (val) => {
    await Promise.all(val.images.map(ImageOnDelete));
};
export const MainElem = React.forwardRef(
    ({ index: i, props: { form, name }, ...props }, ref) => {
        const { register, control } = form;
        const ImagePath = `${name}.data.${i}.images`;
        return (
            <Elem
                headLabel={function G() {
                    const { label, institution } = useWatch({
                        name: `${name}.data.${i}`,
                        control,
                    });
                    return (
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
                    );
                }}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        control={control}
                        label="Course"
                        {...register(`${name}.data.${i}.label`)}
                    />
                    <NormalInput
                        control={control}
                        label="Institution"
                        {...register(`${name}.data.${i}.institution`)}
                    />
                    <DatePicker
                        applyPresent
                        label="Start &End Time"
                        startData={{
                            ...register(`${name}.data.${i}.date.start`),
                            placeholder: "MM / YYYY",
                        }}
                        endData={{
                            ...register(`${name}.data.${i}.date.end`),
                            placeholder: "MM / YYYY",
                        }}
                        control={control}
                        labelEnd="Currently Work here."
                    />
                </Grid2Container>
                <div className="my-4">
                    <InfoGetter
                        label={"Images"}
                        formRegister={form as any}
                        name={ImagePath}
                        Elem={ImageListItem}
                        addButtonLabel="Add one more Image"
                        initData={ImageInitData}
                        onDeleteElem={ImageOnDelete}
                    />
                </div>
                <WrapElem
                    label={"Description"}
                    className="my-4"
                >
                    <FinalEditor
                        control={control}
                        {...register(`${name}.data.${i}.desc`)}
                        placeholder="e.g. Created and implemented lesson plans based on child-led interests and curiosities"
                    />
                </WrapElem>
            </Elem>
        );
    }
) as ElemType<InputData>;

export default MainElem;
