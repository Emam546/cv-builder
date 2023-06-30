import { CircularProgress } from "@mui/material";
import { decode } from "@serv/util/jwt";
import UserDB, { User } from "@serv/models/user";
import Section from "@src/components/account/section";
import Grid2Container from "@src/components/common/2GridInputHolder";
import NormalInput from "@src/components/common/inputs/normal";
import Header from "@src/components/header";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { getHeaders } from "@src/utils";
export interface Props {
    firstName: string;
    lastName: string;
    email?: string;
}
export default function UploadAction({ values }: { values: Props }) {
    const { register, handleSubmit, formState, clearErrors } = useForm<Props>({
        values,
    });
    return (
        <Section label={"Account"}>
            <form
                onSubmit={handleSubmit(async (val) => {
                    await axios.post("/api/v1/user/info", val, {
                        headers: getHeaders(),
                    });
                })}
                action=""
                method="post"
            >
                <Grid2Container className="md:gap-x-10 md:gap-y-6">
                    <NormalInput
                        label="First Name"
                        required
                        {...register("firstName", { required: true })}
                    />
                    <NormalInput
                        label="Last Name"
                        required
                        {...register("lastName", { required: true })}
                    />
                    <NormalInput
                        label="Email"
                        type="email"
                        required
                        {...register("email", { required: true })}
                    />
                    <div className="md:pt-10 text-neutral-50 text-sm font-medium">
                        <p className="py-1">
                            Use this email to log in to your Resume.io account
                            and receive notifications.
                        </p>
                    </div>
                </Grid2Container>

                <button
                    className="text-blue-50 hover:text-blue-80 font-medium text-lg mt-6 p-2 block w-fit md:ml-auto"
                    type="submit"
                >
                    {formState.isSubmitting && (
                        <CircularProgress className="max-w-[1.2rem] max-h-[1.2rem]" />
                    )}
                    {formState.isSubmitSuccessful &&
                        !formState.isSubmitting && (
                            <CheckCircleIcon
                                color="success"
                                className="w-4 h-4"
                            />
                        )}

                    <span className="px-2">
                        {formState.isSubmitting ? "Saving" : "Save"}
                    </span>
                </button>
            </form>
        </Section>
    );
}
