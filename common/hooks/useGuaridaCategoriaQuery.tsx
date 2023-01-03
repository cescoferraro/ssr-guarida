import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {GuaridaHttpClient} from "common/GuaridaHttpClient";
import {useRouter} from "next/router";
import {Categoria} from "typings";

export function categoriasPorNegocio(
    categoria?: string,
    negocio?: string,
): Promise<Categoria[]> {
    return GuaridaHttpClient.get<unknown, AxiosResponse<Categoria[]>>(
        `/categorias`,
        {
            params: {
                slugs: categoria
            },
        }
    ).then((d) =>
        d.data.filter(
            (a: Categoria) => a.negocio?.toLowerCase() === negocio?.toLowerCase()
        )
    );
}

export function useGuaridaCategoriaQuery(
    enabled = true, categorias?: Categoria[] | undefined
): UseQueryResult<Categoria[]> {
    const categoria = useRouter().query.categoria as string | undefined;
    const negocio = useRouter().query.negocio as string | undefined;
    return useQuery<unknown, Error, Categoria[]>({
        enabled,
        queryKey: [categoria, "categoria-slug", String(enabled)],
        queryFn: () => {
            return categoriasPorNegocio(categoria, negocio);
        },
        initialData: () => categorias
    });
}
