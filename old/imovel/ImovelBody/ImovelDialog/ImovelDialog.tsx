import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

export interface DialogState {
  open: boolean;
  title?: string;
  description?: string;
}

export function ImovelDialog({
  dialogState: { description, open, title },
  setDialogState,
}: {
  dialogState: DialogState;
  setDialogState: Dispatch<SetStateAction<DialogState>>;
}) {
  return (
    <Dialog
      open={open}
      hideBackdrop={false}
      onClose={() =>
        setDialogState((st) => ({
          ...st,
          open: !st.open,
        }))
      }
    >
      <DialogTitle display={title ? "" : "none"} fontSize={"18px"}>
        {title}
        <IconButton
          onClick={() => setDialogState((st) => ({ ...st, open: !st.open }))}
          sx={{
            position: "absolute",
            right: 8,
            top: 14,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        onClick={() =>
          setDialogState((st) =>
            st.open ? { open: !st.open } : { ...st, open: !st.open }
          )
        }
      >
        {description}
      </DialogContent>
    </Dialog>
  );
}
