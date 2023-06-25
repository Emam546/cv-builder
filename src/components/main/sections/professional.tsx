import React, { SyntheticEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import MyEditor from "@src/components/common/inputs/Editor";
import HeadSection from "@src/components/common/head";
import FinalEditor from "@src/components/common/inputs/Editor";
export interface InputData {
    professional: { head: string; data: string };
}
export default function Professional({
    resetField,
    register,
    control,
    setValue,
}: UseFormReturn<InputData>) {
    return (
        <section className="my-10">
            <HeadSection
                {...register("professional.head", {
                    onBlur(e: SyntheticEvent<HTMLInputElement>) {
                        if (!e.currentTarget.value) {
                            resetField("professional.head");
                        }
                    },
                })}
                defaultValue={control._defaultValues.professional?.head}
                reset={() => resetField("professional.head")}
                desc="Write 2-4 short & energetic sentences to interest the reader!
                Mention your role, experience & most importantly - your biggest
                achievements, best qualities and skills."
                control={control as any}
            />
            <FinalEditor
                control={control as any}
                {...register("professional.data")}
                placeholder="e.g. passionate science teacher with 8+ years of experience and track record of ..."
            />
        </section>
    );
}
