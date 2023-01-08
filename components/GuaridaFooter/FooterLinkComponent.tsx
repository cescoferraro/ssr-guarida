import { ChevronRight } from "@mui/icons-material";
import {
  IconButton,
  Link,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";

interface IProps {
  footerLink: {
    display: string;
    anchor?: string;
    links?: {
      display: string;
      anchor: string;
    }[];
  };
  always?: boolean;
  textColor?: string;
  spacer?: boolean;
  noWrap?: boolean;
}

export function FooterLinkComponent({
  footerLink: { anchor, display, links },
  always = false,
  spacer = false,
  textColor,
  noWrap,
}: IProps) {
  const isSmall = useMediaQuery(useTheme().breakpoints.down("md"));
  const spaceSx = spacer ? { "& > button:nth-of-type(n + 2)": { ml: 2 } } : {};
  const navigate = useRouter().push;
  const color = textColor;
  const hasLinks = (links || []).length > 0;
  const [anchorEl, setAnchorEl] = useState<
    null | Element | ((element: Element) => Element)
  >(null);
  const onClick =
    (isOnClick = false): MouseEventHandler<HTMLButtonElement> | undefined =>
    (event) => {
      if (hasLinks) {
        if (anchorEl !== event.currentTarget)
          if (event) {
            setAnchorEl(event?.currentTarget);
          }
        return;
      }
      if (isOnClick && anchor) {
        navigate(anchor);
      }
    };
  return (
    <Link
      sx={{
        ...spaceSx,
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        // padding: 8,
        // textDecoration: "none",
        // p: 0,
        // color,
        // pt: 0,
        pb: 0,
        pt: 2,
        // width: "100%",
        borderBottom: anchorEl ? "2px solid black" : "unset",
      }}
      href={anchor}
      noWrap={noWrap}
      fontSize={16}
      color={"text.primary"}
      lineHeight={"19px"}
      fontWeight="bold"
      py={1}
      underline={"none"}
    >
      {display}
      {(always || isSmall || hasLinks) && (
        <>
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={onClick(true)}
            onMouseOver={onClick(false)}
            sx={{ p: 0 }}
          >
            <ChevronRight sx={{ color }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{ onMouseLeave: () => setAnchorEl(null) }}
          >
            {(links || []).map((l) => (
              <MenuItem key={l.display} onClick={() => setAnchorEl(null)}>
                {l.display}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Link>
  );
}
