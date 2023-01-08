import { Box, experimental_sx, styled } from "@mui/material";

export const StyledCalendarBox = styled(Box)((theme) =>
  experimental_sx({
    "& .MuiPickerStaticWrapper-root .MuiPickerStaticWrapper-content .MuiCalendarOrClockPicker-root div .MuiCalendarPicker-root .MuiPickersCalendarHeader-root":
      {
        ".MuiPickersCalendarHeader-labelContainer": {
          background: theme.theme.palette.secondary.main,
          color: theme.theme.palette.secondary.contrastText,
          borderRadius: 20,
          px: 1,
        },
        ".MuiPickersCalendarHeader-switchViewIcon": {
          color: theme.theme.palette.secondary.contrastText,
        },
      },
    "& .PrivatePickersYear-yearButton.Mui-selected": {
      background: `${theme.theme.palette.secondary.main} !important`,
      // },
    },
  })
);
