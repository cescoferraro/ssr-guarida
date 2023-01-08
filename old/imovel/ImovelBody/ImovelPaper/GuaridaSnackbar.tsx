import { Alert, Snackbar } from "@mui/material";
import { SnackState } from "old/imovel/ImovelBody/ImovelPaper/SnackState";
import React from "react";
import ReactDOM from "react-dom";

export function GuaridaSnackbar(props: {
  bigScreen: boolean;
  snack: SnackState;
  onClose: () => void;
}) {
  return (
    <>
      {typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{
              mt: (props.bigScreen ? 100 : 64) / 8,
            }}
            open={props.snack.open}
            autoHideDuration={6000}
            onClose={props.onClose}
          >
            <Alert
              onClose={props.onClose}
              severity={props.snack.severity}
              sx={{ width: "100%" }}
            >
              {props.snack.msg}
            </Alert>
          </Snackbar>,
          document?.body
        )}
    </>
  );
}
