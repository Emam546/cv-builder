import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "@src/store";
import React from "react";
import Login from "../login";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
export const LoginModelSlice = createSlice({
    initialState: false,
    name: "loginModel",
    reducers: {
        open(state, action: { payload: undefined }) {
            return true;
        },
        close(state, action: { payload: undefined }) {
            return false;
        },
        trigger(state, action: { payload: undefined }) {
            return !state;
        },
    },
});
export const LoginModelActions = LoginModelSlice.actions;
export default function LoginModel() {
    const state = useAppSelector((state) => state.loginModel);
    const dispatch = useDispatch();
    if (!state) return null;
    return (
        <div className="fixed top-0 left-0 z-[60] w-full bg-neutral-10/80 h-screen flex items-center justify-center px-4">
            <div className="relative bg-white w-[40rem] py-20 flex items-center justify-center">
                <div className="absolute right-0 top-0 p-4 z-50">
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(LoginModelActions.close());
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-3xl transition-all duration-300 text-neutral-100 hover:text-neutral-50"
                        />
                    </button>
                </div>
                <div className="">
                    <Login />
                </div>
            </div>
        </div>
    );
}
