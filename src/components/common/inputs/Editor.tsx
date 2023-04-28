/* eslint-disable react/display-name */
import React, { InputHTMLAttributes } from "react";
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
import { BottomLine } from "./styles";
type Props = {
    innerRef: React.RefObject<HTMLInputElement>;
    defaultValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;
function Component({ defaultValue, innerRef, ...props }: Props) {
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
                    ref={innerRef}
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
const FinalEditor = React.forwardRef<
    HTMLInputElement,
    Pick<Props, Exclude<keyof Props, "innerRef">>
>((props, ref) => (
    <Component
        {...props}
        innerRef={ref as any}
    />
));
export default FinalEditor;
