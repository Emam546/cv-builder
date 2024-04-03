import React from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import InfoGetter, {
    ListElemType,
} from "@src/components/main/sections/InsertCommonData/input";
import DatePicker from "@src/components/common/inputs/datePicker";
import { WrapElem } from "@src/components/common/inputs/styles";
import RangeInput from "@src/components/common/inputs/rangeInput";

export type EleNameType = string;
export type NameType = "year_resolution";
export const Name: NameType = "year_resolution";
export interface EleInputData {
    id: string;
    name: string;
    progress: number;
    date: {
        start: string;
        end: string;
    };
    desc: string;
}
export const EleInitData: () => EleInputData = () => ({
    id: uuid(),
    name: "",
    desc: "<p></p>\n",
    date: {
        start: "",
        end: "",
    },
    progress: 20,

});

import { uuid } from "@src/utils";

const MiniResolutionElem = React.forwardRef(
    ({ index: i, props: { form, name: EleName }, ...props }, ref) => {
        const { register, control } = form;
        return (
            <Elem
                headLabel={function Title() {
                    const { name } = useWatch({
                        name: `${EleName}.${i}`,
                        control,
                    });
                    return (
                        <div className="font-bold group-hover:text-blue-60">
                            <p className="font-bold group-hover:text-blue-60">
                                {name || "(Not Specified)"}
                            </p>
                        </div>
                    );
                }}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        control={control}
                        label="Target Name"
                        {...register(`${EleName}.${i}.name`)}
                    />
                    <DatePicker
                        applyPresent
                        label="Start &End Time"
                        startData={{
                            ...register(`${EleName}.${i}.date.start`),
                            placeholder: "MM / YYYY",
                        }}
                        endData={{
                            ...register(`${EleName}.${i}.date.end`),
                            placeholder: "MM / YYYY",
                        }}
                        control={control}
                        labelEnd="Currently Work here."
                    />
                    <WrapElem label="Progress">
                        <div>
                            <RangeInput
                                {...register(`${EleName}.${i}.progress`, {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                    </WrapElem>
                </Grid2Container>
                <div className="flex flex-col items-stretch gap-4 my-4">
                    <WrapElem label={"Description"}>
                        <FinalEditor
                            control={control}
                            {...register(`${EleName}.${i}.desc`)}
                            placeholder="Provide a description of the target and its corresponding results."
                        />
                    </WrapElem>
                </div>
            </Elem>
        );
    }
) as ListElemType<EleInputData>;

export interface InputData {
    id: string;
    label: string;
    data: EleInputData[];
}
export const InitData: () => InputData = () => ({
    id: uuid(),
    label: "",
    data: [],
});

type PathType = `${NameType}.data.${number}.data`;
const YearResolutionElem: ElemType<InputData> = React.forwardRef(
    ({ index: i, props: { form }, ...props }, ref) => {
        const { control, register } = form;
        const path: PathType = `${Name}.data.${i}.data`;

        return (
            <Elem
                headLabel={function G() {
                    const { label } = useWatch({
                        name: `${Name}.data.${i}`,
                        control,
                    });
                    return (
                        <div className="font-bold group-hover:text-blue-60">
                            <p className="font-bold group-hover:text-blue-60">
                                {label || "(Not Specified)"}
                            </p>
                        </div>
                    );
                }}
                {...props}
                ref={ref}
            >
                <NormalInput
                    control={control}
                    label="Year"
                    {...register(`${Name}.data.${i}.label`)}
                />
                <div className="my-4">
                    <InfoGetter
                        Elem={MiniResolutionElem}
                        addButtonLabel="Add a new resolution"
                        initData={EleInitData}
                        name={path}
                        label="Year's resolutions"
                        formRegister={form as any}
                    />
                </div>
            </Elem>
        );
    }
);

export default YearResolutionElem;
