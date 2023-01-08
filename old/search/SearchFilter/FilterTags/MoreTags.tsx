import { Menu, MenuItem } from "@mui/material";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useGuaridaCategoriaQuery } from "common/hooks/useGuaridaCategoriaQuery";
import { notEmpty } from "common/notEmpty";
import { capitalize } from "lodash";
import { GuaridaFilterChip } from "old/search/SearchFilter/FilterTags/caracteristicasChips";
import { numeroTagText } from "old/search/SearchFilter/FilterTags/numeroTagText";
import { useLocalQuery } from "old/search/SearchFilter/FilterTags/useLocalQuery";
import { useMaxNumberOfTags } from "old/search/SearchFilter/FilterTags/useMaxNumberOfTags";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Bairro,
  Cidade,
  FilterByCategory,
  FiltroCampanha,
  Logradouro,
  MinMax,
  SearchInput,
} from "typings";

export type LocalType = "cidade" | "bairro" | "logradouro";

function NewComponent({
  k,
  onClick,
  input,
  qq,
}: {
  onClick: () => Promise<void>;
  k: keyof SearchInput;
  input: Partial<SearchInput>;
  // id: number;
  qq: UseMutationResult<
    Cidade | Bairro | Logradouro,
    Error,
    { type: LocalType; id: string }
  >;
}): null | React.ReactElement {
  const element = input[k as keyof SearchInput];
  const [state, setState] = useState<Cidade | Bairro | undefined>(undefined);
  useEffect(() => {
    const ff = async () =>
      setState(
        await qq?.mutateAsync({ type: k as LocalType, id: String(element) })
      );
    void ff();
  }, [k, element]);
  return state?.nome ? (
    <MenuItem onClick={onClick}>{state?.nome}</MenuItem>
  ) : null;
}

function moraTagesDefaultHAndleClose(
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>,
  input: Partial<SearchInput>,
  search: (par: Partial<SearchInput>) => Promise<void>
) {
  return (k?: string) => async () => {
    setAnchorEl(null);
    if (k) {
      delete input[k as keyof SearchInput];
      await search(input);
    }
  };
}

export const MoreTags = ({
  input,
  search,
  allTags,
  filterQuery,
}: {
  input: Partial<SearchInput>;
  allTags: string[];
  filterQuery: UseQueryResult<FilterByCategory, Error>;
  search: (par: Partial<SearchInput>) => Promise<void>;
}) => {
  const localQuery = useLocalQuery();
  const maxVisibleTags = useMaxNumberOfTags();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = moraTagesDefaultHAndleClose(setAnchorEl, input, search);
  const map = exxx(
    input,
    allTags,
    localQuery,
    search,
    maxVisibleTags,
    setAnchorEl,
    filterQuery
  );
  return map.length > 0 ? (
    <>
      <GuaridaFilterChip
        icon={false}
        onClick={(event) => setAnchorEl(event?.currentTarget || null)}
        mySentence={`+${map.length}`}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose()}>
        {map}
      </Menu>
    </>
  ) : null;
};

function exxx(
  input: Partial<SearchInput>,
  allTags: string[],
  localQuery: UseMutationResult<
    Cidade | Bairro | Logradouro,
    Error,
    { type: LocalType; id: string }
  >,
  search: (par: Partial<SearchInput>) => Promise<void>,
  maxVisibleTags: number,
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>,
  filterQuery: UseQueryResult<FilterByCategory, Error>
) {
  const q = useCampanhasQuery();
  const find = q?.data?.find((c) => c.id === input.id_campanha);
  const { data } = useGuaridaCategoriaQuery();
  const handleClose = moraTagesDefaultHAndleClose(setAnchorEl, input, search);
  // console.log(
  // );
  return allTags
    .map((k) => {
      if (["area", "valor"].includes(k)) {
        const inputElement = input[k as keyof SearchInput] as MinMax;
        const onClick = (sd: "min" | "max") => async () => {
          setAnchorEl(null);
          delete inputElement[sd];
          await search(input);
        };
        return [
          inputElement.min || inputElement.min === 0 ? (
            <MenuItem onClick={onClick("min")}>
              {`${capitalize(k)} min `}
              {inputElement.min}m²
            </MenuItem>
          ) : undefined,
          inputElement.max || inputElement.max === 0 ? (
            <MenuItem onClick={onClick("max")}>
              {`${capitalize(k)} max `}
              {inputElement.max}m²
            </MenuItem>
          ) : undefined,
        ].filter(notEmpty);
      }
      if (["id_campanha"].includes(k)) {
        return [
          <MenuItem onClick={handleClose(k)}>
            {`${find?.attributes?.titulo}`}
          </MenuItem>,
        ].filter(notEmpty);
      }
      if (["id_filtro"].includes(k)) {
        return [
          <MenuItem onClick={handleClose(k)}>
            {
              find?.attributes?.filtros?.data?.find(
                (a: FiltroCampanha) => a.id === input.id_filtro
              )?.attributes?.titulo
            }
          </MenuItem>,
        ].filter(notEmpty);
      }
      if (["bairro", "logradouro"].includes(k)) {
        return [
          <NewComponent
            input={input}
            onClick={handleClose(k)}
            qq={localQuery}
            k={k as keyof SearchInput}
          />,
        ].filter(notEmpty);
      }
      if (k.includes("numero")) {
        const s1 = numeroTagText(input, k);
        return [<MenuItem onClick={handleClose(k)}>{s1}</MenuItem>];
      }
      if (k === "categorias") {
        return input[k]?.map((s) => {
          return [
            <MenuItem
              onClick={async () => {
                setAnchorEl(null);
                await search({
                  ...input,
                  categorias: input.categorias?.filter((c) => c !== s),
                });
              }}
            >
              {data?.find((c) => c.id === s)?.nome || ""}
            </MenuItem>,
          ];
        });
      }
      return [
        <MenuItem onClick={handleClose(k)}>
          {filterQuery.data?.caracteristicasCondominio?.find((c) => c.id === k)
            ?.text ||
            filterQuery.data?.caracteristicasImovel?.find((c) => c.id === k)
              ?.text ||
            k}
        </MenuItem>,
      ];
    })
    .filter(notEmpty)
    .flat()
    .filter((_, index: number) => index >= maxVisibleTags);
}
