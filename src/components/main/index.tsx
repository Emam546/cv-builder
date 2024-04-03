import BasicInfo from "./sections/basicinf";
import { UseFormReturn, useForm, useWatch } from "react-hook-form";

import EmployElem, {
    InputData as EmployDataType,
    NameType as EmployNameType,
    Name as EmployName,
    IniData as EmployInitData,
} from "./sections/Employment";
import EducElem, {
    InputData as EducDataType,
    NameType as EducNameType,
    Name as EducName,
    InitData as EducInitData,
    onDelete as EducOnDelete,
} from "./sections/education";
import LinkElem, {
    InputData as LinkDataType,
    NameType as LinkNameType,
    Name as LinkName,
    InitData as LinkInitData,
} from "./sections/links";
import LangElem, {
    InputData as LangDataType,
    NameType as LangNameType,
    Name as LangName,
    InitData as LangInitData,
} from "./sections/languages";
import SkillElem, {
    Name as SkillName,
    InitData as SkillInitData,
} from "./sections/Skills";
import CourseElem, {
    InputData as CourseDataType,
    NameType as CourseNameType,
    Name as CourseName,
    InitData as CourseInitData,
    onDelete as CourseOnDelete,
} from "./sections/courses";
import InternShipElem, {
    InputData as InternShipDataType,
    NameType as InternShipNameType,
    Name as InternShipName,
    InitData as InternInitData,
    onDelete as InternOnDelete,
} from "./sections/internships";
import ReferenceElem, {
    InputData as ReferenceDataType,
    NameType as ReferenceNameType,
    Name as ReferenceName,
    InitData as ReferenceInitData,
} from "./sections/reference";
import ExtraActivitiesElem, {
    InputData as ExtraActivitiesDataType,
    NameType as ExtraActivitiesNameType,
    Name as ExtraActivitiesName,
    InitData as ExtraActivitiesInitData,
} from "./sections/ExtraActivites";
import TeamElem, {
    InputData as TeamDataType,
    NameType as TeamNameType,
    Name as TeamName,
    InitData as TeamInitData,
    onDelete as TeamOnDelete,
} from "./sections/Team";
import ProjectsElem, {
    InputData as ProjectsDataType,
    NameType as ProjectsNameType,
    Name as ProjectsName,
    InitData as ProjectInitData,
    onDelete as ProjectOnDelete,
    onDuplicate as ProjectOnDuplicate,
} from "./sections/Projects";
import ImageElem, {
    Name as ImagesName,
    InitData as ImageInitData,
    onDelete as ImageOnDelete,
} from "./sections/photos";
import TestimonialsElem, {
    InputData as TestimonialsDataType,
    NameType as TestimonialsNameType,
    Name as TestimonialsName,
    InitData as TestimonialsInitData,
    onDelete as TestimonialsOnDelete,
} from "./sections/tesimonial";
import Professional, {
    InitData as ParagraphInitData,
    Name as ParagraphName,
} from "./sections/paragraphs";
import YearsResolution, {
    InitData as YearsResolutionInitData,
    Name as YearsResolutionName,
    InputData as YearsResolutionDataType,
    NameType as YearsResolutionNameType,
} from "./sections/yearsResloutions";
import Hobbies, { Name as HobbiesName } from "./sections/hobbies";
import CustomSection from "./sections/CustomSection";
import InfoGetter from "@src/components/main/sections/InsertCommonData/index";
import React, { useEffect } from "react";
import Container from "@src/components/common/container";
import { defaultData } from "./default";
import { useDispatch } from "react-redux";
import { FormAction } from "@src/store/form";
import { useAppSelector } from "@src/store";
import { ActionType, StateActions } from "@src/store/state";
import { copyObject } from "@src/utils";
import loadash from "lodash";
import YearResolutionElem from "./sections/yearsResloutions";
function Uploader({
    form,
}: {
    form: UseFormReturn<Data, any>;
    defaultData: Data;
}) {
    const dispatch = useDispatch();

    const res: any = useWatch({ control: form.control });
    useEffect(() => {
        dispatch(FormAction.setData(copyObject(res)));
    });
    return <></>;
}
export default function Main({ values }: { values?: Data }) {
    const dispatch = useDispatch();
    const form = useForm<Data>({
        values: values || defaultData,
    });
    form.resetField = (path) => {
        form.setValue(path, loadash.get(defaultData, path));
    };
    const State = useAppSelector((state) => state.state);

    function dispatchSection(val: ActionType) {
        dispatch(StateActions.setSectionState(val));
    }

    const sectionHiddenState = State.data.sections;
    return (
        <main className="flex flex-col items-stretch">
            <Uploader
                form={form}
                defaultData={defaultData}
            />
            <BasicInfo {...(form as any)} />
            <InfoGetter
                formRegister={form as any}
                addButtonLabel="Add one more Picture group"
                name={ImagesName}
                initData={ImageInitData}
                onDeleteElem={ImageOnDelete}
                Elem={ImageElem}
                desc="Show your relevant Images (last 10 years)"
            />
            <InfoGetter
                formRegister={form as any}
                desc="Write 2-4 short & energetic sentences to interest the reader!
                Mention your role, experience & most importantly - your biggest
                achievements, best qualities and skills."
                name={ParagraphName}
                initData={ParagraphInitData}
                Elem={Professional}
                addButtonLabel="Add more paragraph section"
            />
            <InfoGetter
                formRegister={
                    form as unknown as UseFormReturn<
                        GeneratorData<EmployDataType, EmployNameType>
                    >
                }
                addButtonLabel="Add Employment"
                name={EmployName}
                initData={EmployInitData}
                Elem={EmployElem}
                desc="Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/fact (Achieved X, measured by Y, by doing Z)."
            />
            <InfoGetter
                formRegister={
                    form as unknown as UseFormReturn<
                        GeneratorData<EducDataType, EducNameType>
                    >
                }
                addButtonLabel="Add Education"
                name={EducName}
                initData={EducInitData}
                onDeleteElem={EducOnDelete}
                Elem={EducElem}
                desc="A varied education on your resume sums up the value that your learnings and background will bring to job."
            />
            <InfoGetter
                formRegister={
                    form as unknown as UseFormReturn<
                        GeneratorData<ProjectsDataType, ProjectsNameType>
                    >
                }
                addButtonLabel="Add one more group"
                name={ProjectsName}
                onDeleteElem={ProjectOnDelete}
                Elem={ProjectsElem}
                initData={ProjectInitData}
                onDuplicateElem={ProjectOnDuplicate}
                desc="Show your relevant Projects"
            />
            <InfoGetter
                formRegister={
                    form as unknown as UseFormReturn<
                        GeneratorData<TeamDataType, TeamNameType>
                    >
                }
                addButtonLabel="Add one more teammate"
                name={TeamName}
                onDeleteElem={TeamOnDelete}
                initData={TeamInitData}
                Elem={TeamElem}
                desc="Show your relevant teammates ."
            />

            <Container
                hiddenState={sectionHiddenState[LinkName].hiddenState}
                order={sectionHiddenState[LinkName].order}
            >
                <InfoGetter
                    setDelete={() =>
                        dispatchSection({
                            name: LinkName,
                            type: "HIDE",
                        })
                    }
                    formRegister={
                        form as unknown as UseFormReturn<
                            GeneratorData<LinkDataType, LinkNameType>
                        >
                    }
                    addButtonLabel="Add one more link"
                    name={LinkName}
                    initData={LinkInitData}
                    Elem={LinkElem}
                    desc="You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website"
                />
            </Container>
            <Container
                hiddenState={sectionHiddenState[TestimonialsName].hiddenState}
                order={sectionHiddenState[TestimonialsName].order}
            >
                <InfoGetter
                    setDelete={() =>
                        dispatchSection({
                            name: TestimonialsName,
                            type: "HIDE",
                        })
                    }
                    formRegister={
                        form as unknown as UseFormReturn<
                            GeneratorData<
                                TestimonialsDataType,
                                TestimonialsNameType
                            >
                        >
                    }
                    addButtonLabel="Add one more link"
                    name={TestimonialsName}
                    onDeleteElem={TestimonialsOnDelete}
                    initData={TestimonialsInitData}
                    Elem={TestimonialsElem}
                    desc="Highlight the positive experiences of your clients by collecting their testimonials and ratings. Their valuable feedback will showcase their satisfaction with your services. Use this section to demonstrate the high quality of your work and build trust with potential clients"
                />
            </Container>
            <Container
                hiddenState={sectionHiddenState[LangName].hiddenState}
                order={sectionHiddenState[LangName].order}
            >
                <InfoGetter
                    setDelete={() =>
                        dispatchSection({
                            name: LangName,
                            type: "HIDE",
                        })
                    }
                    formRegister={
                        form as unknown as UseFormReturn<
                            GeneratorData<LangDataType, LangNameType>
                        >
                    }
                    addButtonLabel="Add one more language"
                    name={LangName}
                    initData={LangInitData}
                    Elem={LangElem}
                />
            </Container>
            <Container
                hiddenState={sectionHiddenState[SkillName].hiddenState}
                order={sectionHiddenState[SkillName].order}
            >
                <InfoGetter
                    formRegister={form as any}
                    addButtonLabel="Add one more group"
                    name={SkillName}
                    initData={SkillInitData}
                    Elem={SkillElem}
                    desc="Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing (especially when applying via an online system)."
                />
            </Container>

            <Container
                hiddenState={sectionHiddenState[CourseName].hiddenState}
                order={sectionHiddenState[CourseName].order}
            >
                <InfoGetter
                    setDelete={() =>
                        dispatchSection({
                            name: CourseName,
                            type: "HIDE",
                        })
                    }
                    formRegister={
                        form as unknown as UseFormReturn<
                            GeneratorData<CourseDataType, CourseNameType>
                        >
                    }
                    addButtonLabel="Add one more Course"
                    name={CourseName}
                    initData={CourseInitData}
                    onDeleteElem={CourseOnDelete}
                    Elem={CourseElem}
                />
            </Container>
            <Container
                hiddenState={sectionHiddenState[InternShipName].hiddenState}
                order={sectionHiddenState[InternShipName].order}
            >
                <InfoGetter
                    setDelete={() =>
                        dispatchSection({
                            name: InternShipName,
                            type: "HIDE",
                        })
                    }
                    formRegister={
                        form as unknown as UseFormReturn<
                            GeneratorData<
                                InternShipDataType,
                                InternShipNameType
                            >
                        >
                    }
                    addButtonLabel="Add one more internship"
                    name={InternShipName}
                    initData={InternInitData}
                    Elem={InternShipElem}
                    onDeleteElem={InternOnDelete}
                />
            </Container>
            <Container
                hiddenState={
                    sectionHiddenState[YearsResolutionName].hiddenState
                }
                order={sectionHiddenState[YearsResolutionName].order}
            >
                <InfoGetter
                    setDelete={() =>
                        dispatchSection({
                            name: YearsResolutionName,
                            type: "HIDE",
                        })
                    }
                    formRegister={
                        form as unknown as UseFormReturn<
                            GeneratorData<
                                YearsResolutionDataType,
                                YearsResolutionNameType
                            >
                        >
                    }
                    addButtonLabel="Add one more year's resolution"
                    name={YearsResolutionName}
                    initData={YearsResolutionInitData}
                    Elem={YearResolutionElem}
                />
            </Container>
            <Container
                hiddenState={
                    sectionHiddenState[ExtraActivitiesName].hiddenState
                }
                order={sectionHiddenState[ExtraActivitiesName].order}
            >
                <InfoGetter
                    setDelete={() =>
                        dispatchSection({
                            name: ExtraActivitiesName,
                            type: "HIDE",
                        })
                    }
                    formRegister={
                        form as unknown as UseFormReturn<
                            GeneratorData<
                                ExtraActivitiesDataType,
                                ExtraActivitiesNameType
                            >
                        >
                    }
                    addButtonLabel="Add one more activity"
                    name={ExtraActivitiesName}
                    initData={ExtraActivitiesInitData}
                    Elem={ExtraActivitiesElem}
                />
            </Container>
            <Container
                hiddenState={sectionHiddenState[HobbiesName].hiddenState}
                order={sectionHiddenState[HobbiesName].order}
            >
                <Hobbies
                    form={form as any}
                    setDelete={() => {
                        dispatchSection({
                            name: HobbiesName,
                            type: "HIDE",
                        });
                    }}
                />
            </Container>
            <Container
                hiddenState={sectionHiddenState[ReferenceName].hiddenState}
                order={sectionHiddenState[ReferenceName].order}
            >
                <InfoGetter
                    setDelete={() =>
                        dispatchSection({
                            name: ReferenceName,
                            type: "HIDE",
                        })
                    }
                    formRegister={
                        form as unknown as UseFormReturn<
                            GeneratorData<ReferenceDataType, ReferenceNameType>
                        >
                    }
                    addButtonLabel="Add one more reference"
                    name={ReferenceName}
                    initData={ReferenceInitData}
                    Elem={ReferenceElem}
                />
            </Container>
            <CustomSection
                form={form as any}
                defaultData={State.data.custom}
            />
        </main>
    );
}
