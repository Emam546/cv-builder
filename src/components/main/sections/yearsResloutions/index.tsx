import React from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useController, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import InfoGetter, {
    ListElemType,
} from "@src/components/main/sections/InsertCommonData/input";
import { WrapElem } from "@src/components/common/inputs/styles";
import RangeInput from "@src/components/common/inputs/rangeInput";
import { uuid } from "@src/utils";
import { ExtendedDatePicker } from "./datePicker";
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
        start: new Date().toString(),
        end: new Date(Date.now() + 30 * 24 * 60 * 60).toString(),
    },
    progress: 20,
});

const MiniResolutionElem = React.forwardRef(
    ({ index: i, props: { form, name: EleName }, ...props }, ref) => {
        const { register, control } = form;
        const { field: fieldStart } = useController({
            control,
            name: `${EleName}.${i}.date.start`,
        });
        const { field: fieldEnd } = useController({
            control,
            name: `${EleName}.${i}.date.end`,
        });
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
                    <ExtendedDatePicker
                        label="Start &End Time"
                        startData={{
                            value: new Date(fieldStart.value),
                            onChange(val) {
                                if (!val) return;
                                fieldStart.onChange(val.toString());
                            },
                        }}
                        endData={{
                            value: new Date(fieldEnd.value),
                            onChange(val) {
                                if (!val) return;
                                fieldEnd.onChange(val.toString());
                            },
                        }}
                        control={control}
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
