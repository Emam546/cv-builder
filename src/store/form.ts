import { createSlice } from "@reduxjs/toolkit";
import { defaultData } from "@src/components/main/default";
const initialState = { ...defaultData };
export const FormSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setData(state, action: { payload: Data }) {
            return action.payload;
            // return { ...state, sections: action.payload };
        },
        addSection(state, action: { payload: undefined }) {
            state.custom.push({
                data: [],
                head: "Untitled",
            });
        },
        setAllData(state, action: { payload: Data }) {
            return { ...action.payload };
        },
    },
});
export const FormAction = FormSlice.actions;
