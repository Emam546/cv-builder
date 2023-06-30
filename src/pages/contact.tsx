import { decode } from "@serv/util/jwt";
import UserDB, { User } from "@serv/models/user";
import { wrapper } from "@src/store";
import { UserActions } from "@src/store/user";
import { MakeItSerializable } from "@src/utils";
import { setInitialData } from "@src/store/setInitalData";
import Header from "@src/components/header";
import NormalInput from "@src/components/common/inputs/normal";
import TextArea from "@src/components/common/textArea";
import { useForm } from "react-hook-form";
import { LabelElem } from "@src/components/common/inputs/styles";
import { Alert, Button, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
interface Props {}
interface PropsForm {
    subject: string;
    email: string;
    message: string;
}
export default function Contact() {
    const { register, handleSubmit, formState } = useForm<PropsForm>();
    const [sent, setSent] = useState(false);
    useEffect(() => {
        if (!sent) return;
        const t = setTimeout(() => {
            setSent(false);
        }, 4000);
        return () => clearTimeout(t);
    }, [sent]);
    return (
        <>
            <Header />
            <div className="bg-neutral-10 min-h-screen">
                <div className="container py-10 px-3  mx-auto">
                    <div className="px-24">
                        <h1 className="text-6xl mb-5 font-extrabold text-blue-50">
                            Contact Us
                        </h1>
                        <p className="text-2xl">
                            Have comments, questions, or feedback to share? Our
                            team would love to hear from you. Give us a call or
                            submit a message below.
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit(async (val) => {
                            await axios.post(
                                "https://api.web3forms.com/submit",
                                {
                                    ...val,
                                    access_key:
                                        "fe494db3-1f8e-471d-920f-a4b7929fe760",
                                }
                            );
                            setSent(true);
                        })}
                        className="bg-white p-12 mt-10"
                    >
                        <h2 className="font-medium text-3xl">Select a topic</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-4">
                            <div className="space-y-6">
                                <NormalInput
                                    label="Email"
                                    type="email"
                                    required
                                    {...register("message", { required: true })}
                                />
                                <NormalInput
                                    label="Subject"
                                    {...register("subject", { required: true })}
                                />
                            </div>
                            <div>
                                <LabelElem label="Message">
                                    <TextArea
                                        {...register("message", {
                                            required: true,
                                        })}
                                        required
                                    />
                                </LabelElem>
                            </div>
                        </div>
                        <div className="flex gap-x-4 gap-y-4 mt-3 flex-col md:flex-row">
                            <p className="flex-1 text-center md:text-left">
                                This site is protected by reCAPTCHA and the
                                GooglePrivacy PolicyandTerms of Serviceapply.
                            </p>
                            <button
                                className="flex-shrink-0 bg-blue-50 hover:bg-blue-60 disabled:bg-blue-70 active:bg-blue-70 text-lg text-neutral-5 px-5 py-4 rounded font-bold"
                                type="submit"
                                disabled={formState.isSubmitting}
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Snackbar
                autoHideDuration={6000}
                open={sent}
            >
                <Alert
                    variant="filled"
                    severity="success"
                    onClose={() => setSent(false)}
                >
                    Message sent successfully
                </Alert>
            </Snackbar>
        </>
    );
}
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
                    props: {},
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
