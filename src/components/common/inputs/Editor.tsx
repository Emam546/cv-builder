/* eslint-disable react/display-name */
import React, { Dispatch, useEffect } from "react";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import {
    ContentState,
    EditorState,
    convertToRaw,
    convertFromHTML,
} from "draft-js";
const Editor = dynamic<EditorProps>(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { BottomLine, GeneralInputProps } from "./styles";
interface Props extends GeneralInputProps<string> {
    defaultValue?: string;
    setValue: Dispatch<string>;
}
const FinalEditor = React.forwardRef<HTMLInputElement, Props>(
    ({ defaultValue, setValue, ...props }, ref) => {
        const [editorState, setEditorState] = React.useState(() => {
            if (defaultValue) {
                return EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(defaultValue).contentBlocks
                    )
                );
            }
            return EditorState.createEmpty();
        });
        useEffect(() => {
            setValue(
                draftToHtml(convertToRaw(editorState.getCurrentContent()))
            );
        }, [editorState]);
        return (
            <BottomLine>
                <div className="bg-neutral-10 relative">
                    <Editor
                        editorClassName="min-h-[10rem] px-3"
                        editorState={editorState}
                        onEditorStateChange={(editorState) =>
                            setEditorState(editorState)
                        }
                        placeholder={props.placeholder}
                    />
                    <input
                        type="text"
                        className="appearance-none invisible"
                        ref={ref}
                        value={draftToHtml(
                            convertToRaw(editorState.getCurrentContent())
                        )}
                        {...props}
                        defaultValue={defaultValue}
                    />
                </div>
            </BottomLine>
        );
    }
);
export default FinalEditor;
