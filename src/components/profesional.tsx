import React, { SyntheticEvent } from "react";
import Header from "@src/components/common/inputs/header";
import { UseFormReturn } from "react-hook-form";
import MyEditor from "@src/components/common/inputs/Editor";
export interface InputData {
    proDataHead: string;
    proData?: string;
}
export default function Professional({
    resetField,
    register,
    control,
}: UseFormReturn<InputData>) {
    return (
        <section className="my-10">
            <Header
                {...register("proDataHead", {
                    onBlur(e: SyntheticEvent<HTMLInputElement>) {
                        if (!e.currentTarget.value) {
                            resetField("proDataHead");
                        }
                    },
                })}
                defaultValue={control._defaultValues.proDataHead}
                reset={() => resetField("proDataHead")}
            />
            <p className="text-neutral-50 text-sm mb-3">
                Write 2-4 short & energetic sentences to interest the reader!
                Mention your role, experience & most importantly - your biggest
                achievements, best qualities and skills.
            </p>
            <MyEditor
                {...register("proData")}
                placeholder="e.g. passionate science teacher with 8+ years of experience and track record of ..."
            />
        </section>
    );
}
