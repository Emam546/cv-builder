import { Name as CustomName } from "./sections/CustomSection/types";
import data from "@src/components/main/sections/Skills/data.json";
export const Technologies = data.programming_technologies.map((value) => ({
    value,
    label: value,
}));
export function convertSection2Data(
    data: Data,
    sectionState: SectionStateType
) {
    const Sections: Record<string, any> = { ...data };
    data[CustomName].map((val) => {
        Sections[val.head] = val;
    });

    delete Sections[CustomName];
    [...Object.entries(sectionState.sections)].map(([key, val]) => {
        if (val.hiddenState) delete Sections[key];
    });
    return Sections;
}

