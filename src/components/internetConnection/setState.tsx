import React, { useEffect } from "react";
import { useConnected } from "./hooks";
import { useAppDispatch } from "@src/store";
import { PageActions } from "@src/store/pageState";

function SetConnectionState() {
    const [state] = useConnected();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(PageActions.setConnectionState(state));
    }, [state]);
    return null;
}

export default SetConnectionState;
