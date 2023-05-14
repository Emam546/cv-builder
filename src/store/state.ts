import { createSlice } from "@reduxjs/toolkit";
import { defaultSectionState } from "@src/components/main/default";
import { HYDRATE } from "next-redux-wrapper";
export type ActionType =
    | {
          type: "SHOW" | "HIDE";
          name: SectionNamesType;
      }
    | {
          type: "ADD";
      }
    | {
          type: "DELETE";
          index: number;
      };

export interface StateType {
    data: SectionStateType;
    curOrder: number;
}
const initialState = {
    data: defaultSectionState,
    curOrder: 7,
};
export const State = createSlice({
    name: "state",
    initialState,
    reducers: {
        setSectionState(state, { payload: action }: { payload: ActionType }) {
            const type = action.type;
            switch (type) {
                case "SHOW":
                    state.curOrder++;
                    state.data.sections[action.name] = {
                        hiddenState: false,
                        order: state.curOrder,
                    };
                    break;
                case "HIDE":
                    state.data.sections[action.name].hiddenState = true;
                    break;
                case "ADD":
                    state.curOrder++;
                    state.data.custom.push({ order: state.curOrder });
                    break;
                case "DELETE":
                    state.data.custom.filter((_, i) => i != action.index);
                    break;
                default:
                    throw new Error();
            }
        },
        setAllData(state, action: { payload: typeof initialState }) {
            return action.payload;
        },
    },
});
export const StateActions = State.actions;
