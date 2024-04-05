import { UserTokenInfo } from "@serv/models/user";
import { MixedExtract } from "@serv/passport.config/utils";
import { getUserEssentialData } from "@serv/util/user";
import { AppStore } from "@src/store";
import { setInitialData } from "@src/store/setInitalData";
import { UserActions } from "@src/store/user";
import { MakeItSerializable } from "@src/utils";
import { decode } from "@serv/util/jwt";
import UserDB from "@serv/models/user";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
export async function InitServerSide(
    store: AppStore,
    ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
    const token = MixedExtract()(ctx.req as any);

    if (token) {
        const user = decode<UserTokenInfo>(token);
        if (typeof user == "string") throw new Error("Unexpected Value");
        const res = await UserDB.findById(user._id);
        if (!res) return null;
        store.dispatch(
            UserActions.setSingInState({
                isSingIn: true,
                user: MakeItSerializable(
                    getUserEssentialData(res, res._id.toString())
                ),
            })
        );
        if (res.data) setInitialData(store, res.data);
        return res;
    }
    return null;
}
