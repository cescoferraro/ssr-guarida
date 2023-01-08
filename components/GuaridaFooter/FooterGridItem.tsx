import { Grid, Typography } from "@mui/material";
import React from "react";

interface IProps {
  title?: string;
  children: React.ReactNode;
  md?: number;
}

export function FooterGridItem({ md = 3, children, title }: IProps) {
  return (
    <Grid item xs={12} sm={12} md={md} lg={3}>
      {title && (
        <Typography
          noWrap
          sx={{
            color: "#666666",
            fontWeight: "bold",
            fontSize: "18px !important",
            textAlign: "left",
            pb: 1,
          }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Grid>
  );
}
