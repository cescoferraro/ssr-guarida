import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

export interface LeadFormDialog {
  open: boolean;
  msg?: string;
}

export function LeadFormDialog({
  dialog: { msg, open },
  setDialog,
}: {
  setDialog: Dispatch<SetStateAction<LeadFormDialog>>;
  dialog: LeadFormDialog;
}) {
  const onClose = () => setDialog((s) => ({ ...s, open: !s.open }));
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography>{msg}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
