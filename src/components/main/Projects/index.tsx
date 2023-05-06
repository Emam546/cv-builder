/* eslint-disable react/display-name */
import React, { useMemo } from "react";
import { ElemType } from "@src/components/common/InsertCommonData";
import { Elem } from "@src/components/common/InsertCommonData/Elem";
import { FieldsType } from "@src/components/common/InsertCommonData/types";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import UploadButton from "@src/components/common/uploadAvatar";
import { CreateListItem } from "../links";
import {
    CreateListItem as CreateTeamItem,
    InputData as TeamInputData,
} from "./team";
import {
    CreateListItem as CreateImageItem,
    InputData as ImageInputData,
} from "./images";
import InfoGetter from "@src/components/common/InsertCommonData/input";
import DatePicker from "@src/components/common/inputs/datePicker";
import { LabelElem } from "@src/components/common/inputs/styles";
import RangeInput from "@src/components/common/inputs/rangeInput";
import MultiSelectInput from "@src/components/common/inputs/multiSelect";
import data from "@src/components/main/Skills/data.json";
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
    images: ImageInputData[];
    team: TeamInputData[];
    desc: string;
    technologies: (string | number)[];
}
type LinkPathType = `${NameType}.data.${number}.links`;
type TeamMemberPathType = `${NameType}.data.${number}.team`;
type ImagesPathType = `${NameType}.data.${number}.images`;

const ProjectElem: ElemType<InputData, NameType> = React.forwardRef(
    ({ index: i, values, form, ...props }, ref) => {
        const { register, control, setValue } = form;
        const { name, kind: jobTitle } = useWatch({
            name: `${Name}.data.${i}`,
            control,
        });
        const allData = useWatch({ name: `${Name}.data`, control });
        const kinds = allData
            .map((val) => val.kind)
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        const LinkPath: LinkPathType = `${Name}.data.${i}.links`;
        const TeamPath: TeamMemberPathType = `${Name}.data.${i}.team`;
        const ImagePath: ImagesPathType = `${Name}.data.${i}.images`;
        const LinkEle = useMemo(() => CreateListItem(LinkPath), []);
        const TeamItem = useMemo(() => CreateTeamItem(TeamPath), []);
        const ImageInputData = useMemo(() => CreateImageItem(ImagePath), []);
        return (
            <Elem
                headLabel={() => (
                    <p className="font-bold group-hover:text-blue-60">
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {name || "(Not Specified)"}
                            </p>
                            <p className="text-sm text-neutral-50">
                                {jobTitle}
                            </p>
                        </>
                    </p>
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
                            />
                        </div>
                    </LabelElem>
                </Grid2Container>
                <div>
                    <LabelElem label={"Technologies"}>
                        <MultiSelectInput
                            setValue={(val) =>
                                setValue(`${Name}.data.${i}.technologies`, val)
                            }
                            options={Technologies}
                            {...register(`${Name}.data.${i}.technologies`)}
                        />
                    </LabelElem>
                </div>
                <div className="my-4">
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more Link"
                        Elem={LinkEle}
                        initData={{ label: "", link: "" }}
                        name={LinkPath}
                        label={"Links"}
                    />
                </div>
                <div className="my-4">
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more mate"
                        Elem={TeamItem}
                        initData={{ role: "" }}
                        name={TeamPath}
                        label={"Team mates"}
                    />
                </div>
                <div className="my-4">
                    <InfoGetter
                        formRegister={form as any}
                        addButtonLabel="Add one more image"
                        Elem={ImageInputData}
                        initData={{
                            heightRation: 1,
                            widthRation: 1,
                            image: "",
                        }}
                        name={ImagePath}
                        label={"Images"}
                        noDragging
                    />
                </div>

                <LabelElem
                    label={"Description"}
                    className="my-4"
                >
                    <FinalEditor
                        setValue={(val) =>
                            setValue(`${Name}.data.${i}.desc`, val)
                        }
                        {...register(`${Name}.data.${i}.desc`)}
                        placeholder="Description about team mate and his role"
                    />
                </LabelElem>
            </Elem>
        );
    }
);
export default ProjectElem;
