import { useUploadData } from "./useUpload";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useEffect } from "react";
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
    const [state, setState, err] = useUploadData();
    useEffect(() => {
        const t = setTimeout(() => {
            if (state) setState(false);
        }, 2000);
        return () => clearTimeout(t);
    }, [state]);
    return (
        <Snackbar
            autoHideDuration={6000}
            open={state}
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
