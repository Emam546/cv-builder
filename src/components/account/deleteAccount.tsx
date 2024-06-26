import React, { useState } from "react";
import Section from "./section";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppSelector } from "@src/store";
import { DeleteAllData } from "@src/utils/deleteAllData";
import DeleteAlert from "@src/components/common/deleteAlert";
function DeleteDialog() {
    const [open, setOpen] = useState(false);
    const [submitting, setSubmit] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [err, setErr] = useState<string>();
    const state = useAppSelector((state) => state.form);
    const route = useRouter();
    const Delete = () => {
        setSubmit(true);
        DeleteAllData(state)
            .then(() => {
                axios
                    .delete("/api/v1/user/delete")
                    .then(() => {
                        route.push(`/login`).then(() => {
                            setSubmit(false);
                            setOpen(false);
                        });
                    })
                    .catch((err) => {
                        setSubmit(false);
                        setOpen(false);
                        setErr(err.message);
                    });
            })
            .catch((err) => {
                setSubmit(false);
                setOpen(false);
                setErr(err.message);
            });
    };

    return (
        <div>
            <button
                onClick={handleClickOpen}
                className="text-red-600 w-fit active:text-red-700"
            >
                Delete Account
            </button>

            <Dialog
                open={open}
                onClose={Delete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete your account?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once you click delete, your account and associated data
                        will be permanently deleted and cannot be restored.
                        Alternatively if you keep your free account, the next
                        time you want to edit or update your resume you won{"'"}
                        t have to start from scratch.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className="w-full px-4 pb-3 flex gap-x-5 justify-center md:justify-end">
                        <Button
                            onClick={Delete}
                            color="error"
                            variant="outlined"
                            disabled={submitting}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => setOpen(false)}
                            variant="contained"
                            className="bg-blue-600"
                        >
                            Keep My Account
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
            <DeleteAlert
                open={err != undefined}
                message={err || ""}
                setClose={function () {
                    setErr(undefined);
                }}
                undo={function () {
                    throw new Error("Function not implemented.");
                }}
                error
            />
        </div>
    );
}
export default function DeleteAccount() {
    return (
        <Section label="DANGER ZONE">
            <div className="flex justify-between items-stretch md:items-center gap-y-2 flex-col md:flex-row">
                <p className="text-neutral-50">
                    Once you delete your account, it cannot be undone. This is
                    permanent.
                </p>
                <DeleteDialog />
            </div>
        </Section>
    );
}
