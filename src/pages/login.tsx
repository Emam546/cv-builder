import Login from "@src/components/login";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import cookies from "js-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "@src/store";
import { UserActions } from "@src/store/user";
interface Props {}
const Page: NextPage<Props> = function ({}) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        cookies.remove("token");
        dispatch(
            UserActions.setSingInState({
                isSingIn: false,
            })
        );
    }, []);
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className="px-4  flex items-center w-full min-h-screen">
                <div className="container w-full mx-auto">
                    <div>
                        <Login />
                    </div>
                </div>
            </div>
        </>
    );
};
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    if (ctx.req.cookies.token) {
        ctx.res.setHeader("Set-Cookie", "token=; Path=/; HttpOnly; Max-Age=0");
    }

    return {
        props: {},
    };
};

export default Page;
