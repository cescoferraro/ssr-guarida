import { Box, Button, Paper, SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import { center } from "common/center";
import { AppIconsSocial } from "components/GuaridaFooter/AppIconsSocial";
import * as React from "react";
import appStoreSvg from "common/assets/images/AppStoreIos.svg";
import GooglePlayStore from "common/assets/images/GooglePlayStore.svg";

export function StoreComponent({ sx }: { sx?: SxProps }) {
  const background = "linear-gradient(270deg, #206494, #10324A);";
  return (
    <Box sx={sx}>
      <Box sx={{ ...center }}>
        <Paper
          sx={{
            p: 1,
            width: { lg: "100%", md: "100%", sm: "40%", xs: "90%" },
          }}
        >
          <Typography>AGÊNCIA VIRTUAL</Typography>
          <Box sx={{ py: 2, ...center }}>
            <Button
              variant={"contained"}
              sx={{
                background: background,
                "&:hover": { background: background },
                borderRadius: 20,
                fontSize: 10,
                whiteSpace: "nowrap",
                minWidth: "auto",
              }}
            >
              Acesse a Agência Virtual
            </Button>
          </Box>
          <Box display="flex">
            <Box flexBasis="50%" maxWidth="50%">
              <Box
                sx={{ width: "-webkit-fill-available" }}
                component="img"
                src={appStoreSvg.src}
              />
            </Box>
            <Box flexBasis="50%" maxWidth="50%">
              <Box
                sx={{ width: "-webkit-fill-available" }}
                component="img"
                src={GooglePlayStore.src}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ ...center, pt: 3 }}>
        <AppIconsSocial />
      </Box>
    </Box>
  );
}
