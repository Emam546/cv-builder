import { createSlice } from "@reduxjs/toolkit";
import { defaultSectionState } from "@src/components/main/default";
export type ActionType =
    | {
          type: "SHOW" | "HIDE";
          name: SectionNamesType;
      }
    | {
          type: "ADD";
          id: string;
      }
    | {
          type: "DELETE";
          id: string;
      };
export enum Actions {
    ADD = "Add",
}
export interface StateType {
    data: SectionStateType;
    action: Actions | null;
}
const initialState: StateType = {
    data: defaultSectionState,
    action: null,
};
export const State = createSlice({
    name: "state",
    initialState,
    reducers: {
        setSectionState(state, { payload: action }: { payload: ActionType }) {
            const type = action.type;
            const curOrder = Math.max(
                Object.values(state.data.sections).reduce(
                    (acc, { order: c }) => (acc > c ? acc : c),
                    0
                ),
                state.data.custom.reduce(
                    (acc, { order: c }) => (acc > c ? acc : c),
                    0
                )
            );
            switch (type) {
                case "SHOW":
                    state.data.sections[action.name] = {
                        hiddenState: false,
                        order: curOrder + 1,
                    };
                    break;
                case "HIDE":
                    const obj = state.data.sections[action.name];
                    if (obj) obj.hiddenState = true;
                    else {
                        state.data.sections[action.name] = {
                            hiddenState: true,
                            order: curOrder + 1,
                        };
                    }
                    break;
                case "ADD":
                    state.data.custom.push({
                        order: curOrder + 1,
                        id: action.id,
                    });
                    break;
                case "DELETE":
                    state.data.custom = state.data.custom.filter(
                        (c) => action.id != c.id
                    );
                    break;
                default:
                    throw new Error();
            }
        },
        setAllData(state, action: { payload: typeof initialState }) {
            return action.payload;
        },
        setAction(state, { payload }: { payload: StateType["action"] }) {
            state.action = payload;
        },
    },
});
export const StateActions = State.actions;
