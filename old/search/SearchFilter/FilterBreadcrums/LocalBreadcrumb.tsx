import { Link } from "@mui/material";
import React from "react";

interface IProps {
  name: string;
  onClick?: () => void;
  href?: string;
}

export const LocalBreadcrumb: React.FC<IProps> = ({ href, name, onClick }) => (
  <Link underline="hover" color="inherit" href={href} onClick={onClick}>
    {name}
  </Link>
);
