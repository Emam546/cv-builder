import React, { SyntheticEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import MyEditor from "@src/components/common/inputs/Editor";
import HeadSection from "../common/head";
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
            />
            <MyEditor
                {...register("professional.data")}
                setValue={(val) => setValue("professional.data", val)}
                placeholder="e.g. passionate science teacher with 8+ years of experience and track record of ..."
            />
        </section>
    );
}
