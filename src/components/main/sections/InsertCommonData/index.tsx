import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import HeadSection from "@src/components/common/head";
import ElemGenerator, { ElemType as OrgElemType, PSchema } from "./EleGen";
import { Duplicate } from "./utils";
import DeleteAlert from "./deleteAlert";
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
    onDeleteElem,
}: {
    name: NameRules;
    formRegister: UseFormReturn<GeneratorData<T, NameRules>>;
    initData: () => T;
    addButtonLabel: string;
    Elem: ElemType<T>;
    desc?: string;
    setDelete?: Function;
    onDeleteElem?: (val: T) => Promise<any>;
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
    const [ElementsData, setEleData] = useState<T[]>(getValues(`${name}.data`));
    const [errDeleting, setErrDeleting] = useState<string>();
    const [open, setOpen] = useState(false);
    const lastData = useRef<[T, number]>();
    const [headLoading, setHeadLoading] = useState(false);
    const [loadingElem, setLoadingElem] = useState(false);
    function undo() {
        if (!lastData.current) return;
        const allData = getValues(`${name}.data`);
        const newArr = [
            ...allData.slice(0, lastData.current[1]),
            lastData.current[0],
            ...allData.slice(lastData.current[1], allData.length),
        ];
        lastData.current = undefined;
        setEleData(newArr);
        setValue(`${name}.data`, newArr as any);
    }
    function onClose() {
        return new Promise((res) => {
            if (!lastData.current) {
                setOpen(false);
                setErrDeleting(undefined);

                return res(true);
            }
            if (onDeleteElem) {
                setLoadingElem(true);
                return onDeleteElem(lastData.current[0])
                    .then(() => {
                        lastData.current = undefined;
                        setErrDeleting(undefined);
                        setOpen(false);
                        res(true);
                    })
                    .catch((err) => {
                        undo();
                        setErrDeleting(err.message);
                        setOpen(true);
                        res(false);
                    })
                    .finally(() => {
                        setLoadingElem(false);
                    });
            } else {
                lastData.current = undefined;
                setErrDeleting(undefined);
                setOpen(false);
                res(true);
            }
        });
    }
    useEffect(() => {
        window.addEventListener("close", () => {
            if (open) onClose();
        });
    }, []);
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
                setDelete={
                    setDelete &&
                    (() => {
                        if (!onDeleteElem) return setDelete();
                        Promise.all(getValues(`${name}.data`).map(onDeleteElem))
                            .then(() => {
                                setDelete();
                            })
                            .finally(() => {
                                setHeadLoading(false);
                            });
                        setHeadLoading(true);
                    })
                }
                loading={headLoading}
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
                    onDelete={(xid) => {
                        onClose().then((res) => {
                            const allData = getValues(`${name}.data`);
                            lastData.current = [
                                allData.find(({ id }) => id == xid) as T,
                                allData.findIndex(({ id }) => id == xid),
                            ];
                            const newData = allData.filter(
                                ({ id }) => id != xid
                            );
                            setValue(`${name}.data`, newData as any);
                            setEleData([...newData]);
                            setOpen(true);
                        });
                    }}
                    onDuplicate={(xid) => {
                        const allData = getValues(`${name}`).data;
                        const val = allData.find(({ id }) => xid == id);
                        if (!val) throw new Error("undefined instance");
                        const data = Duplicate(val);
                        setValue(`${name}.data`, [...allData, data] as any);
                        setEleData([...allData, data]);
                    }}
                    onResort={(indexes) => {
                        const allData = getValues(`${name}.data`);
                        const data = indexes.map((i) => allData[i]);
                        setValue(`${name}.data`, data as any);
                        setEleData(data);
                    }}
                />
            </div>
            <button
                className="text-blue-60 font-bold hover:bg-blue-10 transition-all block w-full mt-5 py-3 text-start px-4 space-x-2"
                onClick={() => {
                    const data = initData();
                    const preData = getValues(`${name}`).data;
                    setEleData([...preData, data]);
                    setValue(keys.data, [...preData, data] as any);
                }}
                type="button"
                aria-label="add"
            >
                <FontAwesomeIcon icon={faAdd} />
                <span>{addButtonLabel}</span>
            </button>
            <DeleteAlert
                deps={[lastData.current]}
                open={open}
                setClose={onClose}
                undo={() => {
                    undo();
                    setOpen(false);
                }}
                error={errDeleting}
                loading={loadingElem}
            />
        </section>
    );
}
