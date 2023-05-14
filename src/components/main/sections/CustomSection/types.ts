export type NameType = "custom";
export const Name: NameType = "custom";

export interface SectionInputData extends FieldsType {
    title: string;
    city: string;
    date: {
        start: string;
        end: string | "Present";
    };
    desc: string;
}
export interface SectionData {
    head: string;
    data: SectionInputData[];
}
export interface InputData {
    custom: SectionData[];
}
