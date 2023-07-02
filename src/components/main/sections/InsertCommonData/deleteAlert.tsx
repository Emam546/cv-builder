import { Snackbar, Button, CircularProgress } from "@mui/material";
import { Alert } from "@mui/material";
import { useDebounceEffect } from "@src/utils/hooks";
import React, { useEffect } from "react";
export interface Props {
    open: boolean;
    setClose: () => any;
    undo: () => any;
    deps?: any[];
    error?: string;
    loading: boolean;
}
export default function DeleteAlert({
    open,
    setClose,
    undo,
    deps = [],
    error,
    loading,
}: Props) {
    useDebounceEffect(
        () => {
            if (open) setClose();
        },
        4000,
        [open, ...deps]
    );
    return (
        <Snackbar
            autoHideDuration={6000}
            open={open}
        >
            <Alert
                variant="filled"
                severity={error ? "error" : "info"}
                action={
                    !error ? (
                        <Button
                            color="inherit"
                            size="small"
                            onClick={undo}
                        >
                            UNDO
                        </Button>
                    ) : undefined
                }
                onClose={error ? setClose : undefined}
            >
                {error
                    ? `Error happened:${error}`
                    : "Element successfully deleted"}
                {loading && (
                    <CircularProgress className="max-w-[1.2rem] max-h-[1.2rem]" />
                )}
            </Alert>
        </Snackbar>
    );
}
