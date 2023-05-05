import Head from "next/head";
import BasicInfo, {
    InputData as BasicInputData,
} from "@src/components/main/basicinf";
import { UseFormReturn, useForm } from "react-hook-form";

import EmployElem, {
    InputData as EmployDataType,
    NameType as EmployNameType,
    Name as EmployName,
} from "@src/components/main/Employment";
import LinkElem, {
    InputData as LinkDataType,
    NameType as LinkNameType,
    Name as LinkName,
} from "@src/components/main/links";
import LangElem, {
    InputData as LangDataType,
    NameType as LangNameType,
    Name as LangName,
} from "@src/components/main/languages";
import SkillElem, {
    InputData as SkillDataType,
    NameType as SkillNameType,
    Name as SkillName,
} from "@src/components/main/Skills";
import CourseElem, {
    InputData as CourseDataType,
    NameType as CourseNameType,
    Name as CourseName,
} from "@src/components/main/courses";
import InternShipElem, {
    InputData as InternShipDataType,
    NameType as InternShipNameType,
    Name as InternShipName,
} from "@src/components/main/internships";
import ReferenceElem, {
    InputData as ReferenceDataType,
    NameType as ReferenceNameType,
    Name as ReferenceName,
} from "@src/components/main/reference";
import ExtraActivitesElem, {
    InputData as ExtraActivitesDataType,
    NameType as ExtraActivitesNameType,
    Name as ExtraActivitesName,
} from "@src/components/main/ExtraActivites";
import TeamElem, {
    InputData as TeamDataType,
    NameType as TeamNameType,
    Name as TeamName,
} from "@src/components/main/Team";
import ProjectsElem, {
    InputData as ProjectsDataType,
    NameType as ProjectsNameType,
    Name as ProjectsName,
} from "@src/components/main/Projects";
import Professional, {
    InputData as ProInputData,
} from "@src/components/main/professional";
import Hobbies, {
    InputData as HobbiesData,
    Name as HobbiesName,
} from "@src/components/main/hobbies";
import CustomSection, {
    InputData as CustomInputData,
    Name as CustomName,
    NameType as CustomNameType,
} from "@src/components/main/CustomSection";
import InfoGetter from "@src/components/common/InsertCommonData/index";
import { GeneratorData } from "@src/components/common/InsertCommonData/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faBriefcase,
    faBullhorn,
    faFootball,
    faLanguage,
    faPlateWheat,
    faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Container from "@src/components/common/container";

export type Data = BasicInputData &
    ProInputData &
    HobbiesData &
    GeneratorData<EmployDataType, EmployNameType> &
    GeneratorData<LinkDataType, LinkNameType> &
    GeneratorData<LangDataType, LangNameType> &
    GeneratorData<SkillDataType, SkillNameType> &
    GeneratorData<InternShipDataType, InternShipNameType> &
    GeneratorData<CourseDataType, CourseNameType> &
    GeneratorData<ExtraActivitesDataType, ExtraActivitesNameType> &
    GeneratorData<TeamDataType, TeamNameType> &
    GeneratorData<ProjectsDataType, ProjectsNameType> &
    GeneratorData<ReferenceDataType, ReferenceNameType> &
    CustomInputData;
export type SectionsEnabled = {
    [k in keyof Data]?: boolean;
};
function Item({
    icon,
    label,
    hiddenState,
    setData,
}: {
    label: string;
    hiddenState?: boolean;
    setData: Dispatch<void>;
    icon: IconProp;
}) {
    return (
        <li
            className={classNames("flex items-center group gap-3 select-none", {
                "cursor-pointer": hiddenState,
            })}
            onClick={() => {
                if (hiddenState) setData();
            }}
        >
            <FontAwesomeIcon
                className={classNames("text-4xl ", {
                    "text-blue-50": !hiddenState,
                    "text-neutral-50": hiddenState,
                })}
                icon={icon}
            />
            <span
                className={classNames(" font-medium text-xl", {
                    "group-hover:text-blue-50": hiddenState,
                    "text-neutral-100": !hiddenState,
                })}
            >
                {label}
            </span>
        </li>
    );
}
export function AddSection({
    data,
    setData,
    addSection,
}: {
    addSection: () => void;
    data: SectionsEnabled;
    setData: Dispatch<SetStateAction<SectionsEnabled>>;
}) {
    return (
        <div className="py-5">
            <h1 className="text-xl font-bold text-neutral-100 py-3">
                Add Section
            </h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
                <li
                    className={classNames(
                        "flex items-center group gap-3 select-none cursor-pointer"
                    )}
                    onClick={() => {
                        addSection();
                    }}
                >
                    <FontAwesomeIcon
                        className={classNames("text-4xl text-blue-50")}
                        icon={faToolbox}
                    />
                    <span
                        className={classNames(
                            " font-medium text-xl text-neutral-100"
                        )}
                    >
                        Custom Section
                    </span>
                </li>
                <Item
                    label="Extra-curricular Activities"
                    hiddenState={data[ExtraActivitesName]}
                    icon={faPlateWheat}
                    setData={() => {
                        setData((pre) => ({
                            ...pre,
                            [ExtraActivitesName]: false,
                        }));
                    }}
                />
                <Item
                    label="Hobbies"
                    hiddenState={data[HobbiesName]}
                    icon={faFootball}
                    setData={() => {
                        setData((pre) => ({
                            ...pre,
                            [HobbiesName]: false,
                        }));
                    }}
                />
                <Item
                    label="References"
                    hiddenState={data[ReferenceName]}
                    icon={faBullhorn}
                    setData={() => {
                        setData((pre) => ({
                            ...pre,
                            [ReferenceName]: false,
                        }));
                    }}
                />
                <Item
                    label="Courses"
                    hiddenState={data[CourseName]}
                    icon={faBook}
                    setData={() => {
                        setData((pre) => ({
                            ...pre,
                            [CourseName]: false,
                        }));
                    }}
                />
                <Item
                    label="InternShips"
                    hiddenState={data[InternShipName]}
                    icon={faBriefcase}
                    setData={() => {
                        setData((pre) => ({
                            ...pre,
                            [InternShipName]: false,
                        }));
                    }}
                />
                <Item
                    label="Languages"
                    hiddenState={data[LangName]}
                    icon={faLanguage}
                    setData={() => {
                        setData((pre) => ({
                            ...pre,
                            [LangName]: false,
                        }));
                    }}
                />
            </ul>
        </div>
    );
}

export default function Home() {
    const form = useForm<Data>({
        defaultValues: {
            info: {
                head: "Personal Details",
            },
            professional: {
                head: "Profession Details",
            },
            [EmployName]: {
                head: "Employment History",
            },
            [LinkName]: {
                head: "Websites & Social Links",
            },
            [LangName]: {
                head: "Languages",
            },
            [SkillName]: {
                head: "Skills",
            },
            [CourseName]: {
                head: "Courses",
            },
            [InternShipName]: {
                head: "InternShip",
            },
            [HobbiesName]: {
                head: "Hobbies",
            },
            [ReferenceName]: {
                head: "References",
            },
            [ExtraActivitesName]: {
                head: "Extra Activities",
            },
            [TeamName]: {
                head: "Team Members",
            },
            [ProjectsName]: {
                head: "Projects",
            },
        },
    });
    const [sectionHiddenState, setSectionHiddenState] =
        useState<SectionsEnabled>({
            [LangName]: false,
            [CourseName]: true,
            [InternShipName]: true,
            [HobbiesName]: true,
            [ExtraActivitesName]: true,
        });
    let [curOrder, setCurOrder] = useState(0);
    const [CustomSectionNum, setCustomSectionNum] = useState(0);
    useEffect(() => {
        setCurOrder(curOrder + 1);
    }, [sectionHiddenState, CustomSectionNum]);
    return (
        <>
            <Head>
                <title>Make your Resume api</title>
            </Head>
            <div className="container relative px-4 mx-auto">
                <div className="px-1">
                    <main className="flex flex-col items-stretch">
                        <BasicInfo {...(form as any)} />
                        <Professional {...(form as any)} />
                        <InfoGetter
                            formRegister={
                                form as unknown as UseFormReturn<
                                    GeneratorData<
                                        EmployDataType,
                                        EmployNameType
                                    >
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
                            }}
                            Elem={EmployElem}
                            desc="Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/fact (Achieved X, measured by Y, by doing Z)."
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
                        <InfoGetter
                            formRegister={
                                form as unknown as UseFormReturn<
                                    GeneratorData<
                                        ProjectsDataType,
                                        ProjectsNameType
                                    >
                                >
                            }
                            addButtonLabel="Add one more Project"
                            name={ProjectsName}
                            initData={{
                                email: "",
                                links: [],
                                name: "",
                                desc: "",
                                kind: "",
                                date: {
                                    start: "",
                                    end: "",
                                },
                                team: [],
                                images:[],
                                progress: 20,
                            }}
                            Elem={ProjectsElem}
                            desc="Show your relevant Projects"
                        />

                        <InfoGetter
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
                        <Container
                            hiddenState={sectionHiddenState[LangName]}
                            order={curOrder++}
                        >
                            <InfoGetter
                                setDelete={() =>
                                    setSectionHiddenState({
                                        ...sectionHiddenState,
                                        [LangName]: true,
                                    })
                                }
                                formRegister={
                                    form as unknown as UseFormReturn<
                                        GeneratorData<
                                            LangDataType,
                                            LangNameType
                                        >
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

                        <InfoGetter
                            formRegister={
                                form as unknown as UseFormReturn<
                                    GeneratorData<SkillDataType, SkillNameType>
                                >
                            }
                            addButtonLabel="Add one more skill"
                            name={SkillName}
                            initData={{
                                label: "",
                                level: "",
                            }}
                            Elem={SkillElem}
                            desc="Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing (especially when applying via an online system)."
                        />

                        <Container
                            hiddenState={sectionHiddenState[CourseName]}
                            order={curOrder++}
                        >
                            <InfoGetter
                                setDelete={() =>
                                    setSectionHiddenState({
                                        ...sectionHiddenState,
                                        [CourseName]: true,
                                    })
                                }
                                formRegister={
                                    form as unknown as UseFormReturn<
                                        GeneratorData<
                                            CourseDataType,
                                            CourseNameType
                                        >
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
                                }}
                                Elem={CourseElem}
                            />
                        </Container>
                        <Container
                            hiddenState={sectionHiddenState[InternShipName]}
                            order={curOrder++}
                        >
                            <InfoGetter
                                setDelete={() =>
                                    setSectionHiddenState({
                                        ...sectionHiddenState,
                                        [InternShipName]: true,
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
                            hiddenState={sectionHiddenState[ExtraActivitesName]}
                            order={curOrder++}
                        >
                            <InfoGetter
                                setDelete={() =>
                                    setSectionHiddenState({
                                        ...sectionHiddenState,
                                        [ExtraActivitesName]: true,
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
                            hiddenState={sectionHiddenState[HobbiesName]}
                            order={curOrder++}
                        >
                            <Hobbies
                                form={form as any}
                                setDelete={() => {
                                    setSectionHiddenState({
                                        ...sectionHiddenState,
                                        [HobbiesName]: true,
                                    });
                                }}
                            />
                        </Container>
                        <Container
                            hiddenState={sectionHiddenState[ReferenceName]}
                            order={curOrder++}
                        >
                            <InfoGetter
                                setDelete={() =>
                                    setSectionHiddenState({
                                        ...sectionHiddenState,
                                        [ReferenceName]: true,
                                    })
                                }
                                formRegister={
                                    form as unknown as UseFormReturn<
                                        GeneratorData<
                                            ReferenceDataType,
                                            ReferenceNameType
                                        >
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
                            order={curOrder}
                            sectionNum={CustomSectionNum}
                        />
                    </main>
                    <AddSection
                        data={sectionHiddenState}
                        setData={setSectionHiddenState}
                        addSection={() => {
                            setCustomSectionNum(CustomSectionNum + 1);
                        }}
                    />
                </div>
            </div>
        </>
    );
}
