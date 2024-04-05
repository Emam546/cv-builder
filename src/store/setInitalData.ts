import { FormAction } from "./form";
import { StateActions } from "./state";
import { UserData } from "@serv/models/user";
import { AppStore } from ".";
import { defaultSectionState } from "@src/components/main/default";

export function setInitialData(cStore: AppStore, data: UserData) {
    cStore.dispatch(FormAction.setAllData(data.sections));

    cStore.dispatch(
        StateActions.setAllData({
            data: {
                custom: data.sectionState.custom,
                sections: {
                    ...defaultSectionState,
                    ...data.sectionState.sections,
                },
            },
            action: null,
        })
    );
}
