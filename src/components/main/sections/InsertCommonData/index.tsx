import React, { SyntheticEvent, useMemo, useState } from "react";
import { FieldPath, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import HeadSection from "@src/components/common/head";
import lodash from "lodash";
import ElemGenerator, { ElemType as OrgElemType } from "./EleGen";

export interface ElemProps<T extends FieldsType, Name extends string> {
    index: number;
    form: UseFormReturn<GeneratorData<T, Name>>;
}
export type ElemType<T extends FieldValues, Name extends string> = OrgElemType<
    ElemProps<T, Name>
>;

export type PathsKeysType<TFieldValues extends FieldValues> = {
    head: FieldPath<TFieldValues>;
    data: FieldPath<TFieldValues>;
    data_i: (i: number) => FieldPath<TFieldValues>;
    data_i_key: (i: number, key: string) => FieldPath<TFieldValues>;
};

export default function InfoGetter<T extends FieldsType, Name extends string>({
    name,
    initData,
    addButtonLabel = "Add",
    Elem,
    desc,
    formRegister,
    setDelete,
}: {
    name: Name;
    formRegister: UseFormReturn<GeneratorData<T, Name>>;
    initData: T;
    addButtonLabel: string;
    Elem: ElemType<T, Name>;
    desc?: string;
    setDelete?: Function;
}) {
    const { register, resetField, control, setValue, getValues } = formRegister;
    const keys: PathsKeysType<GeneratorData<T, Name>> = {
        head: `${name}.head` as FieldPath<GeneratorData<T, Name>>,
        data: `${name}.data` as FieldPath<GeneratorData<T, Name>>,
        data_i(i: number): FieldPath<GeneratorData<T, Name>> {
            return `${this.data}.${i}` as Path<GeneratorData<T, Name>>;
        },
        data_i_key(i: number, key: string): FieldPath<GeneratorData<T, Name>> {
            return `${this.data_i(i)}.${key}` as Path<GeneratorData<T, Name>>;
        },
    };
    const [EmploymentsData, setEmploymentData] = useState<any[]>([
        ...Object.keys(
            new Array(
                lodash.get(control._defaultValues, name)?.data?.length || 0
            ).fill(0)
        ),
    ]);

    return (
        <section className="my-5">
            <HeadSection
                {...register(keys.head, {
                    onBlur(e: SyntheticEvent<HTMLInputElement>) {
                        if (!e.currentTarget.value) {
                            resetField(keys.head);
                        }
                    },
                })}
                defaultValue={
                    lodash.get(control._defaultValues, keys.head) as string
                }
                reset={() => resetField(keys.head)}
                placeholder="Untitled"
                desc={desc}
                setDelete={setDelete}
            />
            <div className="space-y-4 transition-all duration-700">
                <ElemGenerator
                    Elem={Elem}
                    data={EmploymentsData.map((_, i) => ({
                        form: formRegister,
                        index: i,
                    }))}
                    deleteSelf={(i) => {
                        setEmploymentData(
                            EmploymentsData.slice(0, EmploymentsData.length - 1)
                        );
                        setValue(
                            keys.data,
                            (getValues(keys.data) as T[]).filter(
                                (_, ix) => ix != i
                            ) as any
                        );
                    }}
                    resort={(indexes) => {
                        const data = indexes.map((i) =>
                            getValues(keys.data_i(i))
                        ) as any;
                        setValue(keys.data, data);
                        setEmploymentData((pre) => [...pre]);
                    }}
                />
            </div>
            <button
                className="text-blue-60 font-bold hover:bg-blue-10 transition-all block w-full mt-5 py-3 text-start px-4 space-x-2"
                onClick={() => {
                    const data = { ...initData };
                    setEmploymentData((pre) => [...pre, pre.length]);
                    setValue(keys.data_i(EmploymentsData.length), data as any);
                }}
            >
                <FontAwesomeIcon
                    fontSize={"1em"}
                    icon={faAdd}
                />
                <span>{addButtonLabel}</span>
            </button>
        </section>
    );
}
