import Head from "next/head";
import Login from "@src/components/login";
import Main from "@src/components/main";
import { NextPage } from "next";
import { UserData } from "@serv/models/user";
import wrapper, { useAppSelector } from "@src/store";
import { AddSection } from "@src/components/addSection";
import ShowResult from "@src/components/showResult";
import { MakeItSerializable } from "@src/utils";
import Header from "@src/components/header";
import UploadDataEle from "@src/components/upload";
import LoginModel from "@src/components/loginModel";
import ApiViewer from "@src/components/apiViewer";
import InterFaceCode from "@src/components/showResult/interface";
import { InitServerSide } from "../utils/init";
import ConnectedBar from "@src/components/internetConnection";
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
                <meta
                    name="description"
                    content="Resume API Creator - Simplify resume generation for developers by importing project information. Retrieve project details, including names, descriptions, and technologies used, with ease. Embed your portfolio into websites or applications using the generated API. Showcase your coding skills effortlessly with Resume API Creator."
                />
            </Head>
            <Header />
            <ConnectedBar />
            <div className="container relative px-4 mx-auto">
                <div className="px-1">
                    <Main values={values?.sections}></Main>
                    <ShowResult />
                    <InterFaceCode />
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
        const res = await InitServerSide(store, ctx);
        if (res)
            if (res.data) {
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

        return {
            props: {
                isSigned: false,
            },
        };
    }
);

export default Home;
