import { ChevronRight } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { center } from "common/center";
import { useRef, useState } from "react";

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
  const color = textColor || useTheme().palette.primary.dark;
  const [hover, setHover] = useState(false);
  const ref = useRef<null | HTMLElement>(null);
  const hasLinks = (links || []).length > 0;
  const onClick = () => {
    if (hasLinks) {
      setHover((h) => !h);
      return;
    }
    if (anchor) window.location.href = anchor;
  };
  return (
    <Box
      sx={{ p: 1, ...spaceSx }}
      width="100%"
      justifyContent="space-between"
      display="flex"
      onMouseLeave={() => setHover(false)}
      ref={ref}
    >
      <Box sx={{ ...center }}>
        <Link
          noWrap={noWrap}
          href={anchor}
          fontSize={16}
          lineHeight={"19px"}
          fontWeight="bold"
          py={1}
          underline={"none"}
          sx={{ p: 0, color }}
          onClick={onClick}
        >
          {display}
        </Link>
      </Box>
      {(always || isSmall || hasLinks) && (
        <IconButton onClick={onClick} sx={{ p: 0 }}>
          <ChevronRight sx={{ color }} />
        </IconButton>
      )}
      <Menu
        open={hover}
        anchorEl={ref.current}
        onClose={() => {
          setHover(false);
        }}
      >
        {(links || []).map((l) => (
          <MenuItem
            key={l.display}
            onClick={() => {
              setHover(false);
              window.location.href = l.anchor;
            }}
          >
            {l.display}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
