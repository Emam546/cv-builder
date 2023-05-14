import React from "react";
import Grid2Container from "../common/2GridInputHolder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    IconDefinition,
    faFacebookF,
    faGoogle,
    faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import { useAppSelector } from "@src/store";
// import queryString from "query-string";
// const queryString = require("query-string");
// const stringifiedParams = queryString.stringify({
//     client_id: process.env.FaceBook_APP_ID,
//     redirect_uri: "/",
//     scope: ["email", "user_friends"].join(","),
//     response_type: "code",
//     auth_type: "rerequest",
//     display: "popup",
// });

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon: IconDefinition;
}
function StyledButton({ icon, label, ...props }: Props) {
    return (
        <button
            {...props}
            type="button"
            className={classNames(
                props.className,
                "w-52 max-w-full py-2 px-7 text-lg text-start flex items-center"
            )}
        >
            <div>
                <FontAwesomeIcon
                    icon={icon}
                    className="font-bold"
                />
                <span className="ml-8 font-bold">{label}</span>
            </div>
        </button>
    );
}

// const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
export default function Login() {
    return (
        <div className="py-8">
            <div className="text-center mb-5">
                <h1 className="mb-2 mt-0 text-4xl font-bold leading-tight text-neutral-100">
                    Log In
                </h1>
                <p>We are happy to see you back!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7  gap-y-4 transition-[width] duration-700">
                <StyledButton
                    className="bg-blue-60 text-white mx-auto sm:mr-0"
                    icon={faFacebookF}
                    label="Facebook"
                    onClick={() => {
                        window.location.href = "/api/v1/auth/facebook";
                    }}
                />
                <StyledButton
                    className="bg-red-60 text-white mx-auto sm:ml-0"
                    icon={faGoogle}
                    label="Google"
                />
                <StyledButton
                    className="bg-blue-70 text-white mx-auto sm:mr-0"
                    icon={faLinkedinIn}
                    label="LinkedIn"
                />
                <StyledButton
                    className="bg-white text-blue-60 border border-solid border-blue-60 mx-auto sm:ml-0"
                    icon={faEnvelope}
                    label="Email"
                />
            </div>
        </div>
    );
}
