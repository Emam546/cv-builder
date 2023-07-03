import { onDelete as ProjectOnDelete } from "@src/components/main/sections/Projects";
import { onDelete as CoursesOnDelete } from "@src/components/main/sections/courses";
import { onDelete as TeamOnDelete } from "@src/components/main/sections/Team";
import { onDelete as EducationOnDelete } from "@src/components/main/sections/education";
import { onDelete as BasicInputOnDelete } from "@src/components/main/sections/basicinf";
import { onDelete as PhotosOnDelete } from "@src/components/main/sections/photos";
import { onDelete as InternOnDelete } from "@src/components/main/sections/internships";
import { onDelete as TestOnDelete } from "@src/components/main/sections/tesimonial";

export function LoopThroughData<T>(
    val: { data: T[] },
    prom: (v: T) => Promise<void>
) {
    return Promise.all(val.data.map((v) => prom(v)));
}
export async function DeleteAllData(data: Data) {
    await Promise.all([
        LoopThroughData(data.projects, ProjectOnDelete),
        LoopThroughData(data.courses, CoursesOnDelete),
        LoopThroughData(data.team, TeamOnDelete),
        LoopThroughData(data.education, EducationOnDelete),
        BasicInputOnDelete(data),
        LoopThroughData(data.images, PhotosOnDelete),
        LoopThroughData(data.internships, InternOnDelete),
        LoopThroughData(data.testimonials, TestOnDelete),
    ]);
}
