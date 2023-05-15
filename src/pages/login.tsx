import Login from "@src/components/login";
import Head from "next/head";
import cookies from "js-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "@src/store";
import { UserActions } from "@src/store/user";

const Page = function ({}) {
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

export default Page;
