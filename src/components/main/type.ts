import { GeneratorData } from "../common/InsertCommonData/types";
import EmployElem, {
    InputData as EmployDataType,
    NameType as EmployNameType,
    Name as EmployName,
} from "./Employment";
import {
    InputData as LinkDataType,
    NameType as LinkNameType,
    Name as LinkName,
} from "./links";
import LangElem, {
    InputData as LangDataType,
    NameType as LangNameType,
} from "./languages";
import {
    InputData as SkillDataType,
    NameType as SkillNameType,
} from "./Skills";
import {
    InputData as CourseDataType,
    NameType as CourseNameType,
} from "./courses";
import {
    InputData as InternShipDataType,
    NameType as InternShipNameType,
} from "./internships";
import { InputData as BasicInputData } from "./basicinf";

import {
    InputData as ReferenceDataType,
    NameType as ReferenceNameType,
} from "./reference";
import {
    InputData as ExtraActivitesDataType,
    NameType as ExtraActivitesNameType,
} from "./ExtraActivites";
import { InputData as TeamDataType, NameType as TeamNameType } from "./Team";
import {
    InputData as ProjectsDataType,
    NameType as ProjectsNameType,
} from "./Projects";
import { InputData as ProInputData } from "./professional";
import { InputData as HobbiesData } from "./hobbies";
import { InputData as CustomInputData } from "./CustomSection";
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
