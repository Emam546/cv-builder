import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as style } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ShowResultElem from "./elem";
const interfaceCode = `interface Data {
    info: {
        head: string;
        data: {
            email: string;
            imgUrl: string;
            address: string;
            city: string;
            country: string;
            firstName: string;
            jobTitle: string;
            lastName: string;
            nationality: string;
            phone: string;
            placeOfBirth: string;
            postalCode: string;
            availability: string;
            cv: string;
        };
    };
    paragraph: {
        head: string;
        data: Array<{
            id: string;
            label: string;
            desc: string;
        }>;
    };
    employ: {
        head: string;
        data: Array<{
            id: string;
            jobTitle: string;
            employer: string;
            date: {
                start: string;
                end: string | "Present";
            };
            city: string;
            desc: string;
            teamSize: number;
            technologies: string[];
        }>;
    };
    links: {
        head: string;
        data: Array<{
            id: string;
            label: string;
            link: string;
        }>;
    };
    skills: {
        head: string;
        data: Array<{
            id: string;
            label: string;
            skills: Array<{
                label: string;
                level: number;
            }>;
        }>;
    };
    references: {
        head: string;
        data: Array<{
            id: string;
            company: string;
            email: string;
            name: string;
            phone: string;
            label: string;
            institution: string;
        }>;
    };
    team: {
        head: string;
        data: Array<{
            index?: number;
            role: string;
            id: string;
        }>;
    };
    projects: {
        head: string;
        data: Array<{
            label: string;
            data: Array<{
                kind: string;
                id: string;
                links: Array<{
                    id: string;
                    label: string;
                    link: string;
                }>;
                name: string;
                desc: string;
                date: {
                    start: string;
                    end: string;
                };
                team: Array<{}>;
                images: Array<{
                    id: string;

                    heightRation: number;
                    widthRation: number;
                    image: string;
                }>;
                progress: number;
                technologies: Array<string>;
                teamSize: number;
                budget: {
                    num: number;
                    unit: string;
                };
                lessons: Array<{
                    id: string;

                    title: string;
                    desc: string;
                }>;
            }>;
        }>;
    };
    images: {
        head: string;
        data: Array<{
            id: string;
            images: Array<{
                id: string;
                heightRation: number;
                widthRation: number;
                image: string;
            }>;
        }>;
    };
    courses?: {
        head: string;
        data: Array<{
            id: string;
            label: string;
            institution: string;
            date: {
                start: string;
                end: string | "Present";
            };
            desc: string;
            images: Array<{
                label: string;
                images: Array<{
                    widthRation: number;
                    heightRation: number;
                    image: string;
                    id: string;
                }>;
                id: string;
            }>;
        }>;
    };
    education?: {
        head: string;
        data: Array<{
            id: string;
            degree: string;
            institution: string;
            date: {
                start: string;
                end: string | "Present";
            };
            desc: string;
            images: Array<{
                label: string;
                images: Array<{
                    widthRation: number;
                    heightRation: number;
                    image: string;
                    id: string;
                }>;
                id: string;
            }>;
        }>;
    };
    extraActivities?: {
        head: string;
        data: Array<{
            id: string;
            title: string;
            employer: string;
            date: {
                start: string;
                end: string | "Present";
            };
            city: string;
            desc: string;
        }>;
    };
    internships?: {
        head: string;
        data: Array<{
            id: string;
            jobTitle: string;
            employer: string;
            date: {
                start: string;
                end: string | "Present";
            };
            city: string;
            desc: string;
            images: Array<{
                widthRation: number;
                heightRation: number;
                image: string;
                id: string;
            }>;
            links: Array<{
                label: string;
                link: string;
                id: string;
            }>;
            technologies: string[];
        }>;
    };
    testimonials?: {
        head: string;
        data: Array<{
            id: string;
            name: string;
            role: string;
            company: string;
            testimonialJob: string;
            email: string;
            avatar: string;
            projectImages: Array<{
                widthRation: number;
                heightRation: number;
                image: string;
                id: string;
            }>;
            projectUrl: string;
            rating: number;
            links: Array<{
                label: string;
                link: string;
                id: string;
            }>;
            desc: string;
        }>;
    };
    hobbies?: {
        head: string;
        data: string;
    };
    languages?: {
        head: string;
        data: Array<{
            id: string;
            language: string;
            level: string;
        }>;
    };
}`;

export default function InterFaceCode() {
    return (
        <div className="mt-5">
            <ShowResultElem string={interfaceCode}>
                <SyntaxHighlighter
                    language="typescript"
                    style={style}
                >
                    {interfaceCode.trim()}
                </SyntaxHighlighter>
            </ShowResultElem>
        </div>
    );
}
