import { ChevronRight } from "@mui/icons-material";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import React from "react";

export interface IProps {
  title: string;
  menuItems?: Array<{ label: string; link: string; idItem: string }>;
  link?: string;
  anchor?: string;
  active?: boolean;
}

export function DesktopAppbarButton(props: { i: IProps }) {
  const theme = useTheme();
  const palette = theme.palette;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  return (
    <>
      <Button
        variant="text"
        href={props.i.menuItems ? undefined : props.i.link}
        onClick={(event) => {
          if (props.i.menuItems) setAnchorEl(event.currentTarget);
        }}
        sx={{
          fontSize: 16,
          textTransform: "none",
          "&.MuiButtonBase-root:hover": {
            backgroundColor: "transparent",
          },
          color: palette.grey.A700,
          "&:hover": {
            opacity: 1,
            color: theme.palette.primary.dark,
          },
        }}
        endIcon={
          props.i.menuItems && (
            <ChevronRight
              sx={{
                color: palette.primary.dark,
                transform: "rotate(90deg)",
              }}
            />
          )
        }
      >
        {props.i.title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {props.i.menuItems?.map((i) => {
          return (
            <MenuItem
              key={i.idItem}
              onClick={() => setAnchorEl(null)}
              href={i.link}
              sx={{
                "&:hover": {
                  color: theme.palette.primary.dark,
                },
              }}
            >
              {i.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
