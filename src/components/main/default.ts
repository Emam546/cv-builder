import { Name as EmployName } from "./sections/Employment";
import { Name as ParagraphName } from "./sections/paragraphs";
import { Name as LinkName } from "./sections/links";
import { Name as LangName } from "./sections/languages";
import { Name as SkillName } from "./sections/Skills";
import { Name as CourseName } from "./sections/courses";
import { Name as InternShipName } from "./sections/internships";
import { Name as ReferenceName } from "./sections/reference";
import { Name as ExtraActivitiesName } from "./sections/ExtraActivites";
import { Name as TeamName } from "./sections/Team";
import { Name as ProjectsName } from "./sections/Projects";
import { Name as YearResolutionName } from "./sections/yearsResloutions";
import { Name as PhotosName } from "./sections/photos";
import { Name as CustomName } from "./sections/CustomSection/types";
import { Name as HobbiesName } from "./sections/hobbies";
import { Name as EducationName } from "./sections/education";
import { Name as TestimonialsName } from "./sections/tesimonial";

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
            availability: "immediately",
        },
    },
    [ParagraphName]: {
        head: "Profession Details",
        data: [],
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
    [ExtraActivitiesName]: {
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
    [PhotosName]: {
        head: "Pictures",
        data: [],
    },
    [EducationName]: {
        head: "Education",
        data: [],
    },
    [TestimonialsName]: {
        head: "Testimonials",
        data: [],
    },
    [YearResolutionName]: {
        head: "New Year's resolutions ",
        data: [],
    },
};
export const defaultSectionState: SectionStateType = {
    sections: Object.entries({
        info: {
            hiddenState: false,
        },
        [ParagraphName]: {
            hiddenState: false,
        },
        [PhotosName]: {
            hiddenState: false,
        },
        [EmployName]: {
            hiddenState: false,
        },
        [ProjectsName]: {
            hiddenState: false,
        },
        [TeamName]: {
            hiddenState: false,
        },
        [TestimonialsName]: {
            hiddenState: false,
        },
        [EducationName]: {
            hiddenState: false,
        },
        [CourseName]: {
            hiddenState: true,
        },
        [SkillName]: {
            hiddenState: false,
        },
        [LangName]: {
            hiddenState: true,
        },
        [LinkName]: {
            hiddenState: false,
        },
        [InternShipName]: {
            hiddenState: true,
        },
        [HobbiesName]: {
            hiddenState: true,
        },
        [ExtraActivitiesName]: {
            hiddenState: true,
        },
        [ReferenceName]: {
            hiddenState: false,
        },
        [YearResolutionName]: {
            hiddenState: true,
        },
    }).reduce((acc, [name, val], i) => {
        return { ...acc, [name]: { ...val, order: i } };
    }, {} as SectionStateType["sections"]),
    custom: [],
};
