import { useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { Stacked } from "old/imovel/ImovesRelacionados/Stacked";
import { StackParent } from "old/imovel/ImovesRelacionados/StackParent";
import { GuaridaImovelCard } from "components/GuaridaImovelCard/GuaridaImovelCard";
import React from "react";
import { SearchResponse } from "typings";

export const ImovesRelacionados: React.FC = () => {
  const q = useQuery<SearchResponse, Error, SearchResponse>({
    queryKey: ["adds", "check"],
    queryFn: () =>
      GuaridaHttpClient.post(`/imoveis`, {
        finalidade: "Residencial",
        categorias: [1],
        page: 1,
        order: "preco-asc",
        negocio: 1,
      }).then((c) => c.data),
  });
  return (
    <StackParent
      sx={{ background: useTheme().palette.info.main }}
      title={"Sugestões para você"}
    >
      <Stacked
        gap={4}
        direction="row"
        sx={{
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        {(q.data?.imoveis || []).map((s) => (
          <GuaridaImovelCard key={s.id} input={undefined} imovel={s} />
        ))}
      </Stacked>
    </StackParent>
  );
};
