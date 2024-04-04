import { FormAction } from "./form";
import { StateActions } from "./state";
import { UserData } from "@serv/models/user";
import { AppStore } from ".";

export function setInitialData(cStore: AppStore, data: UserData) {
    cStore.dispatch(FormAction.setAllData(data.sections));

    cStore.dispatch(
        StateActions.setAllData({
            data: data.sectionState,
        })
    );
}
