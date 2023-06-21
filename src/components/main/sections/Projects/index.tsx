import React, { useMemo } from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import { CreateListItem as CreateLinkListItem } from "../links";
import {
    CreateListItem as CreateTeamItem,
    InputData as TeamInputData,
} from "./team";
import {
    CreateListItem as CreateImageItem,
    InputData as ImageInputData,
} from "./images";
import {
    CreateListItem as CreateLessonItem,
    InputData as LessonInputData,
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
export const EleInitData: EleInputData = {
    links: [],
    name: "",
    desc: "",
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
};
type LinkPathType = `${EleNameType}.${number}.links`;
type TeamMemberPathType = `${EleNameType}.${number}.team`;
type ImagesPathType = `${EleNameType}.${number}.images`;
type LessonPathType = `${EleNameType}.${number}.lessons`;
import lodash from "lodash";
import BudgetInput from "./budget";
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
const CreateListItem = function (EleName: EleNameType) {
    return React.forwardRef(({ index: i, props: { form }, ...props }, ref) => {
        const { register, control, setValue } = form;
        const { name, kind: jobTitle } = useWatch({
            name: `${EleName}.${i}`,
            control,
        });
        const allData: EleInputData[] = useWatch({
            name: `${EleName}`,
            control,
        });
        const kinds = allData
            .map((val) => val.kind)
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        const LinkPath: LinkPathType = `${EleName}.${i}.links`;
        const TeamPath: TeamMemberPathType = `${EleName}.${i}.team`;
        const ImagePath: ImagesPathType = `${EleName}.${i}.images`;
        const LessonPath: LessonPathType = `${EleName}.${i}.lessons`;
        const LinkEle = useMemo(() => CreateLinkListItem(LinkPath), [i]);
        const TeamItem = useMemo(() => CreateTeamItem(TeamPath), [i]);
        const ImageInputItem = useMemo(() => CreateImageItem(ImagePath), [i]);
        const LessonItem = useMemo(() => CreateLessonItem(LessonPath), [i]);
        return (
            <Elem
                headLabel={() => (
                    <div className="font-bold group-hover:text-blue-60">
                        <p className="font-bold group-hover:text-blue-60">
                            {name || "(Not Specified)"}
                        </p>
                        <p className="text-sm text-neutral-50">{jobTitle}</p>
                    </div>
                )}
                {...props}
                ref={ref}
            >
                <Grid2Container>
                    <NormalInput
                        label="Project Name"
                        {...register(`${EleName}.${i}.name`)}
                    />
                    <NormalInput
                        label="Kind"
                        options={kinds}
                        {...register(`${EleName}.${i}.kind`)}
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
                        control={control as any}
                        labelEnd="Currently Work here."
                    />
                    <LabelElem label="Progress">
                        <div>
                            <RangeInput
                                {...register(`${EleName}.${i}.progress`, {
                                    valueAsNumber: true,
                                })}
                                defaultValue={
                                    lodash.get(
                                        control._defaultValues,
                                        `${EleName}.${i}.progress`
                                    ) as any
                                }
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
                            control: control as any,
                        }}
                    />
                </Grid2Container>
                <div className="flex flex-col items-stretch gap-4 my-4">
                    <LabelElem label={"Technologies"}>
                        <MultiSelectInput
                            options={Technologies}
                            defaultValue={ConvValToOptions(
                                lodash.get(
                                    control._defaultValues.projects,
                                    `${EleName}.${i}.technologies`
                                )
                            )}
                            name={`${EleName}.${i}.technologies`}
                            control={control as any}
                        />
                    </LabelElem>

                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more Link"
                        Elem={LinkEle}
                        initData={{ label: "", link: "" }}
                        name={LinkPath}
                        label={"Links"}
                    />
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more mate"
                        Elem={TeamItem as any}
                        initData={{ role: "" }}
                        name={TeamPath}
                        label={"Team Mates"}
                    />
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more image"
                        Elem={ImageInputItem}
                        initData={{
                            heightRation: 1,
                            widthRation: 1,
                            image: "",
                        }}
                        name={ImagePath}
                        label={"Images"}
                    />
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more lesson"
                        Elem={LessonItem}
                        initData={{
                            title: "",
                            desc: "",
                        }}
                        name={LessonPath}
                        label={"Lessons"}
                    />
                
                    <LabelElem label={"Description"}>
                        <FinalEditor
                            control={control as any}
                            defaultValue={
                                lodash.get(
                                    control._defaultValues,
                                    `${EleName}.${i}.desc`
                                ) as unknown as string
                            }
                            {...register(`${EleName}.${i}.desc`)}
                            placeholder="Description about team mate and his role"
                        />
                    </LabelElem>
                </div>
            </Elem>
        );
    }) as ListElemType<EleInputData>;
};

export interface InputData {
    label: string;
    data: EleInputData[];
}
export const InitData: InputData = {
    label: "",
    data: [],
};
type PathType = `${NameType}.data.${number}.data`;
const ProjectElem: ElemType<InputData> = React.forwardRef( 
    ({ index: i, props: { form }, ...props }, ref) => {
        const { control, register } = form;
        const { label } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        const path: PathType = `${Name}.data.${i}.data`;
        const ProjectElem = useMemo(() => CreateListItem(path), [i]);
        return (
            <Elem
                headLabel={() => (
                    <div className="font-bold group-hover:text-blue-60">
                        <p className="font-bold group-hover:text-blue-60">
                            {label || "(Not Specified)"}
                        </p>
                    </div>
                )}
                {...props}
                ref={ref}
            >
                <NormalInput
                    label="Project Name"
                    {...register(`${Name}.data.${i}.label`)}
                />
                <div className="my-4">
                    <InfoGetter
                        Elem={ProjectElem}
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
