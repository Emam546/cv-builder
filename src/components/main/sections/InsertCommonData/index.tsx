import { SyntheticEvent, useState } from "react";
import MainInfoGetter, {
    Props as MainProps,
    ListElemType,
} from "./infoGenerator";
import HeadSection from "@src/components/common/head";
import { PSchema } from "./EleGen";
import { UseFormReturn } from "react-hook-form";

export type ElemType<T> = ListElemType<GeneratorData<T, string>>;
export interface Props<T extends PSchema>
    extends Omit<MainProps<T>, "keys" | "formRegister" | "Elem"> {
    name: string;
    desc?: string;
    Elem: ElemType<T>;
    setDelete?: () => any;
    formRegister: UseFormReturn<GeneratorData<T, string>>;
}
export default function InfoGetter<T extends PSchema>({
    desc,
    name,
    setDelete,
    ...props
}: Props<T>) {
    const { register, resetField, control, getValues } = props.formRegister;
    const keys = {
        head: `${name}.head`,
        data: `${name}.data`,
        root: `${name}`,
    };
    const [headLoading, setHeadLoading] = useState(false);
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
                        if (!props.onDeleteElem) return setDelete();
                        Promise.all(
                            getValues(`${name}.data`).map(
                                props.onDeleteElem
                            )
                        )
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
            <MainInfoGetter {...{ ...props as any, keys }} />
        </section>
    );
}
