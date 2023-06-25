import React, { useMemo } from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { Control, UseFormReturn, useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import { ListItem as LinkListItem, InitData as LinkInitData } from "../links";
import {
    ListElem as TeamListItem,
    InputData as TeamInputData,
    InitData as TeamInitData,
} from "./team";
import {
    ListItem as ImageListItem,
    InputData as ImageInputData,
    InitData as ImageInitData,
} from "./images";
import {
    ListItem as LessonListItem,
    InputData as LessonInputData,
    InitData as LessonInitData,
} from "./lessons";
import InfoGetter, {
    ListElemType,
} from "@src/components/main/sections/InsertCommonData/input";
import DatePicker from "@src/components/common/inputs/datePicker";
import { LabelElem } from "@src/components/common/inputs/styles";
import RangeInput from "@src/components/common/inputs/rangeInput";
import MultiSelectInput from "@src/components/common/inputs/multiSelect";
import data from "@src/components/main/sections/Skills/data.json";
const Technologies = data.programming_technologies.map((value) => ({
    value,
    label: value,
}));
export type EleNameType = string;
export type NameType = "projects";
export const Name: NameType = "projects";
export interface EleInputData {
    id: string;
    name: string;
    kind: string;
    progress: number;
    date: {
        start: string;
        end: string;
    };
    links: {
        label: string;
        link: string;
    }[];
    teamSize: number;
    images: ImageInputData[];
    team: TeamInputData[];
    desc: string;
    budget: {
        num: number;
        unit: string;
    };
    lessons: LessonInputData[];
    technologies: (string | number)[];
}
export const EleInitData: () => EleInputData = () => ({
    id: uuid(),
    links: [],
    name: "",
    desc: "<p></p>\n",
    kind: "",
    date: {
        start: "",
        end: "",
    },
    team: [],
    images: [],
    progress: 20,
    technologies: [],
    teamSize: 1,
    budget: {
        num: 0,
        unit: "",
    },
    lessons: [],
});

type LinkPathType = `${EleNameType}.${number}.links`;
type TeamMemberPathType = `${EleNameType}.${number}.team`;
type ImagesPathType = `${EleNameType}.${number}.images`;
type LessonPathType = `${EleNameType}.${number}.lessons`;
import lodash from "lodash";
import BudgetInput from "./budget";
import { uuid } from "@src/utils";
function ConvValToOptions(vals?: string[]) {
    if (!vals) return [];
    return vals.reduce((acc, str) => {
        const res = Technologies.find((val) => {
            return val.value == str;
        });
        if (!res) return acc;
        return [...acc, res];
    }, [] as { value: string; label: string }[]) as any;
}
function KindsInput({
    EleName,
    form,
    i,
}: {
    EleName: string;
    form: UseFormReturn<ListData<EleInputData, string>>;
    i: number;
}) {
    const { register, control, setValue } = form;
    const allData: EleInputData[] = useWatch({
        name: `${EleName}`,
        control,
    });
    const kinds = allData
        .map((val) => val.kind)
        .filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

    return (
        <NormalInput
            label="Kind"
            options={kinds}
            setValue={(val) => setValue(`${EleName}.${i}.kind`, val)}
            {...register(`${EleName}.${i}.kind`)}
        />
    );
}
const MiniProjectElem = React.forwardRef(
    ({ index: i, props: { form, name: EleName }, ...props }, ref) => {
        const { register, control } = form;

        const LinkPath: LinkPathType = `${EleName}.${i}.links`;
        const TeamPath: TeamMemberPathType = `${EleName}.${i}.team`;
        const ImagePath: ImagesPathType = `${EleName}.${i}.images`;
        const LessonPath: LessonPathType = `${EleName}.${i}.lessons`;
        return (
            <Elem
                headLabel={function Title() {
                    const { name, kind: jobTitle } = useWatch({
                        name: `${EleName}.${i}`,
                        control,
                    });
                    return (
                        <div className="font-bold group-hover:text-blue-60">
                            <p className="font-bold group-hover:text-blue-60">
                                {name || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">
                                {jobTitle}
                            </p>
                        </div>
                    );
                }}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="Project Name"
                        {...register(`${EleName}.${i}.name`)}
                    />
                    <KindsInput
                        form={form}
                        EleName={EleName}
                        i={i}
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
                    <LabelElem label="Progress">
                        <div>
                            <RangeInput
                                {...register(`${EleName}.${i}.progress`, {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                    </LabelElem>
                    <NormalInput
                        label="Team Size"
                        {...register(`${EleName}.${i}.teamSize`, {
                            valueAsNumber: true,
                        })}
                    />
                    <BudgetInput
                        label="Project Budget"
                        price={{
                            ...register(`${EleName}.${i}.budget.num`, {
                                valueAsNumber: true,
                            }),
                        }}
                        unit={{
                            ...register(`${EleName}.${i}.budget.unit`),
                            control: control,
                        }}
                    />
                </Grid2Container>
                <div className="flex flex-col items-stretch gap-4 my-4">
                    <LabelElem label={"Technologies"}>
                        <MultiSelectInput
                            options={Technologies}
                            name={`${EleName}.${i}.technologies`}
                            control={control}
                        />
                    </LabelElem>

                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more Link"
                        Elem={LinkListItem}
                        initData={LinkInitData}
                        name={LinkPath}
                        label={"Links"}
                    />
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more mate"
                        Elem={TeamListItem as any}
                        initData={TeamInitData}
                        name={TeamPath}
                        label={"Team Mates"}
                    />
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more image"
                        Elem={ImageListItem}
                        initData={ImageInitData}
                        name={ImagePath}
                        label={"Images"}
                    />
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more lesson"
                        Elem={LessonListItem}
                        initData={LessonInitData}
                        name={LessonPath}
                        label={"Lessons"}
                    />

                    <LabelElem label={"Description"}>
                        <FinalEditor
                            control={control}
                            {...register(`${EleName}.${i}.desc`)}
                            placeholder="Description about team mate and his role"
                        />
                    </LabelElem>
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
const ProjectElem: ElemType<InputData> = React.forwardRef(
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
                    label="Project Name"
                    {...register(`${Name}.data.${i}.label`)}
                />
                <div className="my-4">
                    <InfoGetter
                        Elem={MiniProjectElem}
                        addButtonLabel="Add project"
                        initData={EleInitData}
                        name={path}
                        label="Projects"
                        formRegister={form as any}
                    />
                </div>
            </Elem>
        );
    }
);
export default ProjectElem;
