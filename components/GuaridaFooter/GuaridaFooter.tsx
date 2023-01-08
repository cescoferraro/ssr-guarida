import { Box, Grid, SxProps, useMediaQuery, useTheme } from "@mui/material";
import { FooterContact } from "components/GuaridaFooter/FooterContact";
import { FooterFirstGridItem } from "components/GuaridaFooter/FooterFirstGridItem";
import { FooterGridItem } from "components/GuaridaFooter/FooterGridItem";
import { FooterMainContact } from "components/GuaridaFooter/FooterMainContact";
import { FooterMainLinks } from "components/GuaridaFooter/FooterMainLinks";
import { FooterSecondGridItem } from "components/GuaridaFooter/FooterSecondGridItem";
import { FooterThirdGridItem } from "components/GuaridaFooter/FooterThirdGridItem";
import * as React from "react";
import { AppCompanyInfo } from "./AppCompanyInfo";
import { AppVersion } from "./AppVersion";

export const GuaridaFooter = ({ sx }: { sx?: SxProps }) => {
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  const sxx: SxProps = {
    background: "#F9F9FF",
    pt: 2,
    px: { xs: 1, sm: 1, md: 2, lg: 2, xl: 8, xxl: 12 },
    ...sx,
  };
  return (
    <>
      <Box sx={sxx}>
        <Grid
          container
          spacing={{ xs: 4, sm: 2, md: 3, lg: 2 }}
          columns={{ xs: 12, sm: 12, md: 15, lg: 15 }}
          sx={{ pb: 2, width: "100%" }}
        >
          <FooterFirstGridItem />
          <FooterSecondGridItem />
          <FooterThirdGridItem />
          {!isSmallScreen && (
            <>
              <FooterContact showAll />
              <FooterGridItem>{/*<StoreComponent />*/}</FooterGridItem>
            </>
          )}
        </Grid>
      </Box>
      <FooterMainContact />
      {isSmallScreen && <Box sx={{ py: 3 }}>{/*<StoreComponent />*/}</Box>}
      <Box sx={sxx}>
        <FooterMainLinks />
        <AppCompanyInfo />
        <AppVersion />
      </Box>
    </>
  );
};
