import React, { SyntheticEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import HeadSection from "@src/components/common/head";
import { BottomLine } from "@src/components/common/inputs/styles";
export type NameType = "hobbies";
export const Name: NameType = "hobbies";
export interface InputData {
    [Name]: { head: string; data: string };
}
export default function Hobbies({
    form: { resetField, register, control },
    setDelete,
}: {
    form: UseFormReturn<InputData>;
    setDelete: Function;
}) {
    return (
        <section className="my-10">
            <HeadSection
                {...register(`${Name}.head`, {
                    onBlur(e: SyntheticEvent<HTMLInputElement>) {
                        if (!e.currentTarget.value) {
                            resetField(`${Name}.head`);
                        }
                    },
                })}
                defaultValue={control._defaultValues[Name]?.head}
                reset={() => resetField(`${Name}.head`)}
                desc="What do you like?"
                setDelete={setDelete}
            />
            <BottomLine>
                <textarea
                    {...register(`${Name}.data`)}
                    className="w-full min-h-[10rem] m-0 resize-none bg-neutral-10 p-3 py-4 text-2xl focus:outline-none"
                    placeholder="e.g Skiing Skydiving Painting"
                />
            </BottomLine>
        </section>
    );
}
