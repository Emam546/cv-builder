/* eslint-disable quotes */
/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
const config: Config = {
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "./tsconfig.test.json" }],
    },
    roots: ["<rootDir>/"],
    testMatch: ["**/test/**/?(*.)+(spec|test).+(ts|js)"],
    testEnvironment: "node",
    preset: "ts-jest",
    moduleFileExtensions: ["ts", "tsx", "js", "json", "css"],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(
            {
                "@serv/*": ["./server/src/*"],
                "@src/*": ["./src/*"],
            },
            {
                prefix: "<rootDir>/",
            }
        ),
        "\\.(css|less)$": "<rootDir>/jest/__mocks__/styleMock.js",
    },
};
export default config;
