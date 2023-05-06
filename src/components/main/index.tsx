import BasicInfo from "./basicinf";
import { UseFormReturn, useForm } from "react-hook-form";

import EmployElem, {
    InputData as EmployDataType,
    NameType as EmployNameType,
    Name as EmployName,
} from "./Employment";
import LinkElem, {
    InputData as LinkDataType,
    NameType as LinkNameType,
    Name as LinkName,
} from "./links";
import LangElem, {
    InputData as LangDataType,
    NameType as LangNameType,
    Name as LangName,
} from "./languages";
import SkillElem, {
    InputData as SkillDataType,
    NameType as SkillNameType,
    Name as SkillName,
} from "./Skills";
import CourseElem, {
    InputData as CourseDataType,
    NameType as CourseNameType,
    Name as CourseName,
} from "./courses";
import InternShipElem, {
    InputData as InternShipDataType,
    NameType as InternShipNameType,
    Name as InternShipName,
} from "./internships";
import ReferenceElem, {
    InputData as ReferenceDataType,
    NameType as ReferenceNameType,
    Name as ReferenceName,
} from "./reference";
import ExtraActivitesElem, {
    InputData as ExtraActivitesDataType,
    NameType as ExtraActivitesNameType,
    Name as ExtraActivitesName,
} from "./ExtraActivites";
import TeamElem, {
    InputData as TeamDataType,
    NameType as TeamNameType,
    Name as TeamName,
} from "./Team";
import ProjectsElem, {
    InputData as ProjectsDataType,
    NameType as ProjectsNameType,
    Name as ProjectsName,
} from "./Projects";
import Professional from "./professional";
import Hobbies, {
    InputData as HobbiesData,
    Name as HobbiesName,
} from "./hobbies";
import CustomSection, { Name as CustomName } from "./CustomSection";
import InfoGetter from "@src/components/common/InsertCommonData/index";
import { GeneratorData } from "@src/components/common/InsertCommonData/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import ShowResult from "@src/components/showResult";
import { Data } from "./type";

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

export default function Main({ children }: { children?: React.ReactNode }) {
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
                data: [],
            },
            [LinkName]: {
                head: "Websites & Social Links",
                data: [],
            },
            [LangName]: {
                head: "Languages",
                data: [],
            },
            [SkillName]: {
                head: "Skills",
                data: [],
            },
            [CourseName]: {
                head: "Courses",
                data: [],
            },
            [InternShipName]: {
                head: "InternShip",
                data: [],
            },
            [HobbiesName]: {
                head: "Hobbies",
                data: "",
            },
            [ReferenceName]: {
                head: "References",
                data: [],
            },
            [ExtraActivitesName]: {
                head: "Extra Activities",
                data: [],
            },
            [TeamName]: {
                head: "Team Members",
                data: [],
            },
            [ProjectsName]: {
                head: "Projects",
                data: [],
            },
            [CustomName]: [],
        },
    });
    const [sectionHiddenState, setSectionHiddenState] =
        useState<SectionsEnabled>({
            [LangName]: true,
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
    const res = form.watch();
    const Sections: Record<string, any> = { ...res };
    res[CustomName].map((val) => {
        Sections[val.head] = val;
    });
    delete Sections[CustomName];
    [...Object.entries(sectionHiddenState)].map(([key, val]) => {
        if (val) delete Sections[key];
    });
    useEffect(() => {}, [res]);
    return (
        <div className="container relative px-4 mx-auto">
            <div className="px-1">
                <main className="flex flex-col items-stretch">
                    <BasicInfo {...(form as any)} />
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
                <ShowResult obj={Sections} />
                {children}
                <AddSection
                    data={sectionHiddenState}
                    setData={setSectionHiddenState}
                    addSection={() => {
                        setCustomSectionNum(CustomSectionNum + 1);
                    }}
                />
            </div>
        </div>
    );
}
