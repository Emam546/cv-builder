import React from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput, { OptionsInput } from "@src/components/common/inputs/normal";
import SelectInput, {
    OptionType,
} from "@src/components/common/inputs/selectOption";
import data from "./data.json";
import { uuid } from "@src/utils";
export type NameType = "languages";
export const Name: NameType = "languages";
export interface InputData {
    id: string;
    language: string;
    level: string;
}
export const InitData: () => InputData = () => ({
    id: uuid(),
    language: "",
    level: "",
});
export const DuplicateData: (val: InputData) => InputData = (val) => ({
    ...val,
    id: uuid(),
});
const LANG = data.map(({ name }) => name);
const Options: OptionType[] = [
    { val: "", label: "Select Option" },
    { val: "native speaker", label: "Native Speaker" },
    {
        val: "highly proficient",
        label: "Highly proficient",
    },
    { val: "Very good command", label: "Very good command" },
    { val: "good working knowledge", label: "Good working knowledge" },
    { val: "working knowledge", label: "Working knowledge" },
    { val: "C2", label: "C2" },
    { val: "C1", label: "C1" },
    { val: "B2", label: "B2" },
    { val: "B1", label: "B1" },
    { val: "A2", label: "A2" },
    { val: "A1", label: "A1" },
];
const OptionsMap = new Map(Options.map((val) => [val.val, val]));
const FElem: ElemType<InputData> = React.forwardRef(
    (
        {
            props: {
                index: i,
                form: { register, control, setValue },
            },
            ...props
        },
        ref
    ) => {
        return (
            <Elem
                headLabel={function G() {
                    const { language, level } = useWatch({
                        name: `${Name}.data.${i}`,
                        control,
                    });
                    return (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {language || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">
                                {OptionsMap.get(level)?.label}
                            </p>
                        </>
                    );
                }}
                {...props}
                ref={ref}
            >
                <div className="mb-4">
                    <Grid2Container>
                        <OptionsInput
                            label="Label"
                            control={control as any}
                            options={LANG}
                            {...register(`${Name}.data.${i}.language`)}
                        />
                        <SelectInput
                            control={control}
                            options={Options}
                            label="link"
                            setValue={(val) =>
                                setValue(`${Name}.data.${i}.level`, val)
                            }
                            {...register(`${Name}.data.${i}.level`)}
                            defaultValue={
                                control._defaultValues[Name]?.data?.[i]?.level
                            }
                        />
                    </Grid2Container>
                </div>
            </Elem>
        );
    }
);
export default FElem;
