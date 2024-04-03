import { useUploadData } from "./useUpload";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return (
        <MuiAlert
            elevation={6}
            ref={ref}
            variant="filled"
            {...props}
        />
    );
});
export default function UploadDataEle() {
    const [open, setOpen] = useState(false);
    const [state, setState, err] = useUploadData();
    useEffect(() => {
        if (!state) return;
        const t = setTimeout(() => {
            setState(false);
            setOpen(false);
        }, 2000);
        setOpen(true);
        return () => clearTimeout(t);
    }, [state]);
    useEffect(() => {
        if (!err) return;
        const t = setTimeout(() => {
            setOpen(false);
        }, 2000);
        setOpen(true);
        return () => clearTimeout(t);
    }, [err]);
    return (
        <Snackbar
            autoHideDuration={6000}
            open={open}
        >
            <Alert
                severity={err ? "error" : "success"}
                sx={{ width: "100%" }}
                onClose={() => setState(false)}
            >
                {err ? `Error happened:${err}` : `Data uploaded successfully`}
            </Alert>
        </Snackbar>
    );
}
