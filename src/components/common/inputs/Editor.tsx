/* eslint-disable react/display-name */
import React, { Dispatch, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import {
    ContentState,
    EditorState,
    convertFromHTML,
    convertFromRaw,
    convertToRaw,
} from "draft-js";
const Editor = dynamic<EditorProps>(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { BottomLine, GeneralInputProps } from "./styles";
import { useSyncRefs } from "@src/utils/hooks";
import { Control, Controller, FieldValues } from "react-hook-form";

interface Props {
    name: string;
    control: Control<FieldValues>;
    defaultValue?: string;
    placeholder?: string;
}
function checkIfValueIsConvertible(val: unknown): val is string {
    try {
        if (val && typeof val == "string") {
            convertFromHTML(val);
            return true;
        }
    } catch (err) {}
    return false;
}

const FinalEditor = React.forwardRef<HTMLInputElement, Props>(
    ({ defaultValue, name, control, placeholder }, ref) => {
        const [editorState, setEditorState] = React.useState(() => {
            if (checkIfValueIsConvertible(defaultValue)) {
                return EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(defaultValue).contentBlocks
                    )
                );
            }
            return EditorState.createEmpty();
        });
        return (
            <BottomLine>
                <div className="bg-neutral-10 relative">
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={defaultValue}
                        shouldUnregister
                        render={function Data({ field, fieldState }) {
                            useEffect(() => {
                                const cVal = draftToHtml(
                                    convertToRaw(
                                        editorState.getCurrentContent()
                                    )
                                );
                                if (
                                    field.value != cVal &&
                                    checkIfValueIsConvertible(field.value)
                                ) {
                                    setEditorState(
                                        EditorState.createWithContent(
                                            ContentState.createFromBlockArray(
                                                convertFromHTML(field.value)
                                                    .contentBlocks
                                            )
                                        )
                                    );
                                }
                            }, [field.value]);
                            return (
                                <Editor
                                    editorClassName="min-h-[10rem] px-3"
                                    editorState={editorState}
                                    onContentStateChange={(content) => {
                                        field.onChange(draftToHtml(content));
                                    }}
                                    onEditorStateChange={(editorState) => {
                                        setEditorState(editorState);
                                    }}
                                    placeholder={placeholder}
                                />
                            );
                        }}
                    ></Controller>
                </div>
            </BottomLine>
        );
    }
);

export default FinalEditor;
