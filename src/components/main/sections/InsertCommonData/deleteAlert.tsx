import { Snackbar, Button } from "@mui/material";
import { Alert } from "@mui/material";
import { useDebounceEffect } from "@src/utils/hooks";
import React, { useEffect } from "react";
export interface Props {
    open: boolean;
    setClose: () => any;
    undo: () => any;
    deps?: any[];
}
export default function DeleteAlert({
    open,
    setClose,
    undo,
    deps = [],
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
                severity="info"
                action={
                    <Button
                        color="inherit"
                        size="small"
                        onClick={undo}
                    >
                        UNDO
                    </Button>
                }
            >
                Element successfully deleted
            </Alert>
        </Snackbar>
    );
}
