import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {GuaridaHttpClient} from "common/GuaridaHttpClient";
import {capitalize} from "lodash";
import {useRouter} from "next/router";
import {FilterByCategory, SearchInput} from "typings";

export function useCategoriaFilterQuery(
    drawerState: Partial<SearchInput>,
    localCategory?: string
): UseQueryResult<FilterByCategory, Error> {
    const cat = useRouter().query.categoria as string | undefined;
    const categoria = localCategory || cat;
    const urlSearchParams = new URLSearchParams({
        categoria: categoria || "",
        finalidade: capitalize(drawerState.finalidade || ""),
    });
    return useQuery<unknown, Error, FilterByCategory>({
        enabled: Boolean(categoria),
        queryKey: ["categorias/filtros", urlSearchParams.toString()],
        queryFn: () =>
            GuaridaHttpClient.get(
                `/categorias/filtros?${urlSearchParams.toString()}`
            ).then((d) => d.data),
    });
}
