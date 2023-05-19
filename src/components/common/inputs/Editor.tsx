import React, { useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import {
    ContentState,
    EditorState,
    convertFromHTML,
    convertToRaw,
} from "draft-js";
const Editor = dynamic<EditorProps>(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);

import draftToHtml from "draftjs-to-html";
import { BottomLine } from "./styles";
import {
    Control,
    Controller,
    FieldValues,
    useController,
} from "react-hook-form";

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
        const { field } = useController({
            name,
            control,
            defaultValue,
        });
        const lastState = useRef(field.value);
        useEffect(() => {
            const v = lastState.current;
            if (v != field.value) {
                setEditorState(
                    EditorState.createWithContent(
                        ContentState.createFromBlockArray(
                            convertFromHTML(field.value).contentBlocks
                        )
                    )
                );
                lastState.current = field.value;
            }
        }, [field.name, field.value]);

        return (
            <BottomLine>
                <div className="bg-neutral-10 relative">
                    <Editor
                        editorClassName="min-h-[10rem] px-3"
                        editorState={editorState}
                        onContentStateChange={(content) => {
                            field.onChange(draftToHtml(content));
                            lastState.current = draftToHtml(content);
                        }}
                        onEditorStateChange={(state) => setEditorState(state)}
                        placeholder={placeholder}
                    />
                </div>
            </BottomLine>
        );
    }
);

export default FinalEditor;
