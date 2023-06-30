import { createSlice } from "@reduxjs/toolkit";
import { User } from "@serv/models/user";
type InitialData =
    | {
          isSingIn: false;
      }
    | {
          isSingIn: true;
          user: User;
      };
export const UserState = createSlice({
    name: "user",
    initialState: {
        isSingIn: false,
    } as InitialData,
    reducers: {
        setSingInState(state, action: { payload: InitialData }) {
            return action.payload;
        },
    },
});
export const UserActions = UserState.actions;
