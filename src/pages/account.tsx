import { decode } from "@serv/util/jwt";
import UserDB, { User, UserTokenInfo } from "@serv/models/user";
import Header from "@src/components/header";
import { NextPage } from "next";
import Head from "next/head";
import UploadAction, {
    Props as UserInfoProps,
} from "@src/components/account/uploadSection";
import EmailNotification from "@src/components/account/emailnotifications";
import DeleteAccount from "@src/components/account/deleteAccount";
import { wrapper } from "@src/store";
import { UserActions } from "@src/store/user";
import { MakeItSerializable } from "@src/utils";
import { setInitialData } from "@src/store/setInitalData";
import { ExtractJwt } from "passport-jwt";
import { MixedExtract } from "../../server/src/passport.config";

interface Props {
    values: UserInfoProps;
}
const Page: NextPage<Props> = ({ values }) => {
    return (
        <>
            <Head>
                <title>Make your Resume api</title>
                <meta
                    name="description"
                    content="Resume API Creator - Simplify resume generation for developers by importing project information. Retrieve project details, including names, descriptions, and technologies used, with ease. Embed your portfolio into websites or applications using the generated API. Showcase your coding skills effortlessly with Resume API Creator."
                />
            </Head>
            <Header />
            <div className="bg-neutral-10 min-h-screen">
                <div className="container relative px-3 mx-auto py-20 ">
                    <h1 className="text-3xl font-bold mx-12 mb-6">
                        Account Settings
                    </h1>
                    <UploadAction values={values} />
                    <div className="mt-16">
                        <EmailNotification />
                    </div>
                    <div className="mt-16">
                        <DeleteAccount />
                    </div>
                </div>
            </div>
        </>
    );
};
export const getServerSideProps = wrapper.getServerSideProps<Props>(
    (store) => async (ctx) => {
        const token = MixedExtract()(ctx.req as any);
        if (token) {
            try {
                const user = decode<UserTokenInfo>(token);
                if (typeof user == "string")
                    throw new Error("Unexpected Value");
                const res = await UserDB.findById(user._id);
                if (!res)
                    return {
                        redirect: {
                            destination: "/",
                            permanent: true,
                        },
                    };
                store.dispatch(
                    UserActions.setSingInState({
                        isSingIn: true,
                        user: MakeItSerializable(res),
                    })
                );
                if (res.data) setInitialData(store, res.data);
                return {
                    props: {
                        values: {
                            email: res?.email || "",
                            firstName: res.firstName,
                            lastName: res.lastName,
                        },
                    },
                };
            } catch (err) {}
        }

        return {
            redirect: {
                destination: "/",
                permanent: true,
            },
        };
    }
);
export default Page;
