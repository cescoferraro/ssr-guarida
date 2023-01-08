import { Box } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";

export const appVersion = process.env.VERSION || "0.0.0";

export const AppVersion = () => {
  return (
    <Box
      sx={{
        width: "100%",
        fontSize: "small",
        color: "#243F71",
        backgroundColor: "#F9F9FF",
        paddingBottom: "2px",
      }}
    >
      <Typography align="right">
        v{appVersion} - {process.env.DATE_BUILD || ""}
      </Typography>
    </Box>
  );
};
