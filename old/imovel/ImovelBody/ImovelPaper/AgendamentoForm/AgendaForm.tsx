import { Box, Button, MenuItem, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  PickersDay,
  pickersDayClasses,
  PickersDayProps,
} from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { center } from "common/center";
import { Dayjs } from "dayjs";
import { FormikProps } from "formik";
import { Agendamento } from "old/imovel/ImovelBody/ImovelPaper/AgendamentoForm/Agendamento";
import { StyledCalendarBox } from "old/imovel/ImovelBody/ImovelPaper/AgendamentoForm/StyledCalendarBox";
import React from "react";

export function AgendaForm({ formik }: { formik: FormikProps<Agendamento> }) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Typography>Agendar Visitar</Typography>
        <StyledCalendarBox>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker<Dayjs>
              disablePast
              renderDay={(
                date: Dayjs,
                selectedDates: Array<Dayjs | null>,
                pickersDayProps: PickersDayProps<Dayjs>
              ): React.ReactElement => {
                return (
                  <PickersDay
                    {...pickersDayProps}
                    sx={(theme) => ({
                      [`&&.${pickersDayClasses.selected}`]: {
                        color: "black",
                        fontWeight: 700,
                        backgroundColor: "transparent",
                        border: `2px solid ${theme.palette.secondary.main}`,
                        // backgroundColor: "green",
                      },
                    })}
                  />
                );
              }}
              displayStaticWrapperAs="desktop"
              value={formik.values.date}
              onChange={(newValue) => {
                formik.setFieldValue("date", newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </StyledCalendarBox>
        <Box
          sx={{
            ml: 1,
            pb: 2,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ ...center, pr: 2 }}>
            <Typography>Selecione o horário</Typography>
          </Box>
          <TextField
            value={formik.values.slot}
            sx={(theme) => ({
              flexGrow: 1,
              background: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              borderRadius: 20,
              "& .MuiFormLabel-root": {
                color: "white",
              },
              "& .MuiSelect-select": {
                color: "white",
              },
              "& .MuiSelect-iconFilled": {
                color: "white",
              },
            })}
            InputProps={{
              sx: {
                background: "transparent",
                "&&&:before": {
                  borderBottom: "none",
                },
                "&&:after": {
                  borderBottom: "none",
                },
              },
            }}
            select
            hiddenLabel
            size={"small"}
            variant="filled"
            onChange={(event) =>
              formik.setFieldValue("slot", event.target.value)
            }
          >
            <MenuItem value={"8:00"}>8:00</MenuItem>
            <MenuItem value={"8:30"}>8:30</MenuItem>
            <MenuItem value={"9:00"}>9:00</MenuItem>
            <MenuItem value={"9:30"}>9:30</MenuItem>
            <MenuItem value={"10:00"}>10:00</MenuItem>
            <MenuItem value={"10:30"}>10:30</MenuItem>
            <MenuItem value={"11:00"}>11:00</MenuItem>
            <MenuItem value={"11:30"}>11:30</MenuItem>
            <MenuItem value={"12:00"}>12:00</MenuItem>
          </TextField>
        </Box>
      </Box>
      <Button
        variant="contained"
        disabled={!(formik.isValid && formik.dirty)}
        color="secondary"
        type="submit"
        fullWidth
      >
        Próximo
      </Button>
    </form>
  );
}
