/* eslint-disable react/display-name */
import React, {
    ForwardRefExoticComponent,
    RefAttributes,
    SyntheticEvent,
    useEffect,
    useState,
} from "react";
import {
    FieldPath,
    FieldValues,
    Path,
    PathValue,
    UseFormReturn,
} from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ElemProps } from "./Elem";
import HeadSection from "@src/components/common/head";
import { FieldsType, GeneratorData } from "./types";

export type ElemType<T extends FieldValues, Name extends string> = (
    props: Parameters<
        ForwardRefExoticComponent<
            ElemProps<T, Name> & RefAttributes<HTMLLIElement>
        >
    >[0]
) => React.ReactElement | null;

// const head: <T extends string>(str: T) => `${T}_head` = (str) => `${str}_head`;

export type PathsKeysType<TFieldValues extends FieldValues> = {
    head: FieldPath<TFieldValues>;
    data: FieldPath<TFieldValues>;
    data_i: (i: number) => FieldPath<TFieldValues>;
    data_i_key: (i: number, key: string) => FieldPath<TFieldValues>;
};

export default function InfoGetter<T extends FieldsType, Name extends string >({
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

    const [EmploymentsData, setEmploymentData] = useState<T[]>(
        (control._defaultValues[name]?.["data"] as T[]) || ([] as T[])
    );
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

    // const value = useWatch({ control, name: `${name}_data` });
    const [dragger, setDragging] = useState<[boolean, number | null]>([
        false,
        null,
    ]);
    const [allEle, setAllEle] = useState<HTMLElement[]>([]);
    const [ypos, setYpos] = useState(0);
    useEffect(() => {
        const [state, index] = dragger;
        if (index == null) return;
        const ele = allEle[index];

        if (!ele) return;
        if (!state) {
            const indexes = allEle
                .map<[number, number]>((ele, i) => {
                    if (i == index) return [ypos, i];
                    const rect = ele.getBoundingClientRect();
                    return [rect.top + rect.height / 2 + window.scrollY, i];
                })
                .sort((a, b) => a[0] - b[0])
                .map(([_, i]) => i);
            const data = indexes.map((i) =>
                getValues(keys.data_i(i))
            ) as PathValue<
                GeneratorData<T, Name>,
                Path<GeneratorData<T, Name>>
            >;
            setValue(keys.data, data);
            setEmploymentData((pre) => indexes.map((i) => pre[i]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dragger]);

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
                defaultValue={control._defaultValues[keys.head] as string}
                reset={() => resetField(keys.head)}
                placeholder="Untitled"
                desc={desc}
                setDelete={setDelete}
            />
            <ul className="space-y-4 transition-all duration-700">
                {EmploymentsData.map((data, i) => {
                    return (
                        <Elem
                            index={i}
                            key={i}
                            deleteSelf={() => {
                                setEmploymentData(
                                    EmploymentsData.filter((_, ix) => ix != i)
                                );
                            }}
                            form={formRegister}
                            onDragStart={(ele) => setDragging([true, i])}
                            onDragOver={(ele) => setDragging([false, i])}
                            onDrag={function (ev) {
                                if (i != dragger[1]) return;
                                const rect = this.getBoundingClientRect();
                                setYpos(
                                    rect.top + rect.height / 2 + window.scrollY
                                );
                            }}
                            ref={(ele) => {
                                if (!ele) return;
                                setAllEle((pre) => [...pre, ele]);
                            }}
                            values={data}
                        />
                    );
                })}
            </ul>
            <button
                className="text-blue-60 font-bold hover:bg-blue-10 transition-all block w-full mt-5 py-3 text-start px-4 space-x-2"
                onClick={() => {
                    const data = { ...initData };
                    setEmploymentData((pre) => [...pre, data]);
                    setValue(keys.data_i(EmploymentsData.length), data as any);
                }}
            >
                <FontAwesomeIcon icon={faAdd} />
                <span>{addButtonLabel}</span>
            </button>
        </section>
    );
}
