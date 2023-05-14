import Head from "next/head";
import Login from "@src/components/login";
import Main from "@src/components/main";
import { NextPage } from "next";
import UserDB, { User, UserData } from "@serv/models/user";
import wrapper, { useAppSelector } from "@src/store";
import { setInitialData } from "@src/store/setInitalData";
import { AddSection } from "@src/components/addSection";
import ShowResult from "@src/components/showResult";
import { UserActions } from "@src/store/user";
import { MakeItSerializable } from "@src/utils";
import Header from "@src/components/header";
import { decode } from "@serv/util/jwt";
import UploadDataEle from "@src/components/upload";
import LoginModel from "@src/components/loginModel";
import ApiViewer from "@src/components/apiViewer";
export type SectionsEnabled = {
    [k in keyof UserData]?: boolean;
};

interface Props {
    values?: UserData;
    isSigned: boolean;
}
const Home: NextPage<Props> = function ({ values, isSigned }) {
    const state = useAppSelector((state) => state.user.isSingIn);
    return (
        <>
            <Head>
                <title>Make your Resume api</title>
            </Head>
            <Header />
            <div className="container relative px-4 mx-auto">
                <div className="px-1">
                    <Main values={values?.sections}></Main>
                    <ShowResult />
                    <ApiViewer />
                    {!state && <Login />}
                    <AddSection />
                </div>
            </div>
            <LoginModel />
            <UploadDataEle />
        </>
    );
};
export const getServerSideProps = wrapper.getServerSideProps<Props>(
    (store) => async (ctx) => {
        if (ctx.req.cookies.token) {
            try {
                const user = decode<User>(ctx.req.cookies.token);
                if (typeof user == "string")
                    throw new Error("Unexpected Value");
                const res = await UserDB.findById(user._id);
                if (!res)
                    return {
                        props: {
                            isSigned: false,
                        },
                    };
                store.dispatch(
                    UserActions.setSingInState({
                        isSingIn: true,
                        user: MakeItSerializable(res),
                    })
                );
                if (res.data) {
                    setInitialData(store, res.data);
                    return {
                        props: {
                            values: MakeItSerializable(res).data,
                            isSigned: true,
                        },
                    };
                } else {
                    return {
                        props: {
                            isSigned: true,
                        },
                    };
                }
            } catch (err) {}
        }

        return {
            props: {
                isSigned: false,
            },
        };
    }
);

export default Home;
