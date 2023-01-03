import {
  Box,
  Container,
  Grid,
  SxProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FooterContact } from "components/GuaridaFooter/FooterContact";
import { FooterFirstGridItem } from "components/GuaridaFooter/FooterFirstGridItem";
import { FooterGridItem } from "components/GuaridaFooter/FooterGridItem";
import { FooterMainContact } from "components/GuaridaFooter/FooterMainContact";
import { FooterMainLinks } from "components/GuaridaFooter/FooterMainLinks";
import { FooterSecondGridItem } from "components/GuaridaFooter/FooterSecondGridItem";
import { FooterThirdGridItem } from "components/GuaridaFooter/FooterThirdGridItem";
import { StoreComponent } from "components/GuaridaFooter/StoreComponent";
import * as React from "react";
import { AppCompanyInfo } from "./AppCompanyInfo";
import { AppVersion } from "./AppVersion";

export const GuaridaFooter = ({ sx }: { sx?: SxProps }) => {
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  return (
    <Box sx={{ background: "#F9F9FF", mt: 2, ...sx }}>
      <Container>
        <Grid
          container
          spacing={{ xs: 4, sm: 2, md: 3, lg: 2 }}
          columns={{ xs: 12, sm: 12, md: 15, lg: 15 }}
          sx={{ pb: 2 }}
        >
          <FooterFirstGridItem />
          <FooterSecondGridItem />
          <FooterThirdGridItem />
          {!isSmallScreen && (
            <>
              <FooterContact />
              <FooterGridItem>
                <StoreComponent />
              </FooterGridItem>
            </>
          )}
        </Grid>
      </Container>
      <FooterMainContact />
      {isSmallScreen && (
        <Box sx={{ py: 3 }}>
          <StoreComponent />
        </Box>
      )}
      <Container>
        <FooterMainLinks />
        <AppCompanyInfo />
        <AppVersion />
      </Container>
    </Box>
  );
};
