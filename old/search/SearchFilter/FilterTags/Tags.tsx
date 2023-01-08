import { UseQueryResult } from "@tanstack/react-query";
import { areaValorChips } from "old/search/SearchFilter/FilterTags/areaValorChips";
import { GuaridaFilterChip } from "old/search/SearchFilter/FilterTags/caracteristicasChips";
import { filterTagLabel } from "old/search/SearchFilter/FilterTags/filterTagLabel";
import { localizacaoChips } from "old/search/SearchFilter/FilterTags/localizacaoChips";
import { numeroTagText } from "old/search/SearchFilter/FilterTags/numeroTagText";
import { useLocalQuery } from "old/search/SearchFilter/FilterTags/useLocalQuery";
import { useMaxNumberOfTags } from "old/search/SearchFilter/FilterTags/useMaxNumberOfTags";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import React from "react";
import {
  Categoria,
  FilterByCategory,
  FiltroCampanha,
  MinMax,
  SearchInput,
} from "typings";

interface IProps {
  allTags: string[];
  categorias?: Categoria[];
  input: Partial<SearchInput>;
  filterQuery: UseQueryResult<FilterByCategory, Error>;
  search: (par: Partial<SearchInput>) => Promise<void>;
}

export function Tags({
  allTags,
  categorias,
  filterQuery,
  input,
  search,
}: IProps) {
  const maxVisibleTags = useMaxNumberOfTags();
  const localQuery = useLocalQuery();
  const q = useCampanhasQuery();
  return (
    <>
      {allTags
        .map((k) => k as keyof SearchInput)
        .map((k) => {
          if (
            (["bairro", "cidade", "estado"] as (keyof SearchInput)[]).includes(
              k
            )
          ) {
            return localizacaoChips(
              input[k] as number,
              k as "bairro" | "cidade",
              search,
              input,
              localQuery
            );
          }
          if ((["area", "valor"] as (keyof SearchInput)[]).includes(k)) {
            return areaValorChips(input[k] as MinMax, k, search, input);
          }
          if (k === "categorias") {
            return (input[k] as number[]).map((catId) => {
              return (
                <GuaridaFilterChip
                  key={catId}
                  mySentence={
                    (categorias || []).find((cat) => {
                      return cat.id === catId;
                    })?.nome || ""
                  }
                  onClick={async () => {
                    await search({
                      ...input,
                      categorias: input.categorias?.filter((c) => c !== catId),
                    });
                  }}
                />
              );
            });
          }

          if (k.includes("numero")) {
            return [
              <GuaridaFilterChip
                key={k}
                mySentence={numeroTagText(input, k)}
                onClick={async () => {
                  delete input[k as keyof SearchInput];
                  await search(input);
                }}
              />,
            ];
          }
          if (k === "id_campanha") {
            const find = q?.data?.find((c) => c.id === input.id_campanha);
            return [
              <GuaridaFilterChip
                key={k}
                mySentence={`${find?.attributes?.titulo}`}
                onClick={async () => {
                  delete input[k as keyof SearchInput];
                  await search(input);
                }}
              />,
            ];
          }
          if (k === "id_filtro") {
            const find = q?.data?.find((c) => c.id === input.id_campanha);
            const message = find?.attributes?.filtros?.data?.find(
              (d: FiltroCampanha) => d.id === input.id_filtro
            )?.attributes?.titulo;
            return [
              <GuaridaFilterChip
                key={k}
                mySentence={message?.replaceAll("undefined", "")}
                onClick={async () => {
                  delete input[k as keyof SearchInput];
                  await search(input);
                }}
              />,
            ];
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
                      input[k]
                    )
              }
              onClick={async () => {
                delete input[k as keyof SearchInput];
                await search(input);
              }}
            />,
          ];
        })
        .flat()
        .filter((_, index: number) => index < maxVisibleTags)}
    </>
  );
}
