/* eslint-disable no-console */
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import { getNegocioIdFromUrl } from "legacy/search/hooks/getNegocioIdFromUrl";
import { ClearDrawerState } from "legacy/search/SearchFilter/FilterDrawer/ClearDrawerState";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SearchInput } from "typings";
import { useChangeSearchState } from "legacy/search/SearchFilter/useChangeSearchState";

interface IProps {
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>;
  // setLoading: () => void;
  onClose: () => void;
  drawerState: Partial<SearchInput>;
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  input: Partial<SearchInput>;
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>;
}

export const SearchFilterDrawerAppBar: React.FC<IProps> = ({
  setInput,
  onClose,
  drawerState,
  setDrawerState,
  input,
  // setLoading,
  gridRef,
}) => {
  const sx = {
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };
  const theme = useTheme();
  const [value, setValue] = useState(getNegocioIdFromUrl());
  const navigateNewSearch = useChangeSearchState(gridRef, setInput);
  return (
    <>
      <Container>
        <AppBar
          position="static"
          color="transparent"
          sx={{ boxShadow: "none" }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              pt: 2,
            }}
          >
            <Box sx={{ flexGrow: 1, height: "100%" }}>
              <Tabs
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  setDrawerState((s) => ({
                    ...s,
                    negocio: newValue,
                    categorias: [],
                  }));
                }}
              >
                <Tab label="Alugar" value={1} />
                <Tab label="Comprar" value={2} />
              </Tabs>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: {
                  xs: "column",
                  sm: "row-reverse",
                },
              }}
            >
              <Box sx={sx}>
                <Button
                  disabled={drawerState?.categorias?.length === 0}
                  sx={{
                    ml: 2,
                    backgroundColor: theme.palette.primary.dark,
                  }}
                  variant="contained"
                  onClick={() => {
                    void navigateNewSearch(drawerState);
                    onClose();
                  }}
                >
                  Filtrar
                </Button>
              </Box>
              <Box sx={{ ...sx, display: { xs: "none", sm: "flex" } }}>
                <Box>
                  <ClearDrawerState onClick={() => setDrawerState(input)} />
                </Box>
              </Box>
            </Box>
          </Box>
        </AppBar>
        <Divider sx={{ borderBottom: "3px solid #E8E4E4 " }} />
        <Box
          sx={{
            width: "100%",
            display: { xs: "flex", sm: "none" },
            justifyContent: "flex-end",
          }}
        >
          <Box>
            <ClearDrawerState onClick={() => setDrawerState(input)} />
          </Box>
        </Box>
      </Container>
    </>
  );
};
