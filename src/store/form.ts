import { createSlice } from "@reduxjs/toolkit";
import { defaultData } from "@src/components/main/default";
import { SectionInitData } from "@src/components/main/sections/CustomSection/types";
const initialState = { ...defaultData };
export const FormSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setData(state, action: { payload: Data }) {
            return action.payload;
            // return { ...state, sections: action.payload };
        },
        setAllData(state, action: { payload: Data }) {
            return { ...action.payload };
        },
    },
});
export const FormAction = FormSlice.actions;
