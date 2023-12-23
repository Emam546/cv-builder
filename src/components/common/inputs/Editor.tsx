import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import { ContentState, EditorState, convertFromHTML } from "draft-js";
const Editor = dynamic<EditorProps>(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);

import draftToHtml from "draftjs-to-html";
import { BottomLine } from "./styles";
import { Control, FieldValues, useController } from "react-hook-form";

interface Props {
    name: string;
    control: Control<any>;
    defaultValue?: string;
    placeholder?: string;
}

const FinalEditor = React.forwardRef<HTMLInputElement, Props>(
    ({ defaultValue, name, control, placeholder }, ref) => {
        const { field } = useController({
            name,
            control,
            defaultValue,
        });

        return (
            <BottomLine>
                <div className="bg-neutral-10 relative">
                    <Editor
                        editorClassName="min-h-[10rem] px-3"
                        onContentStateChange={(content) => {
                            field.onChange(draftToHtml(content));
                        }}
                        defaultEditorState={
                            typeof window == "undefined"
                                ? EditorState.createEmpty()
                                : EditorState.createWithContent(
                                      ContentState.createFromBlockArray(
                                          convertFromHTML(field.value)
                                              .contentBlocks
                                      )
                                  )
                        }
                        handlePastedText={() => false}
                        placeholder={placeholder}
                    />
                </div>
            </BottomLine>
        );
    }
);

export default FinalEditor;
