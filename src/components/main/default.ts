import { Name as EmployName } from "./sections/Employment";
import { Name as LinkName } from "./sections/links";
import { Name as LangName } from "./sections/languages";
import { Name as SkillName } from "./sections/Skills";
import { Name as CourseName } from "./sections/courses";
import { Name as InternShipName } from "./sections/internships";

import { Name as ReferenceName } from "./sections/reference";
import { Name as ExtraActivitesName } from "./sections/ExtraActivites";
import { Name as TeamName } from "./sections/Team";
import { Name as ProjectsName } from "./sections/Projects";
import { Name as CustomName } from "./sections/CustomSection/types";
import { Name as HobbiesName } from "./sections/hobbies";
let curOrder = 0;
export const defaultData: Data = {
    info: {
        head: "Personal Details",
        data: {
            email: "",
            imgUrl: "",
            address: "",
            city: "",
            country: "",
            firstName: "",
            jobTitle: "",
            lastName: "",
            nationality: "",
            phone: "",
            placeOfBirth: "",
            postalCode: "",
        },
    },
    professional: {
        head: "Profession Details",
        data: "",
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
};
export const defaultSectionState: SectionStateType = {
    sections: {
        info: {
            hiddenState: false,
            order: curOrder++,
        },
        professional: {
            hiddenState: false,
            order: curOrder++,
        },
        [EmployName]: {
            hiddenState: false,
            order: curOrder++,
        },
        [LinkName]: {
            hiddenState: false,
            order: curOrder++,
        },
        [LangName]: {
            hiddenState: true,
            order: curOrder,
        },
        [SkillName]: {
            hiddenState: false,
            order: curOrder,
        },
        [CourseName]: {
            hiddenState: true,
            order: curOrder,
        },
        [InternShipName]: {
            hiddenState: true,
            order: curOrder,
        },
        [HobbiesName]: {
            hiddenState: true,
            order: curOrder,
        },
        [ReferenceName]: {
            hiddenState: false,
            order: curOrder++,
        },
        [ExtraActivitesName]: {
            hiddenState: true,
            order: curOrder,
        },
        [TeamName]: {
            hiddenState: false,
            order: curOrder++,
        },
        [ProjectsName]: {
            hiddenState: false,
            order: curOrder++,
        },
    },
    custom: [],
};
