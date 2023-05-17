import React, { useMemo } from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import { CreateListItem } from "../links";
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
import InfoGetter from "@src/components/main/sections/InsertCommonData/input";
import DatePicker from "@src/components/common/inputs/datePicker";
import { LabelElem } from "@src/components/common/inputs/styles";
import RangeInput from "@src/components/common/inputs/rangeInput";
import MultiSelectInput from "@src/components/common/inputs/multiSelect";
import data from "@src/components/main/sections/Skills/data.json";
const Technologies = data.programming_technologies.map((value) => ({
    value,
    label: value,
}));
export type NameType = "projects";
export const Name: NameType = "projects";
export interface InputData extends FieldsType {
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
export const InitData: InputData = {
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
type LinkPathType = `${NameType}.data.${number}.links`;
type TeamMemberPathType = `${NameType}.data.${number}.team`;
type ImagesPathType = `${NameType}.data.${number}.images`;
type LessonPathType = `${NameType}.data.${number}.lessons`;
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
const ProjectElem: ElemType<InputData, NameType> = React.forwardRef(
    ({ index: i, props: { form }, ...props }, ref) => {
        const { register, control, setValue } = form;
        const { name, kind: jobTitle } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        const allData: InputData[] = useWatch({
            name: `${Name}.data`,
            control,
        });
        const kinds = allData
            .map((val) => val.kind)
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        const LinkPath: LinkPathType = `${Name}.data.${i}.links`;
        const TeamPath: TeamMemberPathType = `${Name}.data.${i}.team`;
        const ImagePath: ImagesPathType = `${Name}.data.${i}.images`;
        const LessonPath: LessonPathType = `${Name}.data.${i}.lessons`;
        const LinkEle = useMemo(() => CreateListItem(LinkPath), [i]);
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
                        {...register(`${Name}.data.${i}.name`)}
                    />
                    <NormalInput
                        label="Kind"
                        options={kinds}
                        {...register(`${Name}.data.${i}.kind`)}
                    />
                    <DatePicker
                        applyPresent
                        label="Start &End Time"
                        startData={{
                            ...register(`${Name}.data.${i}.date.start`),
                            placeholder: "MM / YYYY",
                            setValue(val) {
                                setValue(`${Name}.data.${i}.date.start`, val);
                            },
                        }}
                        endData={{
                            ...register(`${Name}.data.${i}.date.end`),
                            placeholder: "MM / YYYY",
                            setValue(val) {
                                setValue(`${Name}.data.${i}.date.end`, val);
                            },
                        }}
                        labelEnd="Currently Work here."
                    />
                    <LabelElem label="Progress">
                        <div>
                            <RangeInput
                                {...register(`${Name}.data.${i}.progress`, {
                                    valueAsNumber: true,
                                })}
                                defaultValue={
                                    control._defaultValues.projects?.data?.[i]
                                        ?.progress
                                }
                            />
                        </div>
                    </LabelElem>
                    <NormalInput
                        label="Team Size"
                        {...register(`${Name}.data.${i}.teamSize`, {
                            valueAsNumber: true,
                        })}
                    />
                    <BudgetInput
                        label="Project Budget"
                        price={{
                            ...register(`${Name}.data.${i}.budget.num`, {
                                valueAsNumber: true,
                            }),
                        }}
                        unit={{
                            ...register(`${Name}.data.${i}.budget.unit`),
                            control: control,
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
                                    `${Name}.data.${i}.technologies`
                                )
                            )}
                            name={`${Name}.data.${i}.technologies`}
                            control={control}
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
                        Elem={TeamItem}
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
                            control={control}
                            defaultValue={
                                form.control._defaultValues[Name]?.data?.[i]
                                    ?.desc
                            }
                            {...register(`${Name}.data.${i}.desc`)}
                            placeholder="Description about team mate and his role"
                        />
                    </LabelElem>
                </div>
            </Elem>
        );
    }
);
export default ProjectElem;
