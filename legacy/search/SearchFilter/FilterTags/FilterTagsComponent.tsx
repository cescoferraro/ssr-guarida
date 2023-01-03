import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { center } from "common/center";
import { GuaridaHttpClient } from "common/GuaridaHttpClient";
import { useCategoriaFilterQuery } from "common/hooks/useCategoriaFilterQuery";
import { useChangeSearchState } from "legacy/search/SearchFilter/useChangeSearchState";
import { localizacaoChips } from "legacy/search/SearchFilter/FilterTags/localizacaoChips";
import { useGuaridaCategoriaQuery } from "common/hooks/useGuaridaCategoriaQuery";
import React, { Dispatch, SetStateAction } from "react";
import { Bairro, Cidade, Logradouro, MinMax, SearchInput } from "typings";
import { areaValorChips } from "legacy/search/SearchFilter/FilterTags/areaValorChips";
import { GuaridaFilterChip } from "legacy/search/SearchFilter/FilterTags/caracteristicasChips";
import { filterTagLabel } from "legacy/search/SearchFilter/FilterTags/filterTagLabel";
import { useMaxNumberOfTags } from "legacy/search/SearchFilter/FilterTags/useMaxNumberOfTags";

export function FilterTagsComponent({
  input,
  gridRef,
  setInput,
}: {
  input: Partial<SearchInput>;
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>;
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>;
}) {
  const filterQuery = useCategoriaFilterQuery(input);
  const { data, isSuccess } = useGuaridaCategoriaQuery(true);
  const search = useChangeSearchState(gridRef, setInput);
  const useMaxTagsBySize = useMaxNumberOfTags();
  const removeOrderTag = (remove: (keyof SearchInput)[]) => (k: string) =>
    !remove.includes(k as keyof SearchInput);
  const qq = useMutation<
    Cidade | Bairro | Logradouro,
    Error,
    { type: "cidade" | "bairro" | "logradouro"; id: string }
  >({
    mutationKey: ["localization"],
    mutationFn: ({ id, type }) =>
      GuaridaHttpClient.get(`/localizacoes/${type}/${id}`).then((d) => d.data),
  });
  return (
    <Box sx={{ ...center, "& > div:nth-of-type(n + 2)": { ml: 2 } }}>
      {(isSuccess && filterQuery.isSuccess ? Object.keys(input) : [])
        // TODO
        .filter(
          removeOrderTag(["order", "endereco", "finalidade", "negocio", "tipo"])
        )
        .filter((_, index: number) => index < useMaxTagsBySize)
        .map((k, index) => {
          // return [];
          const inputElement = input[k as keyof SearchInput];
          if (
            (["bairro", "cidade"] as (keyof SearchInput)[]).includes(
              k as keyof SearchInput
            )
          ) {
            return localizacaoChips(
              inputElement as number,
              k as "bairro" | "cidade",
              search,
              input,
              qq
            );
          }
          if (
            (["area", "valor"] as (keyof SearchInput)[]).includes(
              k as keyof SearchInput
            )
          ) {
            return areaValorChips(inputElement as MinMax, k, search, input);
          }
          if (k === "categorias") {
            return (inputElement as number[]).map((catId) => {
              return (
                <GuaridaFilterChip
                  key={catId}
                  mySentence={
                    (data || []).find((cat) => {
                      return cat.id === catId;
                    })?.nome || ""
                  }
                  index={index}
                  onClick={async () => {
                    delete input[k];
                    await search(input);
                  }}
                />
              );
            });
          }
          const findKeyOnCaracteristicasCondominioOuImovel = [
            ...(filterQuery.data?.caracteristicasCondominio || []),
            ...(filterQuery.data?.caracteristicasImovel || []),
          ].find((c) => c.id === k);
          return [
            <GuaridaFilterChip
              key={k}
              mySentence={
                findKeyOnCaracteristicasCondominioOuImovel
                  ? findKeyOnCaracteristicasCondominioOuImovel.text || ""
                  : filterTagLabel(
                      k.replaceAll("_", " ").toUpperCase() as keyof SearchInput,
                      inputElement
                    )
              }
              index={index}
              onClick={async () => {
                delete input[k as keyof SearchInput];
                await search(input);
              }}
            />,
          ];
        })
        .flat()}
    </Box>
  );
}
