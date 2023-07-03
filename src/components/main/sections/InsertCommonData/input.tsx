import { WrapElem } from "@src/components/common/inputs/styles";
import { PSchema } from "./EleGen";
import MainInfoGetter, { Props as MainProps } from "./infoGenerator";
import type { ListElemType as OrgListElemType, Data } from "./infoGenerator";
export type ListElemType<T> = OrgListElemType<Data<T>>;
export interface Props<T extends PSchema> extends Omit<MainProps<T>, "keys"> {
    label: string;
    name: string;
}
export default function InfoGetter<T extends PSchema>({
    label,
    name,
    ...props
}: Props<T>) {
    const keys = {
        data: `${name}`,
        root: `${name}`,
    };
    return (
        <>
            <WrapElem label={label}>
                <MainInfoGetter {...{ ...props, keys }} />
            </WrapElem>
        </>
    );
}
