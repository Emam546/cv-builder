import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@src/store";
import { assertIsNode } from "@src/utils";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
export default function UserComponent() {
    const user = useAppSelector((state) => {
        if (state.user.isSingIn) {
            return {
                user: state.user.user,
                photo: state.form.info.data.imgUrl,
            };
        }
        return false;
    });
    const [expand, setExpand] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!container.current) return;
        function Listener(ev: MouseEvent) {
            assertIsNode(ev.target);
            const state = container.current!.contains(ev.target);
            if (!state) setExpand(false);
        }
        window.addEventListener("click", Listener);
        return () => {
            window.removeEventListener("click", Listener);
        };
    }, [container.current]);
    if (!user) return null;

    return (
        <>
            <div
                ref={container}
                className="cursor-pointer relative"
            >
                <button
                    className={classNames(
                        "w-10 aspect-square overflow-hidden rounded-[50%] bg-neutral-10 flex items-center justify-center",
                        "hover:border border-blue-60 border-solid",
                        {
                            "hover:border": expand,
                        }
                    )}
                    type="button"
                    onClick={(ev) => {
                        setExpand(!expand);
                    }}
                >
                    {user.photo == "" ? (
                        <>
                            <FontAwesomeIcon
                                size={"1x"}
                                icon={faUser}
                            />
                        </>
                    ) : (
                        <img
                            src={user.photo}
                            alt="User Profile"
                            className="w-full"
                        />
                    )}
                </button>
                <div
                    className={classNames(
                        "absolute min-h-0 bg-white z-[60] shadow-xl rounded-lg transition-[max-height,max-width] overflow-hidden duration-500 top-full right-0",
                        {
                            "max-h-[100rem] max-w-[1000px] opacity-100": expand,
                            "max-h-0 max-w-[6rem] opacity-0": !expand,
                        }
                    )}
                >
                    <ul className={classNames("w-52  p-4 px-5")}>
                        <li className="py-1">Account Settings</li>
                        <li className="py-1">Updates</li>
                        <li className="py-1">FAQ</li>
                        <Link href="/login">
                            <li className="py-1">Log Out</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
}
