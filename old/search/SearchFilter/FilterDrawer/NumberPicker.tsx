import { Box, IconButton, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { Dispatch, SetStateAction } from "react";
import { Propriedade, SearchInput } from "typings";

interface IProps {
  drawerState: Partial<SearchInput>;
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  propriedade: Propriedade;
}

export const NumberPicker: React.FC<IProps> = ({
  drawerState,
  propriedade: { id, text, values },
  setDrawerState,
}) => {
  const page = (drawerState[id as keyof SearchInput] as number) || 0;
  return (
    <Box sx={{ pb: 2 }}>
      <Typography sx={{ pb: 1 }}>{`${text}`}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {(values || []).map((val) => {
          const d = Number(val.replace("+", ""));
          const isSelected = d === 0 ? false : page === d;
          const theme = useTheme();
          const secondary = theme.palette.secondary;
          return (
            <Box key={val}>
              <IconButton
                sx={{
                  minWidth: 47,
                  minHeight: 47,
                  display: "flex",
                  border: `1.5px solid ${
                    isSelected ? secondary.main : theme.palette.grey.A100
                  }`,
                  fontSize: 18,
                  fontWeight: isSelected ? 700 : 400,
                  color: isSelected ? "black" : undefined,
                }}
                onClick={() => {
                  if (isSelected || d === 0) {
                    setDrawerState((s) => ({
                      ...s,
                      [id as keyof SearchInput]: undefined,
                    }));
                  } else {
                    setDrawerState((s) => ({
                      ...s,
                      [id as keyof SearchInput]: d === s.page ? undefined : d,
                    }));
                  }
                }}
              >
                {val}
              </IconButton>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
