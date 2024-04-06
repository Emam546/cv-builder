import { createSlice } from "@reduxjs/toolkit";

type InitialData = {
    connectionState: boolean;
};
export const PageStateSlice = createSlice({
    name: "page",
    initialState: {
        connectionState: true,
    } as InitialData,
    reducers: {
        setConnectionState(state, action: { payload: boolean }) {
            state.connectionState = action.payload;
        },
    },
});
export const PageActions = PageStateSlice.actions;
