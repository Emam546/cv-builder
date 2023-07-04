import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { FormSlice } from "./form";
import { UserState } from "./user";
import { State } from "./state";
import { LoginModelSlice } from "@src/components/loginModel";
const allReducer = combineReducers({
    [FormSlice.name]: FormSlice.reducer,
    [UserState.name]: UserState.reducer,
    [State.name]: State.reducer,
    [LoginModelSlice.name]: LoginModelSlice.reducer,
});
type StateAction = Parameters<typeof allReducer>[0];
type Actions = Parameters<typeof allReducer>[1];
const reducer = (
    state: StateAction,
    action: Actions | { type: typeof HYDRATE; payload: StateAction }
) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    } else {
        return allReducer(state, action);
    }
};
const makeStore = () => {
    return configureStore({
        reducer: reducer,
    });
};
export type AppStore = ReturnType<typeof makeStore>;
export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default wrapper;
