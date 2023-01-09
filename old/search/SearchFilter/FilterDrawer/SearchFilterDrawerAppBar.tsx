/* eslint-disable no-console */
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Tab,
  Tabs,
  Theme,
} from "@mui/material";
import { ClearDrawerState } from "old/search/SearchFilter/FilterDrawer/ClearDrawerState";
import { useChangeSearchState } from "old/search/SearchFilter/useChangeSearchState";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import { useNextParams } from "old/search/useNextParams";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SearchInput } from "typings";

interface IProps {
  onClose: () => void;
  drawerState: Partial<SearchInput>;
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  input: Partial<SearchInput>;
}

export const SearchFilterDrawerAppBar: React.FC<IProps> = ({
  onClose,
  drawerState,
  setDrawerState,
  input,
}) => {
  const sx = {
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };
  const params = useNextParams();
  const [value, setValue] = useState(params.negocio === "alugar" ? 1 : 2);
  const q = useCampanhasQuery();
  useEffect(() => {
    const campanhaIndex =
      (q?.data?.findIndex((d) => d.attributes.slug === params.campanha) || 0) +
      1;
    if (campanhaIndex > 0) setValue(campanhaIndex + 2);
  }, [params.campanha, q?.data]);
  const navigateNewSearch = useChangeSearchState();
  const sx1 = (theme: Theme) => ({
    color: theme.palette.grey.A400,
    "&.Mui-selected": {
      color: theme.palette.text.primary,
      fontWeight: 700,
    },
  });
  console.log(q);
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
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={value}
              indicatorColor="secondary"
              color="secondary"
              onChange={(event, newValue) => {
                console.log(newValue);
                if ([1, 2].includes(newValue)) {
                  setValue(newValue);
                  setDrawerState((s) => ({
                    ...s,
                    negocio: newValue,
                    categorias: [],
                    id_campanha: undefined,
                    id_filtro: undefined,
                  }));
                  return;
                }
                // is campanha
                setValue(newValue);
                setDrawerState((s) => ({
                  ...s,
                  negocio: 1,
                  id_campanha: newValue - 2,
                  finalidade: "Residencial",
                  // cidade: undefined,
                  bairro: undefined,
                  logradouro: undefined,
                }));
              }}
            >
              <Tab sx={sx1} label="Alugar" value={1} />
              <Tab sx={sx1} color="grey" label="Comprar" value={2} />
              {q.data?.map((c, index) => {
                return (
                  <Tab
                    key={index + 3}
                    sx={sx1}
                    color="grey"
                    label={c.attributes?.titulo}
                    value={index + 3}
                  />
                );
              })}
            </Tabs>
            <Box
              sx={() => ({
                // display: "none",
                // flexGrow: 1,
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: {
                  xs: "column",
                  sm: "row-reverse",
                },
                // flexBasis: "60%",
                // theme.breakpoints.only("xs")
                // ? "30%"
                // : theme.breakpoints.down("md")
                // ? "40%"
                // : "30%",
              })}
            >
              <Box sx={sx}>
                <Button
                  color="secondary"
                  disabled={drawerState?.categorias?.length === 0}
                  sx={{
                    ml: 2,
                    // backgroundColor: theme.palette.primary.dark,
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
