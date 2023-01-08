import { Link } from "@mui/material";
import React from "react";

interface IProps {
  name: string;
  onClick: () => void;
}

export const LocalBreadcrumb: React.FC<IProps> = ({ name, onClick }) => (
  <Link underline="hover" color="inherit" onClick={onClick}>
    {name}
  </Link>
);
