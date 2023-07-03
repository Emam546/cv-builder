import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import { forwardRef } from "@src/components/main/sections/InsertCommonData/input";
import FElem from "../links";
import FinalEditor from "@src/components/common/inputs/Editor";
import { WrapElem } from "@src/components/common/inputs/styles";
import { uuid } from "@src/utils";
export type NameType = "links";
export const Name: NameType = "links";
export type NameRules = string;
export interface InputData {
    id: string;
    title: string;
    desc: string;
}
export const InitData: () => InputData = () => {
    return {
        id: uuid(),
        title: "",
        desc: "<p></p>\n",
    };
};

export const ListItem = forwardRef<InputData>(
    (
        {
            index: i,
            props: {
                form: { register, control, setValue },
                name: Name,
            },
            ...props
        },
        ref
    ) => {
        return (
            <Elem
                headLabel={function G() {
                    const { title } = useWatch({
                        name: `${Name}.${i}`,
                        control,
                    });
                    return (
                        <>
                            <p className="font-bold group-hover:text-blue-60">
                                {title || "(Not Specified)"}
                            </p>
                        </>
                    );
                }}
                {...props}
                ref={ref}
            >
                <div className="mb-2">
                    <Grid2Container>
                        <NormalInput
                            label="Title"
                            {...register(`${Name}.${i}.title`)}
                        />
                    </Grid2Container>
                    <WrapElem
                        label="Desc"
                        className="my-2"
                    >
                        <FinalEditor
                            control={control}
                            name={`${Name}.${i}.desc`}
                        />
                    </WrapElem>
                </div>
            </Elem>
        );
    }
);

export default FElem;
