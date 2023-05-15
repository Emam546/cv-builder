import {
    faTrashCan,
    faChevronUp,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForceUpdate, useSyncRefs } from "@src/utils/hooks";
import classNames from "classnames";
import { useState, useEffect, useRef } from "react";
import DraggableComp from "../../../common/drag";
import React from "react";
import { PrimaryProps } from "./EleGen";

export interface DraggableItem extends PrimaryProps {
    children: React.ReactNode;
    headLabel: () => React.ReactNode;
}
export const Elem = React.forwardRef<HTMLDivElement, DraggableItem>(
    (
        {
            deleteSelf,
            onDragOver,
            onDrag,
            onDragStart,
            headLabel,
            children,
            noDragging,
        },
        ref
    ) => {
        const [expand, setExpand] = useState(false);
        const [drag, setDrag] = useState(false);
        const parentDiv = useRef<HTMLDivElement>(null);
        const allRefs = useSyncRefs(parentDiv, ref);
        return (
            <div
                ref={allRefs}
                className={classNames(
                    "border rounded-lg border-solid border-neutral-20 py-1 transition-[height]",
                    {
                        "fixed z-50 bg-neutral-5": drag,
                        static: !drag,
                    }
                )}
            >
                <div className="px-3 group relative cursor-pointer flex items-center justify-between h-16">
                    {!noDragging && (
                        <DraggableComp
                            onDragStart={() => {
                                setDrag(true);
                                if (onDragStart && parentDiv.current)
                                    onDragStart(parentDiv.current);
                            }}
                            onDragOver={() => {
                                setDrag(false);
                                if (onDragOver && parentDiv.current)
                                    onDragOver(parentDiv.current);
                            }}
                            onDrag={function (ev) {
                                if (onDrag && parentDiv.current)
                                    onDrag.call(parentDiv.current, ev);
                            }}
                            parentDiv={parentDiv.current}
                        />
                    )}

                    <div
                        className="flex-grow min-w-max self-stretch flex items-center"
                        onClick={() => setExpand(!expand)}
                    >
                        <div>{headLabel()}</div>
                    </div>
                    <div className="space-x-3">
                        <button
                            type="button"
                            className="group-hover:text-blue-60"
                            onClick={() => {
                                if (parentDiv.current)
                                    deleteSelf.call(parentDiv.current);
                            }}
                        >
                            <FontAwesomeIcon
                                fontSize={"1em"}
                                icon={faTrashCan}
                            />
                        </button>
                        <button
                            type="button"
                            className="group-hover:text-blue-60"
                            onClick={() => setExpand(!expand)}
                        >
                            <FontAwesomeIcon
                                fontSize={"1em"}
                                icon={expand ? faChevronUp : faChevronDown}
                            />
                        </button>
                    </div>
                </div>

                <div
                    className={classNames(
                        "transition-[max-height] duration-300 px-3",
                        {
                            "max-h-[10000px]": expand && !drag,
                            "max-h-0 overflow-hidden": !expand || drag,
                        }
                    )}
                >
                    {children}
                </div>
            </div>
        );
    }
);
