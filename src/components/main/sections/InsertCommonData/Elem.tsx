import {
    faTrashCan,
    faChevronUp,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForceUpdate, useSyncRefs } from "@src/utils/hooks";
import classNames from "classnames";
import { useState, useEffect, useRef } from "react";
import DraggableComp from "@src/components/common/drag";
import React from "react";
import { PrimaryProps } from "./EleGen";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { CircularProgress } from "@mui/material";
import { ButtonToolTip } from "@src/components/common/buttonToolTip";

export interface DraggableItem extends PrimaryProps {
    children: React.ReactNode;
    headLabel: () => React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
}
export const Elem = React.forwardRef<HTMLDivElement, DraggableItem>(
    (
        {
            onDelete: deleteSelf,
            onDragOver,
            onDrag,
            onDragStart,
            headLabel,
            children,
            noDragging,
            onDuplicate: duplicate,
            disabled,
            loading,
        },
        ref
    ) => {
        const [expand, setExpand] = useState(false);
        const [drag, setDrag] = useState(false);
        const [parentDiv, setParentDiv] = useState<HTMLDivElement | null>(null);
        const allRefs = useSyncRefs(setParentDiv, ref);
        const containerRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            setExpand(false);
        }, [loading]);
        useEffect(() => {
            if (!containerRef.current) return;
            if (drag)
                containerRef.current.style.height = `${parentDiv?.clientHeight}px`;
            else containerRef.current.style.height = `fit-content`;
        }, [drag]);
        return (
            <div
                ref={containerRef}
                className={classNames({
                    "border-2 border-dashed border-black/30 rounded-lg": drag,
                })}
            >
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
                                    if (onDragStart && parentDiv)
                                        onDragStart(parentDiv);
                                }}
                                onDragOver={() => {
                                    setDrag(false);
                                    if (onDragOver && parentDiv)
                                        onDragOver(parentDiv);
                                }}
                                onDrag={function (ev) {
                                    if (onDrag && parentDiv)
                                        onDrag.call(parentDiv, ev);
                                }}
                                parentDiv={parentDiv}
                            />
                        )}

                        <div
                            className="flex-grow min-w-max self-stretch flex items-center"
                            onClick={() => setExpand(!expand)}
                        >
                            <div>{headLabel()}</div>
                        </div>
                        <div className="flex items-center gap-x-3 select-none">
                            {loading && (
                                <span aria-label="delete">
                                    <CircularProgress className="max-w-[1.2rem] max-h-[1.2rem]" />
                                </span>
                            )}
                            {duplicate && (
                                <ButtonToolTip
                                    type="button"
                                    className="enabled:group-hover:text-blue-60 disabled:text-neutral-60"
                                    onClick={() => {
                                        if (parentDiv)
                                            duplicate.call(parentDiv);
                                    }}
                                    aria-label="duplicate"
                                    disabled={disabled}
                                    toolTip="Duplicate"
                                >
                                    <FontAwesomeIcon icon={faClone} />
                                </ButtonToolTip>
                            )}

                            {deleteSelf && (
                                <ButtonToolTip
                                    type="button"
                                    className="enabled:group-hover:text-blue-60 disabled:text-neutral-60"
                                    onClick={() => {
                                        if (parentDiv)
                                            deleteSelf.call(parentDiv);
                                        setExpand(false);
                                    }}
                                    aria-label="delete"
                                    toolTip="Delete"
                                    disabled={disabled}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </ButtonToolTip>
                            )}

                            <button
                                type="button"
                                className="group-hover:text-blue-60"
                                onClick={() => setExpand(!expand)}
                                aria-label={expand ? "expand" : "close"}
                                disabled={disabled}
                            >
                                <FontAwesomeIcon
                                    icon={expand ? faChevronUp : faChevronDown}
                                />
                            </button>
                        </div>
                    </div>

                    <div
                        className={classNames(
                            "transition-[max-height] duration-300 px-3",
                            {
                                "max-h-[100000rem]": expand && !drag,
                                "max-h-0 overflow-hidden": !expand || drag,
                            }
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
);
