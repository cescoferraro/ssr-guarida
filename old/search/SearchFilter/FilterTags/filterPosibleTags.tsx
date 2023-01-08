import { UseQueryResult } from "@tanstack/react-query";
import { useNextParams } from "old/search/useNextParams";
import { FilterByCategory, SearchInput } from "typings";

export function filterPosibleTags(
  isSuccess: false | true,
  filterQuery: UseQueryResult<FilterByCategory, Error>,
  input: Partial<SearchInput>
) {
  const removeOrderTag = (remove: (keyof SearchInput)[]) => (k: string) =>
    !remove.includes(k as keyof SearchInput);
  const categoria = useNextParams().categoria;
  const strings =
    isSuccess && (categoria ? filterQuery.isSuccess : true)
      ? Object.keys(input)
      : [];
  const tabs: (keyof SearchInput)[] = [
    "order",
    "endereco",
    "finalidade",
    "negocio",
    "tipo",
    "estado",
  ];
  return [
    ...strings.filter(removeOrderTag(tabs)).filter((a) => a === "cidade"),
    ...strings.filter(removeOrderTag(tabs)).filter((a) => a !== "cidade"),
  ];
}
