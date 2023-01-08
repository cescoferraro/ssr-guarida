/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any */
import HomeIcon from "@mui/icons-material/Home";
import { Box, IconButton, MenuItem } from "@mui/material";
import { center } from "common/center";
import { useChangeSearchState } from "old/search/SearchFilter/useChangeSearchState";
import { BreadcrumbsGuarida } from "old/search/SearchFilter/FilterBreadcrums/BreadcrumbsGuarida";
import { RoundedSelect } from "old/search/SearchFilter/FilterTotal/RoundedSelect";
import React from "react";
import { useNextParams } from "old/search/useNextParams";
import { SearchInput } from "typings";

interface IProps {
  input: Partial<SearchInput>;
  setLoading: () => void;
  containerRef: React.MutableRefObject<HTMLButtonElement | undefined>;
}

function MobileNEgocioSelect({
  input,
  containerRef,
  setLoading,
}: {
  input: Partial<SearchInput>;

  setLoading: () => void;
  containerRef: React.MutableRefObject<HTMLButtonElement | undefined>;
}) {
  const location = { pathname: "sdkf" };
  const navigateNewSearch = useChangeSearchState(containerRef, setLoading);
  return (
    <Box sx={{ ...center, display: { xs: "flex", sm: "flex", md: "none" } }}>
      <RoundedSelect
        select
        color="secondary"
        size="small"
        id="demo-simple-select"
        value={useNextParams().negocio}
      >
        <MenuItem
          value={"alugar"}
          color="secondary"
          onClick={async () => {
            const replaceUlr = location.pathname.replace("comprar", "alugar");
            if (replaceUlr !== location.pathname)
              await navigateNewSearch({
                ...input,
                negocio: 1,
                categorias: [],
              });
          }}
        >
          Alugar
        </MenuItem>
        <MenuItem
          value="comprar"
          color="secondary"
          onClick={async () => {
            const replaceUlr = location.pathname.replace("alugar", "comprar");
            if (replaceUlr !== location.pathname)
              await navigateNewSearch({
                ...input,
                negocio: 2,
                categorias: [],
              });
          }}
        >
          Comprar
        </MenuItem>
      </RoundedSelect>
    </Box>
  );
}

export const FilterBreadcrums: React.FC<IProps> = ({
  setLoading,
  containerRef,
  input,
}) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", pt: 1, px: 2 }}
    >
      <Box display="flex">
        <Box sx={{ ...center }}>
          <IconButton size="large" edge="start" color="default" sx={{ pr: 1 }}>
            <HomeIcon />
          </IconButton>
        </Box>
        <MobileNEgocioSelect
          input={input}
          setLoading={setLoading}
          containerRef={containerRef}
        />
        <BreadcrumbsGuarida
          input={input}
          sx={{
            ...center,
            display: { xs: "none", sm: "none", md: "flex" },
          }}
        />
      </Box>
    </Box>
  );
};
