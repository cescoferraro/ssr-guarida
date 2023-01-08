import { Toolbar } from "@mui/material";
import React from "react";

export const GuaridaToolbar = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <Toolbar
    sx={{ height: { md: 100, lg: 100 }, justifyContent: "space-between" }}
  >
    {children}
  </Toolbar>
);
