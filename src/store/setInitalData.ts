import { FormAction } from "./form";
import { StateActions } from "./state";
import { UserData } from "@serv/models/user";
import { AppStore } from ".";

export function setInitialData(cStore: AppStore, data: UserData) {
    cStore.dispatch(FormAction.setAllData(data.sections));
    const curOrder = Math.max(
        Object.values(data.sectionState.sections).reduce(
            (acc, { order: c }) => (acc > c ? acc : c),
            0
        ),
        data.sectionState.custom.reduce(
            (acc, { order: c }) => (acc > c ? acc : c),
            0
        )
    );
    cStore.dispatch(
        StateActions.setAllData({
            curOrder,
            data: data.sectionState,
        })
    );
}
