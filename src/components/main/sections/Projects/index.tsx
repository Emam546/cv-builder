import React from "react";
import { ElemType } from "@src/components/main/sections/InsertCommonData";
import { Elem } from "@src/components/main/sections/InsertCommonData/Elem";
import { useWatch } from "react-hook-form";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput, {
  OptionsInput,
} from "@src/components/common/inputs/normal";
import FinalEditor from "@src/components/common/inputs/Editor";
import { ListItem as LinkListItem, InitData as LinkInitData } from "../links";
import {
  ListElem as TeamListItem,
  InputData as TeamInputData,
  InitData as TeamInitData,
} from "./team";
import {
  ListItem as ImageListItem,
  InputData as ImageInputData,
  InitData as ImageInitData,
  OnDelete as ImageOnDelete,
  onDuplicate as ImageOnDuplicate,
} from "./images";
import {
  ListItem as LessonListItem,
  InputData as LessonInputData,
  InitData as LessonInitData,
} from "./lessons";
import InfoGetter, {
  ListElemType,
} from "@src/components/main/sections/InsertCommonData/input";
import DatePicker from "@src/components/common/inputs/datePicker";
import { WrapElem } from "@src/components/common/inputs/styles";
import RangeInput from "@src/components/common/inputs/rangeInput";
import MultiSelectInput from "@src/components/common/inputs/multiSelect";
import BudgetInput from "./budget";
import { uuid } from "@src/utils";
import { Technologies } from "../../utils";
import { Duplicate } from "../InsertCommonData/utils";
export type EleNameType = string;
export type NameType = "projects";
export const Name: NameType = "projects";
export interface EleInputData {
  id: string;
  name: string;
  kind: string;
  progress: number;
  date: {
    start: string;
    end: string;
  };
  links: {
    label: string;
    link: string;
  }[];
  teamSize: number;
  images: ImageInputData[];
  team: TeamInputData[];
  desc: string;
  budget: {
    num: number;
    unit: string;
  };
  lessons: LessonInputData[];
  technologies: (string | number)[];
}
export const EleInitData: () => EleInputData = () => ({
  id: uuid(),
  links: [],
  name: "",
  desc: "<p></p>\n",
  kind: "",
  date: {
    start: "",
    end: "",
  },
  team: [],
  images: [],
  progress: 20,
  technologies: [],
  teamSize: 1,
  budget: {
    num: 0,
    unit: "",
  },
  lessons: [],
});

type LinkPathType = `${EleNameType}.${number}.links`;
type TeamMemberPathType = `${EleNameType}.${number}.team`;
type ImagesPathType = `${EleNameType}.${number}.images`;
type LessonPathType = `${EleNameType}.${number}.lessons`;

function KindsInput({
  EleName,
  form,
  i,
}: {
  EleName: string;
  form: any;
  i: number;
}) {
  const { register, control, setValue } = form;
  const allData: EleInputData[] = useWatch({
    name: `${EleName}`,
    control,
  });
  const kinds = allData
    .map((val) => val.kind)
    .filter((_, index) => {
      return index != i;
    })
    .reduce((acc, val) => {
      const state = acc.some((v) => v == val);
      if (state) return acc;
      return [...acc, val];
    }, [] as string[]);

  return (
    <OptionsInput
      label="Kind"
      options={kinds}
      control={control}
      {...register(`${EleName}.${i}.kind`)}
    />
  );
}
export const onDeleteElem = async (value: EleInputData) => {
  await Promise.all(value.images.map(ImageOnDelete));
};
const MiniProjectElem = React.forwardRef(
  ({ index: i, props: { form, name: EleName }, ...props }, ref) => {
    const { register, control, getValues } = form;
    const LinkPath: LinkPathType = `${EleName}.${i}.links`;
    const TeamPath: TeamMemberPathType = `${EleName}.${i}.team`;
    const ImagePath: ImagesPathType = `${EleName}.${i}.images`;
    const LessonPath: LessonPathType = `${EleName}.${i}.lessons`;
    return (
      <Elem
        headLabel={function Title() {
          const { name, kind: jobTitle } = useWatch({
            name: `${EleName}.${i}`,
            control,
          });
          return (
            <div className="font-bold group-hover:text-blue-60">
              <p className="font-bold group-hover:text-blue-60">
                {name || "(Not Specified)"}
              </p>
              <p className="text-sm text-neutral-50">{jobTitle}</p>
            </div>
          );
        }}
        {...props}
        ref={ref}
      >
        <Grid2Container>
          <NormalInput
            control={control}
            label="Project Name"
            {...register(`${EleName}.${i}.name`)}
          />
          <KindsInput form={form} EleName={EleName} i={i} />
          <DatePicker
            applyPresent
            label="Start &End Time"
            startData={{
              ...register(`${EleName}.${i}.date.start`),
              placeholder: "MM / YYYY",
            }}
            endData={{
              ...register(`${EleName}.${i}.date.end`),
              placeholder: "MM / YYYY",
            }}
            control={control}
            labelEnd="Currently Work here."
          />
          <WrapElem label="Progress">
            <div>
              <RangeInput
                {...register(`${EleName}.${i}.progress`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </WrapElem>
          <NormalInput
            control={control}
            label="Team Size"
            {...register(`${EleName}.${i}.teamSize`, {
              valueAsNumber: true,
            })}
          />
          <BudgetInput
            label="Project Budget"
            price={{
              ...register(`${EleName}.${i}.budget.num`, {
                valueAsNumber: true,
              }),
            }}
            unit={{
              ...register(`${EleName}.${i}.budget.unit`),
              control: control,
            }}
          />
        </Grid2Container>
        <div className="flex flex-col items-stretch gap-4 my-4">
          <WrapElem label={"Technologies"}>
            <MultiSelectInput
              options={Technologies}
              name={`${EleName}.${i}.technologies`}
              control={control}
            />
          </WrapElem>

          <InfoGetter
            formRegister={form as any}
            addButtonLabel="Add one more Link"
            Elem={LinkListItem}
            initData={LinkInitData}
            name={LinkPath}
            label={"Links"}
          />
          <InfoGetter
            formRegister={form as any}
            addButtonLabel="Add one more mate"
            Elem={TeamListItem as any}
            initData={TeamInitData}
            name={TeamPath}
            label={"Team Mates"}
          />
          <InfoGetter
            formRegister={form as any}
            addButtonLabel="Add one more image"
            Elem={ImageListItem}
            initData={ImageInitData}
            name={ImagePath}
            label={"Images"}
            onDeleteElem={ImageOnDelete}
          />
          <InfoGetter
            formRegister={form as any}
            addButtonLabel="Add one more lesson"
            Elem={LessonListItem}
            initData={LessonInitData}
            name={LessonPath}
            label={"Lessons"}
          />

          <WrapElem label={"Description"}>
            <FinalEditor
              control={control}
              {...register(`${EleName}.${i}.desc`)}
              placeholder="Description about team mate and his role"
            />
          </WrapElem>
        </div>
      </Elem>
    );
  }
) as ListElemType<EleInputData>;

export interface InputData {
  id: string;
  label: string;
  data: EleInputData[];
}
export const InitData: () => InputData = () => ({
  id: uuid(),
  label: "",
  data: [],
});
export const onDelete = async (value: InputData) => {
  await Promise.all(value.data.map(onDeleteElem));
};
export const onDuplicateElem = async (
  value: EleInputData,
  path: string
): Promise<EleInputData> => {
  const newValue = Duplicate(value);
  newValue.images = newValue.images.map((val) =>
    Duplicate({ ...val, image: "" })
  );
  return newValue;
};
type PathType = `${NameType}.data.${number}.data`;
const ProjectElem: ElemType<InputData> = React.forwardRef(
  ({ index: i, props: { form }, ...props }, ref) => {
    const { control, register } = form;
    const path: PathType = `${Name}.data.${i}.data`;

    return (
      <Elem
        headLabel={function G() {
          const { label } = useWatch({
            name: `${Name}.data.${i}`,
            control,
          });
          return (
            <div className="font-bold group-hover:text-blue-60">
              <p className="font-bold group-hover:text-blue-60">
                {label || "(Not Specified)"}
              </p>
            </div>
          );
        }}
        {...props}
        ref={ref}
      >
        <NormalInput
          control={control}
          label="Project Name"
          {...register(`${Name}.data.${i}.label`)}
        />
        <div className="my-4">
          <InfoGetter
            Elem={MiniProjectElem}
            addButtonLabel="Add project"
            initData={EleInitData}
            name={path}
            label="Projects"
            onDeleteElem={onDeleteElem}
            formRegister={form as any}
            onDuplicateElem={onDuplicateElem}
          />
        </div>
      </Elem>
    );
  }
);

export const onDuplicate = async (
  value: InputData,
  path: string
): Promise<InputData> => {
  const MainValue = Duplicate(value);
  MainValue.data = await Promise.all(
    MainValue.data.map(async (value) => {
      const newValue = Duplicate(value);
      newValue.images = await Promise.all(
        newValue.images.map((val) =>
          ImageOnDuplicate(
            val,
            `${path}.${MainValue.id}.data.${value.id}.images`
          )
        )
      );
      return newValue;
    })
  );
  return MainValue;
};
export default ProjectElem;
