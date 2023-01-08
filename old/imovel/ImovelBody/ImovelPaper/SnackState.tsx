import { AlertColor } from "@mui/material/Alert/Alert";

export interface SnackState {
  open: boolean;
  msg?: string;
  severity?: AlertColor;
}