import { Close, Tune } from "@mui/icons-material";
import { Box, Button, useTheme } from "@mui/material";
import { FilterTagsComponent } from "legacy/search/SearchFilter/FilterTags/FilterTagsComponent";
import React, { Dispatch, SetStateAction } from "react";
import { SearchInput } from "typings";

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>;
  input: Partial<SearchInput>;
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>;
}

export const FilterTags: React.FC<IProps> = ({
  setInput,
  setOpen,
  input,
  gridRef,
}) => {
  const theme = useTheme();
  // const location = useLocation();
  // const navigate = useRouter().push;
  return (
    <Box display="flex" sx={{ px: 2, py: 1, justifyContent: "space-between" }}>
      <FilterTagsComponent
        setInput={setInput}
        gridRef={gridRef}
        input={input}
      />
      <Box display="flex">
        <Box sx={{ display: "flex", pl: 2 }}>
          <Button
            sx={{
              textTransform: "none",
              color: theme.palette.primary.dark,
              fontSize: {
                xs: 8,
                sm: "unset",
              },
            }}
            size="small"
            variant="text"
            startIcon={<Close />}
            onClick={() => {
              // navigate(location.pathname, {
              //   state: {
              //     cidade: input.cidade,
              //     bairro: input.bairro,
              //     categorias: input.categorias,
              //   },
              // });
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
