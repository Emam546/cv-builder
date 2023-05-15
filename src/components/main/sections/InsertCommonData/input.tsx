import React, {
    ForwardRefExoticComponent,
    ForwardRefRenderFunction,
    PropsWithoutRef,
    RefAttributes,
    useEffect,
    useMemo,
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
import { LabelElem } from "../../../common/inputs/styles";
import lodash from "lodash";
import classNames from "classnames";
import ElemGenerator, { ElemType, ListProps as OrgListProps } from "./EleGen";

export interface ListProps<T extends FieldValues, Name extends string> {
    index: number;
    form: UseFormReturn<ListData<T, Name>>;
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

export default function InfoGetter<T extends FieldsType, Name extends string>({
    name,
    initData,
    addButtonLabel = "Add",
    Elem,
    formRegister,
    label,
    noDragging,
}: {
    name: Name;
    formRegister: UseFormReturn<ListData<T, Name>>;
    initData: T;
    addButtonLabel: string;
    Elem: ListElemType<T, Name>;
    label?: string;
    noDragging?: boolean;
}) {
    const { setValue, getValues, watch } = formRegister;

    const keys = {
        root: `${name}` as FieldPath<ListData<T, Name>>,
        data_i(i: number): FieldPath<ListData<T, Name>> {
            return `${this.root}.${i}` as Path<ListData<T, Name>>;
        },
        data_i_key(i: number, key: string): FieldPath<ListData<T, Name>> {
            return `${this.data_i(i)}.${key}` as Path<ListData<T, Name>>;
        },
    };

    const [EleData, setData] = useState<any[]>([
        ...Object.keys(
            new Array(
                (
                    lodash.get(formRegister.control._defaultValues, name) || []
                ).length
            ).fill(1)
        ),
    ]);

    useEffect(() => {
        const Values = (getValues(keys.root) as T[]).length;
        if (Values) setData([...Object.keys(new Array(Values).fill(1))]);
    }, []);
    if (getValues(name).length != EleData.length) return null;
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
                                    getValues(keys.data_i(i))
                                ) as PathValue<
                                    ListData<T, Name>,
                                    Path<ListData<T, Name>>
                                >;
                                setValue(keys.root, data);
                                setData((pre) => [...pre]);
                            }}
                            deleteSelf={(i) => {
                                setValue(
                                    keys.root,
                                    (getValues(keys.root) as T[]).filter(
                                        (val, ix) => i != ix
                                    ) as any
                                );
                                setData((pre) => pre.slice(0, pre.length - 1));
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
                        setData((pre) => [...pre, 1]);
                    }}
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
