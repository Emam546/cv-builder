import { Name as LangName } from "@src/components/main/sections/languages";
import { Name as CourseName } from "@src/components/main/sections/courses";
import { Name as InternShipName } from "@src/components/main/sections/internships";
import { Name as ReferenceName } from "@src/components/main/sections/reference";
import { Name as ExtraActivitesName } from "@src/components/main/sections/ExtraActivites";
import { Name as HobbiesName } from "@src/components/main/sections/hobbies";
import { Name as TestimonialsName } from "@src/components/main/sections/tesimonial";
import { Name as YearsResolutionName } from "@src/components/main/sections/yearsResloutions";
import { Dispatch } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faBriefcase,
    faBullhorn,
    faBullseye,
    faFootball,
    faLanguage,
    faPlateWheat,
    faToolbox,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useDispatch } from "react-redux";
import { ActionType, StateActions } from "@src/store/state";
import { useAppSelector } from "@src/store";
import { FormAction } from "@src/store/form";
function Item({
    icon,
    label,
    hiddenState,
    setData,
}: {
    label: string;
    hiddenState?: boolean;
    setData: Dispatch<void>;
    icon: IconProp;
}) {
    return (
        <div
            className={classNames("flex items-center group gap-3 select-none", {
                "cursor-pointer": hiddenState,
            })}
            onClick={() => {
                if (hiddenState) setData();
            }}
        >
            <FontAwesomeIcon
                className={classNames("text-4xl ", {
                    "text-blue-50": !hiddenState,
                    "text-neutral-50": hiddenState,
                })}
                icon={icon}
            />
            <span
                className={classNames(" font-medium text-xl", {
                    "group-hover:text-blue-50": hiddenState,
                    "text-neutral-100": !hiddenState,
                })}
            >
                {label}
            </span>
        </div>
    );
}
export function AddSection({}: {}) {
    const dispatch = useDispatch();
    function dispatchSection(val: ActionType) {
        dispatch(StateActions.setSectionState(val));
    }
    const data = useAppSelector((state) => state.state.data.sections);
    return (
        <div className="py-5">
            <h1 className="text-xl font-bold text-neutral-100 py-3">
                Add Section
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
                <div
                    className={classNames(
                        "flex items-center group gap-3 select-none cursor-pointer"
                    )}
                    onClick={() => {
                        dispatch(FormAction.addSection());
                    }}
                >
                    <FontAwesomeIcon
                        className={classNames("text-4xl text-blue-50")}
                        icon={faToolbox}
                    />
                    <span
                        className={classNames(
                            " font-medium text-xl text-neutral-100"
                        )}
                    >
                        Custom Section
                    </span>
                </div>
                <Item
                    label="Testimonials"
                    hiddenState={data[TestimonialsName].hiddenState}
                    icon={faUsers}
                    setData={() => {
                        dispatchSection({
                            name: TestimonialsName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="Extra-curricular Activities"
                    hiddenState={data[ExtraActivitesName].hiddenState}
                    icon={faPlateWheat}
                    setData={() => {
                        dispatchSection({
                            name: ExtraActivitesName,
                            type: "SHOW",
                        });
                    }}
                />

                <Item
                    label="Hobbies"
                    hiddenState={data[HobbiesName].hiddenState}
                    icon={faFootball}
                    setData={() => {
                        dispatchSection({
                            name: HobbiesName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="References"
                    hiddenState={data[ReferenceName].hiddenState}
                    icon={faBullhorn}
                    setData={() => {
                        dispatchSection({
                            name: ReferenceName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="Courses"
                    hiddenState={data[CourseName].hiddenState}
                    icon={faBook}
                    setData={() => {
                        dispatchSection({
                            name: CourseName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="InternShips"
                    hiddenState={data[InternShipName].hiddenState}
                    icon={faBriefcase}
                    setData={() => {
                        dispatchSection({
                            name: InternShipName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="Year's Resolution"
                    hiddenState={data[YearsResolutionName].hiddenState}
                    icon={faLanguage}
                    setData={() => {
                        dispatchSection({
                            name: YearsResolutionName,
                            type: "SHOW",
                        });
                    }}
                />
                <Item
                    label="Languages"
                    hiddenState={data[YearsResolutionName].hiddenState}
                    icon={faBullseye}
                    setData={() => {
                        dispatchSection({
                            name: YearsResolutionName,
                            type: "SHOW",
                        });
                    }}
                />
            </div>
        </div>
    );
}
