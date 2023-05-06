import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Data } from "@src/components/main/type";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
const FormSlice = createSlice({
    name: "form",
    initialState: {
        data: {} as Data,
    },
    reducers: {
        setData(state, action: { payload: Data }) {
            state.data = action.payload;
        },
    },
});
export const FormAction = FormSlice.actions;
export const store = configureStore({
    reducer: {
        form: FormSlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
