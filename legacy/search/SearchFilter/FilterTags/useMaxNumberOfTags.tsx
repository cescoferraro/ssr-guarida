import { Theme, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";

export const useMaxNumberOfTags = (): number => {
  const theme: Theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xl = useMediaQuery(theme.breakpoints.only("xl"));
  return useMemo(() => {
    if (sm) return 2;
    if (md) return 3;
    if (lg) return 5;
    if (xl) return 7;
    return 1;
  }, [xs, sm, md, lg, xl]);
};
