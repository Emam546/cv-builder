import { convertSection2Data } from "../main/utils";
import { useAppSelector } from "@src/store";
import ShowResultElem from "./elem";
export default function ShowResult() {
    const [res, data] = useAppSelector((state) => [
        state.form,
        state.state.data,
    ]);
    const obj = convertSection2Data(res, data);
    const string = JSON.stringify(obj, null, 2);
    return (
        <ShowResultElem string={string}>
            <pre
                id="jsonViewer"
                className="whitespace-pre-wrap"
            >
                {string}
            </pre>
        </ShowResultElem>
    );
}
