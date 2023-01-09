import { categoriasPorNegocio } from "common/hooks/useGuaridaCategoriaQuery";
import { currentLocalQuery } from "common/hooks/useGuaridaLocal";
import { GetServerSidePropsContext } from "next";
import { searchInfiniteQuery } from "old/search/hooks/useSearchInfiniteQuery";
import { Categoria, LocalizacoesBySlug, SearchResponse } from "typings";

export interface IResult {
  categories?: Categoria[];
  local?: LocalizacoesBySlug;
  response?: SearchResponse;
}

export async function getBuscaServerProps(
  context: GetServerSidePropsContext
): Promise<IResult> {
  console.log("===========");
  console.log(context.req.url);
  const startTime = performance.now();
  const localizacao = context.params?.localizacao as string | undefined;
  const categoria = context?.params?.categoria as string | undefined;
  const negocio = context?.params?.negocio as string | undefined;
  const [categories, local]: [Categoria[], LocalizacoesBySlug] =
    await Promise.all([
      categoriasPorNegocio(categoria, negocio),
      currentLocalQuery(localizacao),
    ]);
  const input = {
    negocio: negocio === "alugar" ? 1 : 2,
    order: "codigo-desc",
    finalidade: "Residencial",
    [local?.tipo as string]: local.id,
  };
  const response = await searchInfiniteQuery(input, 1);
  const endTime = performance.now();
  console.log(
    `Call to doSomething took ${Math.round(
      (endTime - startTime) / 1000
    )} seconds`
  );
  console.log(response.imoveis?.length);
  return {
    response,
    local,
    categories,
  };
}
