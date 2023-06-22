import BasicInfo from "./sections/basicinf";
import { UseFormReturn, useForm } from "react-hook-form";

import EmployElem, {
    InputData as EmployDataType,
    NameType as EmployNameType,
    Name as EmployName,
} from "./sections/Employment";
import EducElem, {
    InputData as EducDataType,
    NameType as EducNameType,
    Name as EducName,
    InitData as EducInitData,
} from "./sections/education";
import LinkElem, {
    InputData as LinkDataType,
    NameType as LinkNameType,
    Name as LinkName,
} from "./sections/links";
import LangElem, {
    InputData as LangDataType,
    NameType as LangNameType,
    Name as LangName,
} from "./sections/languages";
import SkillElem, {
    Name as SkillName,
    InitData as SkillInitData,
} from "./sections/Skills";
import CourseElem, {
    InputData as CourseDataType,
    NameType as CourseNameType,
    Name as CourseName,
} from "./sections/courses";
import InternShipElem, {
    InputData as InternShipDataType,
    NameType as InternShipNameType,
    Name as InternShipName,
} from "./sections/internships";
import ReferenceElem, {
    InputData as ReferenceDataType,
    NameType as ReferenceNameType,
    Name as ReferenceName,
} from "./sections/reference";
import ExtraActivitesElem, {
    InputData as ExtraActivitesDataType,
    NameType as ExtraActivitesNameType,
    Name as ExtraActivitesName,
} from "./sections/ExtraActivites";
import TeamElem, {
    InputData as TeamDataType,
    NameType as TeamNameType,
    Name as TeamName,
} from "./sections/Team";
import ProjectsElem, {
    InputData as ProjectsDataType,
    NameType as ProjectsNameType,
    Name as ProjectsName,
    InitData as ProjectInitData,
} from "./sections/Projects";
import ImagesElem, {
    InputData as ImagesDataType,
    NameType as ImagesNameType,
    Name as ImagesName,
    InitData as ImageInitData,
} from "./sections/photos";
import TestimonialsElem, {
    InputData as TestimonialsDataType,
    NameType as TestimonialsNameType,
    Name as TestimonialsName,
    InitData as TestimonialsInitData,
} from "./sections/tesimonial";
import Professional from "./sections/professional";
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

export default function Main({ values }: { values?: Data }) {
    const dispatch = useDispatch();
    const form = useForm<Data>({
        defaultValues: values || defaultData,
    });
    form.resetField = (path) => {
        form.setValue(path, loadash.get(defaultData, path));
    };
    const State = useAppSelector((state) => state.state);
    const res = form.watch();
    function dispatchSection(val: ActionType) {
        dispatch(StateActions.setSectionState(val));
    }
    useEffect(() => {
        dispatch(FormAction.setData(copyObject(res)));
    });

    const sectionHiddenState = State.data.sections;
    return (
        <main className="flex flex-col items-stretch">
            <BasicInfo {...(form as any)} />
            <InfoGetter
                formRegister={
                    form as unknown as UseFormReturn<
                        GeneratorData<ImagesDataType, ImagesNameType>
                    >
                }
                addButtonLabel="Add one more Picture group"
                name={ImagesName}
                initData={ImageInitData}
                Elem={ImagesElem}
                desc="Show your relevant Images (last 10 years)"
            />
            <Professional {...(form as any)} />
            <InfoGetter
                formRegister={
                    form as unknown as UseFormReturn<
                        GeneratorData<EmployDataType, EmployNameType>
                    >
                }
                addButtonLabel="Add Employment"
                name={EmployName}
                initData={{
                    jobTitle: "",
                    employer: "",
                    date: {
                        start: "",
                        end: "",
                    },
                    city: "",
                    desc: "",
                    teamSize: 0,
                    technologies: [],
                }}
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
                Elem={ProjectsElem}
                initData={ProjectInitData}
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
                initData={{
                    avatar: "",
                    email: "",
                    links: [],
                    name: "",
                    desc: "",
                    jobTitle: "",
                }}
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
                    initData={{
                        label: "",
                        link: "",
                    }}
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
                    initData={{
                        language: "",
                        level: "",
                    }}
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
                    initData={{
                        label: "",
                        date: {
                            start: "",
                            end: "",
                        },
                        desc: "",
                        institution: "",
                        images: [],
                    }}
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
                    initData={{
                        jobTitle: "",
                        employer: "",
                        date: {
                            start: "",
                            end: "",
                        },
                        city: "",
                        desc: "",
                    }}
                    Elem={InternShipElem}
                />
            </Container>
            <Container
                hiddenState={sectionHiddenState[ExtraActivitesName].hiddenState}
                order={sectionHiddenState[ExtraActivitesName].order}
            >
                <InfoGetter
                    setDelete={() =>
                        dispatchSection({
                            name: ExtraActivitesName,
                            type: "HIDE",
                        })
                    }
                    formRegister={
                        form as unknown as UseFormReturn<
                            GeneratorData<
                                ExtraActivitesDataType,
                                ExtraActivitesNameType
                            >
                        >
                    }
                    addButtonLabel="Add one more activity"
                    name={ExtraActivitesName}
                    initData={{
                        title: "",
                        employer: "",
                        date: {
                            start: "",
                            end: "",
                        },
                        city: "",
                        desc: "",
                    }}
                    Elem={ExtraActivitesElem}
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
                    initData={{
                        company: "",
                        email: "",
                        name: "",
                        phone: "",
                    }}
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
