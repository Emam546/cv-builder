import React, { ForwardRefRenderFunction } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { LabelElem } from "../../../common/inputs/styles";
import classNames from "classnames";
import ElemGenerator, { ElemType, ListProps as OrgListProps } from "./EleGen";

export interface ListProps<T extends FieldValues, NameRules extends string> {
    index: number;
    form: UseFormReturn<ListData<T, NameRules>>;
}

export type ListElemType<
    T extends FieldValues,
    Name extends string,
    P extends Record<string, any> = {}
> = ElemType<ListProps<T, Name> & P>;
export function forwardRef<
    T extends FieldValues,
    Name extends string,
    P extends Record<string, any> = {}
>(
    render: ForwardRefRenderFunction<
        HTMLDivElement,
        OrgListProps<ListProps<T, Name> & P>
    >
): ListElemType<T, Name, P> {
    return React.forwardRef(render);
}
type NameRules = string;
export default function InfoGetter<T extends FieldsType>({
    name,
    initData,
    addButtonLabel = "Add",
    Elem,
    formRegister,
    label,
    noDragging,
}: {
    name: NameRules;
    formRegister: UseFormReturn<ListData<T, NameRules>>;
    initData: T;
    addButtonLabel: string;
    Elem: ListElemType<T, NameRules>;
    label?: string;
    noDragging?: boolean;
}) {
    const { setValue, getValues, watch } = formRegister;
    const keys = {
        root: `${name}`,
        data_i(i: number) {
            return `${this.root}.${i}`;
        },
        data_i_key(i: number, key: string) {
            return `${this.data_i(i)}.${key}`;
        },
    };
    const EleData = watch(name);
    return (
        <LabelElem label={label}>
            <div>
                <div
                    className={classNames({
                        "pl-5": !noDragging,
                    })}
                >
                    <div className="space-y-4 transition-all duration-700 mb-1">
                        <ElemGenerator
                            noDragging={noDragging}
                            Elem={Elem}
                            data={EleData.map((_, i) => ({
                                index: i,
                                form: formRegister,
                            }))}
                            resort={(indexes) => {
                                const data = indexes.map((i) =>
                                    getValues(`${name}.${i}`)
                                ) as PathValue<
                                    ListData<T, NameRules>,
                                    Path<ListData<T, NameRules>>
                                >;
                                setValue(keys.root, data);
                            }}
                            deleteSelf={(i) => {
                                setValue(
                                    keys.root,
                                    (getValues(keys.root) as T[]).filter(
                                        (val, ix) => i != ix
                                    ) as any
                                );
                            }}
                        />
                    </div>
                </div>
                <button
                    className="text-blue-60 font-bold hover:bg-blue-10 transition-all block w-full py-3 text-start px-4 space-x-2"
                    onClick={() => {
                        const data = { ...initData };
                        setValue(
                            keys.data_i((getValues(keys.root) as T[]).length),
                            data as any
                        );
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
            </div>
        </LabelElem>
    );
}
