import { useAppSelector } from "@src/store";
import { assertIsNode } from "@src/utils";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import UserComponent from "./user";

export default function Header() {
    const [expand, setExpand] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const isSign = useAppSelector((state) => state.user.isSingIn);
    useEffect(() => {
        if (!headerRef.current) return;
        function Listen(ev: MouseEvent) {
            assertIsNode(ev.target);
            const state = !headerRef.current!.contains(ev.target);
            if (state) setExpand(false);
        }
        window.addEventListener("click", Listen);
        return () => {
            window.removeEventListener("click", Listen);
        };
    }, [headerRef.current]);
    return (
        <header ref={headerRef}>
            <nav className="bg-white container mx-auto border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="relative flex flex-wrap justify-between items-center">
                    <Link
                        href="/"
                        className="flex items-center"
                    >
                        <img
                            src="./logo.png"
                            className="mr-3 h-7 sm:h-9 aspect-square"
                            alt="ResumeMaker Logo"
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap">
                            Resume Api
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/about"
                            className="block py-2 px-2 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-header-700 lg:p-0"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="block py-2 px-2 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-header-700 lg:p-0 "
                        >
                            Contact
                        </Link>
                        {!isSign && (
                            <Link
                                href="/login"
                                className={classNames(
                                    "text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                                )}
                            >
                                Log in
                            </Link>
                        )}
                        <UserComponent />
                    </div>
                </div>
            </nav>
        </header>
    );
}
