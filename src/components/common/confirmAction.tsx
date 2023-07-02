import React, { useMemo, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";

export interface Props {
    title?: string;
    content?: string;
    keepText?: string;
    deleteText?: string;
}
interface FuncG {
    accept: () => Promise<any>;
    deny: () => Promise<any>;
}
export interface Func {
    accept: (cb: FuncG["accept"]) => any;
    deny: (cb: FuncG["deny"]) => any;
}

export function useDeleteDialog({
    title,
    content,
    keepText = "Keep",
    deleteText = "Delete",
}: Props): [() => JSX.Element, Func] {
    const last = useRef<FuncG>({
        async accept() {},
        async deny() {},
    });
    const [open, setOpen] = useState(false);

    const resDialog = useMemo(() => {
        return function G() {
            const [submitting, setSubmitting] = useState({
                deny: false,
                accept: false,
            });
            function accept() {
                setSubmitting({
                    accept: true,
                    deny: false,
                });
                last.current.accept().then(() => {
                    setOpen(false);
                    setSubmitting({
                        accept: false,
                        deny: false,
                    });
                });
            }
            function deny() {
                setSubmitting({
                    accept: false,
                    deny: true,
                });
                last.current.deny().then(() => {
                    setOpen(false);
                    setSubmitting({
                        accept: false,
                        deny: false,
                    });
                });
            }
            return (
                <Dialog
                    open={open}
                    onClose={deny}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {title && (
                        <DialogTitle id="alert-dialog-title">
                            {title}
                        </DialogTitle>
                    )}
                    {content && (
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {content}
                            </DialogContentText>
                        </DialogContent>
                    )}

                    <DialogActions>
                        <div className="w-full px-4 pb-3 flex gap-x-5 justify-center md:justify-end">
                            <Button
                                onClick={accept}
                                color="error"
                                variant="outlined"
                                disabled={submitting.accept}
                            >
                                {deleteText}
                            </Button>
                            <Button
                                onClick={deny}
                                variant="contained"
                                className="bg-blue-600"
                                disabled={submitting.deny}
                            >
                                {keepText}
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>
            );
        };
    }, [title, content, keepText, deleteText, open]);
    return [
        resDialog,
        {
            accept(cb) {
                setOpen(true);
                last.current.accept = cb;
            },
            deny(cb) {
                setOpen(true);

                last.current.deny = cb;
            },
        },
    ];
}
