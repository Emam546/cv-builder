import { uuid } from "@src/utils";

export type NameType = "custom";
export const Name: NameType = "custom";

export interface SectionInputData {
    id: string;
    title: string;
    city: string;
    date: {
        start: string;
        end: string | "Present";
    };
    desc: string;
}
export const InitData = (): SectionInputData => ({
    id: uuid(),
    city: "",
    title: "",
    date: {
        end: "",
        start: "",
    },
    desc: "<p></p>\n",
});
export const DuplicateData = (val: SectionInputData): SectionInputData => ({
    ...val,
    id: uuid(),
});
export interface SectionData {
    id: string;
    head: string;
    data: SectionInputData[];
}
export const SectionInitData: () => SectionData = () => ({
    data: [],
    head: "Untitled",
    id: uuid(),
});
export interface InputData {
    custom: Record<string, SectionData>;
}
