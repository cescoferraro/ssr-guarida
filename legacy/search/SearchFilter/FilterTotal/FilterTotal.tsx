import { Box, Typography } from "@mui/material";
import { center } from "common/center";
import { useGuaridaCategoriaQuery } from "common/hooks/useGuaridaCategoriaQuery";
import { guaridaCurrentLocal } from "common/hooks/guaridaCurrentLocal";
import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";
import { PropertyFilterFooterOrder } from "legacy/search/SearchFilter/FilterTotal/PropertyFilterFooterOrder";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { Cidade, SearchInput } from "typings";

interface IProps {
  input: Partial<SearchInput>;
  total: number;
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>;
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>;
}

export const FilterTotal: React.FC<IProps> = ({
  setInput,
  total,
  input,
  gridRef,
}) => {
  const find = guaridaCurrentLocal(useGuaridaLocal().data);
  const query = useGuaridaCategoriaQuery(true);
  const uf = (find as Cidade)?.uf;
  const useParams1 = useRouter().query;
  return (
    <Box display="flex" sx={{ px: 2, pb: 1 }}>
      <h6>{JSON.stringify(input)}</h6>
      <Box
        sx={{
          ...center,
          justifyContent: "flex-start",
          flexBasis: "60%",
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        <Box>
          <Typography>{`${total} ${
            useParams1.categoria
              ? query.data?.map((a) => a.nome).join(", ")
              : "imóveis"
          } para ${useParams1.negocio} em ${find?.nome}${
            uf ? ` ${uf}` : ""
          }`}</Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
      >
        <PropertyFilterFooterOrder
          gridRef={gridRef}
          input={input}
          setInput={setInput}
        />
      </Box>
    </Box>
  );
};
