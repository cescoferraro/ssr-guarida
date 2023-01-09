import { Close, Tune } from "@mui/icons-material";
import { Box, Button, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { FilterTagsComponent } from "old/search/SearchFilter/FilterTags/FilterTagsComponent";
import React, { Dispatch, SetStateAction } from "react";
import { SearchInput } from "typings";

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  input: Partial<SearchInput>;
}

export const FilterTags: React.FC<IProps> = ({ setOpen, input }) => {
  const theme = useTheme();
  const location = { pathname: "sdkf" };
  const navigate = useRouter().push;
  return (
    <Box display="flex" sx={{ px: 2, py: 1, justifyContent: "space-between" }}>
      <FilterTagsComponent input={input} />
      <Box display="flex">
        <Box sx={{ display: "flex", pl: 2 }}>
          <Button
            sx={{
              textTransform: "none",
              color: theme.palette.info.contrastText,
              fontSize: {
                xs: 8,
                sm: "unset",
              },
            }}
            size="small"
            variant="text"
            color="info"
            startIcon={<Close />}
            onClick={() => {
              // {
              //   state: {
              //     cidade: input.cidade,
              //         bairro: input.bairro,
              //         categorias: input.categorias,
              //         finalidade: input.finalidade,
              //         negocio: input.negocio,
              //   },
              // }
              navigate(location.pathname);
            }}
          >
            {"Limpar Filtros"}
          </Button>
        </Box>
        <Box sx={{ display: "flex", pl: 2 }}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            startIcon={<Tune />}
            onClick={() => {
              setOpen((o) => !o);
            }}
          >
            Filtrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
