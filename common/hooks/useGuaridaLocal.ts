import {useQuery} from "@tanstack/react-query";
import {GuaridaHttpClient} from "common/GuaridaHttpClient";
import {useRouter} from "next/router";
import {Localizacoes} from "typings";

export const guaridaLocalCall = (slug?: string) => GuaridaHttpClient.get(`/localizacoes/${slug}`).then((d) => d.data);

export function useGuaridaLocal(
    local?: string,
    localizacoes?: Localizacoes,
) {
    const urlLocal = useRouter().query.localizacao;
    const slug = (local || urlLocal) as string | undefined;
    return useQuery<unknown, Error, Localizacoes>({
        queryKey: ["cidade-refresh", slug],
        queryFn: () =>
            guaridaLocalCall(slug),
        initialData: () => localizacoes
    });
}
