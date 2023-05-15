import BasicInfo from "@src/components/main/sections/basicinf";
import { UseFormReturn, useForm } from "react-hook-form";

import EmployElem, {
    InputData as EmployDataType,
    NameType as EmployNameType,
    Name as EmployName,
} from "@src/components/main/sections/Employment";
import LinkElem, {
    InputData as LinkDataType,
    NameType as LinkNameType,
    Name as LinkName,
} from "@src/components/main/sections/links";
import LangElem, {
    InputData as LangDataType,
    NameType as LangNameType,
    Name as LangName,
} from "@src/components/main/sections/languages";
import SkillElem, {
    InputData as SkillDataType,
    NameType as SkillNameType,
    Name as SkillName,
} from "@src/components/main/sections/Skills";
import CourseElem, {
    InputData as CourseDataType,
    NameType as CourseNameType,
    Name as CourseName,
} from "@src/components/main/sections/courses";
import InternShipElem, {
    InputData as InternShipDataType,
    NameType as InternShipNameType,
    Name as InternShipName,
} from "@src/components/main/sections/internships";
import ReferenceElem, {
    InputData as ReferenceDataType,
    NameType as ReferenceNameType,
    Name as ReferenceName,
} from "@src/components/main/sections/reference";
import ExtraActivitesElem, {
    InputData as ExtraActivitesDataType,
    NameType as ExtraActivitesNameType,
    Name as ExtraActivitesName,
} from "@src/components/main/sections/ExtraActivites";
import TeamElem, {
    InputData as TeamDataType,
    NameType as TeamNameType,
    Name as TeamName,
} from "@src/components/main/sections/Team";
import ProjectsElem, {
    InputData as ProjectsDataType,
    NameType as ProjectsNameType,
    Name as ProjectsName,
} from "@src/components/main/sections/Projects";
import Professional from "@src/components/main/sections/professional";
import Hobbies, {
    Name as HobbiesName,
} from "@src/components/main/sections/hobbies";
import CustomSection from "@src/components/main/sections/CustomSection";
import { Name as CustomName } from "@src/components/main/sections/CustomSection/types";
import InfoGetter from "@src/components/main/sections/InsertCommonData/index";
import React, { Dispatch, useReducer, useState } from "react";
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
import { useDispatch } from "react-redux";
import { ActionType, StateActions } from "@src/store/state";
import { useAppSelector } from "@src/store";
import { FormAction } from "@src/store/form";
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
        <div
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
                fontSize={"2.25rem"}
            />
            <span
                className={classNames(" font-medium text-xl", {
                    "group-hover:text-blue-50": hiddenState,
                    "text-neutral-100": !hiddenState,
                })}
            >
                {label}
            </span>
        </div>
    );
}
export function AddSection({}: {}) {
    const dispatch = useDispatch();
    function dispatchSection(val: ActionType) {
        dispatch(StateActions.setSectionState(val));
    }
    const data = useAppSelector((state) => state.state.data.sections);
    return (
        <div className="py-5">
            <h1 className="text-xl font-bold text-neutral-100 py-3">
                Add Section
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
                <div
                    className={classNames(
                        "flex items-center group gap-3 select-none cursor-pointer"
                    )}
                    onClick={() => {
                        dispatch(FormAction.addSection());
                    }}
                >
                    <FontAwesomeIcon
                        className={classNames("text-4xl text-blue-50")}
                        icon={faToolbox}
                        fontSize={"2.25rem"}
                    />
                    <span
                        className={classNames(
                            " font-medium text-xl text-neutral-100"
                        )}
                    >
                        Custom Section
                    </span>
                </div>
                <Item
                    label="Extra-curricular Activities"
                    hiddenState={data[ExtraActivitesName].hiddenState}
                    icon={faPlateWheat}
                    setData={() => {
                        dispatchSection({
                            name: ExtraActivitesName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="Hobbies"
                    hiddenState={data[HobbiesName].hiddenState}
                    icon={faFootball}
                    setData={() => {
                        dispatchSection({
                            name: HobbiesName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="References"
                    hiddenState={data[ReferenceName].hiddenState}
                    icon={faBullhorn}
                    setData={() => {
                        dispatchSection({
                            name: ReferenceName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="Courses"
                    hiddenState={data[CourseName].hiddenState}
                    icon={faBook}
                    setData={() => {
                        dispatchSection({
                            name: CourseName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="InternShips"
                    hiddenState={data[InternShipName].hiddenState}
                    icon={faBriefcase}
                    setData={() => {
                        dispatchSection({
                            name: InternShipName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="Languages"
                    hiddenState={data[LangName].hiddenState}
                    icon={faLanguage}
                    setData={() => {
                        dispatchSection({
                            name: LangName,
                            type: "SHOW",
                        });
                    }}
                />
            </div>
        </div>
    );
}
