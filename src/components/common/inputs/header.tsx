import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import React from "react";
import { useForceUpdate, useSyncRefs } from "@src/utils/hooks";
import { assertIsNode } from "@src/utils";
import { GeneralInputProps } from "./styles";
import { Control, useController } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { ButtonToolTip, Props as ButtonToolTipProps } from "../buttonToolTip";

function CustomButton({
  editable,
  ...props
}: ButtonToolTipProps & { editable: boolean }) {
  return (
    <ButtonToolTip
      type="button"
      {...props}
      className={classNames(
        "hover:text-blue-50  text-neutral-30 group-hover/header:visible p-2 mx-1",
        {
          "lg:invisible": !editable,
        },
        props.className
      )}
    >
      {props.children}
    </ButtonToolTip>
  );
}
export interface Props extends GeneralInputProps<string> {
  reset: Function;
  control: Control<any>;
  setDelete?: Function;
  loading?: boolean;
}

const Header = React.forwardRef<HTMLInputElement, Props>(
  ({ defaultValue, reset, setDelete, control, loading, ...props }, ref) => {
    const [editable, setEditable] = useState(false);
    const input = useRef<HTMLInputElement>(null);
    const containerDiv = useRef<HTMLDivElement>(null);

    const { field } = useController({
      name: props.name || "",
      control: control,
    });
    const textValue = field.value || "";
    useEffect(() => {
      if (!input.current) return;
      function Listener(e: MouseEvent) {
        if (!input.current) return;
        if (!e.target) return;
        assertIsNode(e.target);
        if (!containerDiv.current!.contains(e.target)) {
          setEditable(false);
        }
      }
      window.addEventListener("click", Listener);
      return () => {
        window.removeEventListener("click", Listener);
      };
    }, [input]);
    const allRef = useSyncRefs<HTMLInputElement>(input, ref);

    return (
      <div ref={containerDiv} className="my-3 text-xl leading-8 group/header w-fit">
        <div
          className="self-start inline-block text-neutral-90"
          onClick={() => {
            input.current?.focus();
          }}
        >
          <h2 className={classNames({ hidden: editable }, "font-bold")}>
            {textValue}
          </h2>
          <div
            onClick={() => {
              input.current!.focus();
            }}
            className={classNames(
              "after:invisible p-0 relative after:content-[attr(data-value)] min-w-[5rem] w-fit min-h-[1rem] font-bold h-fit",
              { hidden: !editable }
            )}
            data-value={textValue || "a"}
          >
            <input
              placeholder="Untitled"
              type="text"
              {...props}
              value={textValue}
              ref={allRef}
              className={classNames(
                "focus:outline-none p-0 top-0 left-0 absolute font-bold border-b-2 border-blue-50 border-solid w-full max-w-full",
                props.className
              )}
              onChange={(e) => {
                if (props.onChange) props.onChange(e);
                field.onChange(e.currentTarget.value);
              }}
            />
          </div>
        </div>
        <CustomButton
          editable={editable}
          type="button"
          onClick={(e) => {
            setEditable(true);
            input.current!.focus();
          }}
          aria-label="edit header"
          toolTip="edit"
        >
          <FontAwesomeIcon icon={faPen} />
        </CustomButton>
        {!textValue?.length && (
          <CustomButton
            editable={editable}
            type="button"
            onClick={() => reset()}
            className="font-bold"
            aria-label="reset header"
            toolTip="reset"
          >
            <FontAwesomeIcon icon={faRotateRight} />
          </CustomButton>
        )}
        {setDelete && (
          <CustomButton
            editable={false}
            type="button"
            onClick={() => setDelete()}
            className="font-bold"
            aria-label="delete section"
            toolTip="delete section"
          >
            <FontAwesomeIcon icon={faTrash} />
          </CustomButton>
        )}
        {loading && (
          <span
            className={classNames(
              "hover:text-blue-50 text-neutral-30 group-hover:visible p-2 mx-1"
            )}
          >
            <CircularProgress className="max-w-[1.2rem] max-h-[1.2rem]" />
          </span>
        )}
      </div>
    );
  }
);
const HeaderWrapper = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    if (!props.control) return null;
    return <Header {...props} ref={ref} />;
  }
);
export default HeaderWrapper;
