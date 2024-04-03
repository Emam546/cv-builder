import type {
    InputData as EmployDataType,
    NameType as EmployNameType,
} from "@src/components/main/sections/Employment";
import type {
    InputData as LinkDataType,
    NameType as LinkNameType,
} from "@src/components/main/sections/links";
import type LangElem, {
    InputData as LangDataType,
    NameType as LangNameType,
} from "@src/components/main/sections/languages";
import type {
    InputData as SkillDataType,
    NameType as SkillNameType,
} from "@src/components/main/sections/Skills";
import type {
    InputData as CourseDataType,
    NameType as CourseNameType,
} from "@src/components/main/sections/courses";
import type {
    InputData as InternShipDataType,
    NameType as InternShipNameType,
} from "@src/components/main/sections/internships";
import type { InputData as BasicInputData } from "@src/components/main/sections/basicinf";

import type {
    InputData as ReferenceDataType,
    NameType as ReferenceNameType,
} from "@src/components/main/sections/reference";
import type {
    InputData as ExtraActivitiesDataType,
    NameType as ExtraActivitiesNameType,
} from "@src/components/main/sections/ExtraActivites";
import type {
    InputData as TeamDataType,
    NameType as TeamNameType,
} from "@src/components/main/sections/Team";
import type {
    InputData as ProjectsDataType,
    NameType as ProjectsNameType,
} from "@src/components/main/sections/Projects";
import type {
    InputData as PhotosDataType,
    NameType as PhotosNameType,
} from "@src/components/main/sections/photos";
import type {
    InputData as EducationDataType,
    NameType as EducationNameType,
} from "@src/components/main/sections/education";
import type {
    InputData as TestimonialData,
    NameType as TestimonialNameType,
} from "@src/components/main/sections/tesimonial";
import type {
    InputData as ParaInputData,
    NameType as ParaName,
} from "@src/components/main/sections/paragraphs";
import type { InputData as HobbiesData } from "@src/components/main/sections/hobbies";
import type {
    InputData as CustomInputData,
    NameType as CustomNameType,
} from "@src/components/main/sections/CustomSection/types";

import { FieldValues, Path } from "react-hook-form";

declare global {
    interface FieldsType {
        [k: string]: any;
    }

    type GeneratorData<T, Name extends string> = {
        [f in Name]: {
            head: string;
            data: T[];
        };
    };
    type Data = BasicInputData &
        GeneratorData<ParaInputData, ParaName> &
        HobbiesData &
        GeneratorData<EmployDataType, EmployNameType> &
        GeneratorData<LinkDataType, LinkNameType> &
        GeneratorData<LangDataType, LangNameType> &
        GeneratorData<SkillDataType, SkillNameType> &
        GeneratorData<InternShipDataType, InternShipNameType> &
        GeneratorData<CourseDataType, CourseNameType> &
        GeneratorData<ExtraActivitiesDataType, ExtraActivitiesNameType> &
        GeneratorData<TeamDataType, TeamNameType> &
        GeneratorData<ProjectsDataType, ProjectsNameType> &
        GeneratorData<ReferenceDataType, ReferenceNameType> &
        GeneratorData<PhotosDataType, PhotosNameType> &
        GeneratorData<EducationDataType, EducationNameType> &
        GeneratorData<TestimonialData, TestimonialNameType> &
        CustomInputData;

    type SectionNamesType = Exclude<keyof Data, CustomNameType>;
    type SectionStateDataType = {
        [key in SectionNamesType]: {
            order: number;
            hiddenState: boolean;
        };
    };
    interface SectionStateType {
        sections: SectionStateDataType;
        custom: { order: number }[];
    }
}
