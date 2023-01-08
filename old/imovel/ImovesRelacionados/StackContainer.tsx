import { Box, styled } from "@mui/material";

export const StackContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "disablePadding",
})<{
  disablePadding: boolean;
}>(({ theme, disablePadding }) => {
  const disabler = disablePadding ? { paddingRight: 0 } : {};
  return {
    flex: 1,
    padding: "56px 64px",
    ...disabler,
    [theme.breakpoints.only("md")]: {
      padding: "16px 32px",
      ...disabler,
    },
    [theme.breakpoints.down("md")]: {
      padding: "16px 24px",
      ...disabler,
    },
  };
});
