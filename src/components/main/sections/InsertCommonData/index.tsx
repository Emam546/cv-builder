import { SyntheticEvent, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import HeadSection from "@src/components/common/head";
import ElemGenerator, { ElemType as OrgElemType, PSchema } from "./EleGen";
import { copyObject } from "@src/utils";
import { Duplicate } from "./utils";
type NameRules = string;
export interface ElemProps<T> extends PSchema {
    index: number;
    form: UseFormReturn<GeneratorData<T, NameRules>>;
    name: string;
}
export type ElemType<T extends FieldValues> = OrgElemType<ElemProps<T>>;

export default function InfoGetter<T extends PSchema>({
    name,
    initData,
    addButtonLabel = "Add",
    Elem,
    desc,
    formRegister,
    setDelete,
}: {
    name: NameRules;
    formRegister: UseFormReturn<GeneratorData<T, NameRules>>;
    initData: () => T;
    addButtonLabel: string;
    Elem: ElemType<T>;
    desc?: string;
    setDelete?: Function;
}) {
    const { register, resetField, control, setValue, getValues } = formRegister;
    const keys = {
        head: `${name}.head`,
        data: `${name}.data`,
        data_i(i: number) {
            return `${this.data}.${i}`;
        },
        data_i_key(i: number, key: string) {
            return `${this.data_i(i)}.${key}`;
        },
    };
    const [ElementsData, setElementsData] = useState<T[]>(
        getValues(`${name}.data`)
    );

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
                control={control}
                reset={() => resetField(keys.head)}
                placeholder="Untitled"
                desc={desc}
                setDelete={setDelete}
            />
            <div className="space-y-4 transition-all duration-700">
                <ElemGenerator
                    Elem={Elem}
                    data={ElementsData.map((val, i) => ({
                        form: formRegister,
                        index: i,
                        name: `${name}`,
                        id: val.id,
                    }))}
                    deleteSelf={(xid) => {
                        const data = getValues(`${name}.data`).filter(
                            ({ id }) => xid != id
                        );
                        setValue(keys.data, data as any);
                        setElementsData(data);
                    }}
                    duplicate={(xid) => {
                        const allData = getValues(`${name}`).data;
                        const val = allData.find(({ id }) => xid == id);
                        if (!val) throw new Error("undefined instance");
                        const data = Duplicate(val);
                        setValue(`${name}.data`, [...allData, data] as any);
                        setElementsData([...allData, data]);
                    }}
                    resort={(indexes) => {
                        const allData = getValues(`${name}.data`);
                        const data = indexes.map((i) => allData[i]);
                        setValue(`${name}.data`, data as any);
                        setElementsData(data);
                    }}
                />
            </div>
            <button
                className="text-blue-60 font-bold hover:bg-blue-10 transition-all block w-full mt-5 py-3 text-start px-4 space-x-2"
                onClick={() => {
                    const data = initData();
                    const preData = getValues(`${name}`).data;
                    setValue(keys.data, [...preData, data] as any);
                    setElementsData([...preData, data]);
                }}
                type="button"
                aria-label="add"
            >
                <FontAwesomeIcon icon={faAdd} />
                <span>{addButtonLabel}</span>
            </button>
        </section>
    );
}
