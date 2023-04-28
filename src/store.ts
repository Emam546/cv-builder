import { configureStore, createSlice } from "@reduxjs/toolkit";
const FormSlice = createSlice({
    name: "form",
    initialState: {
        percent: 0,
    },
    reducers: {
        setPercent(state, action: { payload: number }) {
            action.payload;
        },
    },
});
export const FormAction = FormSlice.actions;
export const store = configureStore({
    reducer: {
        form: FormSlice.reducer,
    },
});
