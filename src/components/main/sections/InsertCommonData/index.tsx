import { SyntheticEvent } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import HeadSection from "@src/components/common/head";
import ElemGenerator, { ElemType as OrgElemType } from "./EleGen";
import lodash from "lodash";
type NameRules = string;
export interface ElemProps<T extends FieldsType> {
    index: number;
    form: UseFormReturn<GeneratorData<T, NameRules>>;
}
export type ElemType<T extends FieldValues> = OrgElemType<ElemProps<T>>;

export default function InfoGetter<T extends FieldsType>({
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
    initData: T;
    addButtonLabel: string;
    Elem: ElemType<T>;
    desc?: string;
    setDelete?: Function;
}) {
    const { register, resetField, control, setValue, getValues, watch } =
        formRegister;
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
    const EmploymentsData = watch(`${name}.data`);

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
                        setValue(
                            keys.data,
                            getValues(`${name}.data`).filter(
                                (_, ix) => ix != i
                            ) as any
                        );
                    }}
                    resort={(indexes) => {
                        const data = indexes.map(
                            (i) => getValues(`${name}.data.${i}`) as T
                        );
                        setValue(`${name}.data`, data as any);
                    }}
                />
            </div>
            <button
                className="text-blue-60 font-bold hover:bg-blue-10 transition-all block w-full mt-5 py-3 text-start px-4 space-x-2"
                onClick={() => {
                    const data = { ...initData };
                    setValue(keys.data_i(EmploymentsData.length), data as any);
                }}
                type="button"
                aria-label="add"
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
