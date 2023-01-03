import { Box } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";

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
        v{process.env.REACT_APP_VERSION || "0.0.0"} -{" "}
        {process.env.REACT_APP_DATE_BUILD || ""}
      </Typography>
    </Box>
  );
};
