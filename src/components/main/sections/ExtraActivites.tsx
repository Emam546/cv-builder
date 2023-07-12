import React from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import DatePicker from "@src/components/common/inputs/datePicker";
import FinalEditor from "@src/components/common/inputs/Editor";
import { LabelElem, WrapElem } from "@src/components/common/inputs/styles";
import { uuid } from "@src/utils";
export type NameType = "extraActivities";
export const Name: NameType = "extraActivities";
export interface InputData {
    id: string;
    title: string;
    employer: string;
    date: {
        start: string;
        end: string | "Present";
    };
    city: string;
    desc: string;
}
export const InitData: () => InputData = () => ({
    id: uuid(),
    city: "",
    employer: "",
    date: {
        end: "",
        start: "",
    },
    desc: "<p></p>\n",
    title: "",
});

const ExtraActivites: ElemType<InputData> = React.forwardRef(
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
                    const { title, employer } = useWatch({
                        name: `${Name}.data.${i}`,
                        control,
                    });
                    return (
                        <p className="font-bold group-hover:text-blue-60">
                            {`${
                                (title == "" &&
                                    employer == "" &&
                                    "(Not specified)") ||
                                ""
                            } ${title} ${
                                (title != "" && employer != "" && "at") || ""
                            } ${employer}`}
                        </p>
                    );
                }}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        control={control}
                        label="Function Title"
                        {...register(`${Name}.data.${i}.title`)}
                    />
                    <NormalInput
                        control={control}
                        label="Employer"
                        {...register(`${Name}.data.${i}.employer`)}
                    />
                    <DatePicker
                        applyPresent
                        label="Start &End Time"
                        startData={{
                            ...register(`${Name}.data.${i}.date.start`),
                            placeholder: "MM / YYYY",
                        }}
                        endData={{
                            ...register(`${Name}.data.${i}.date.end`),
                            placeholder: "MM / YYYY",
                        }}
                        control={control}
                        labelEnd="Currently Work here."
                    />
                    <NormalInput
                        control={control}
                        label="City"
                        {...register(`${Name}.data.${i}.city`)}
                    />
                </Grid2Container>
                <WrapElem
                    label={"Description"}
                    className="mt-5 pb-5"
                >
                    <FinalEditor
                        control={control}
                        {...register(`${Name}.data.${i}.desc`)}
                    />
                </WrapElem>
            </Elem>
        );
    }
);
export default ExtraActivites;
