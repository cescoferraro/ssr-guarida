import { guaridaCurrentLocal } from "common/hooks/guaridaCurrentLocal";
import { categoriasPorNegocio } from "common/hooks/useGuaridaCategoriaQuery";
import { guaridaLocalCall } from "common/hooks/useGuaridaLocal";
import { searchInfiniteQuery } from "legacy/search/hooks/useSearchInfiniteQuery";
import { getSearchInput } from "legacy/search/hooks/useSearchInput";
import { SearchPage as SearchPageComponent } from "legacy/search/SearchPage";
import { GetServerSidePropsContext } from "next";
import { Categoria, Localizacoes, SearchResponse } from "typings";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const startTime = performance.now();
  console.log("initial");

  const localizacao = context.params?.localizacao as string | undefined;
  const categoria = context?.params?.categoria as string | undefined;
  const negocio = context?.params?.negocio as string | undefined;
  const [categorias, initialLocal] = await Promise.all([
    categoriasPorNegocio(categoria, negocio),
    guaridaLocalCall(localizacao),
  ]);

  const endTime = performance.now();
  console.log(
    `Call to doSomething took ${Math.round(
      (endTime - startTime) / 1000
    )} seconds`
  );
  const currentLocal = guaridaCurrentLocal(initialLocal);

  const input = getSearchInput(
    categorias.map((c) => c.id || 0),
    currentLocal?.id,
    currentLocal?.bairro?.id,
    negocio
  );
  const initialResult = await searchInfiniteQuery(input, 1);

  const eendTime = performance.now();
  console.log(
    `Call to doSomething took ${Math.round(
      (eendTime - endTime) / 1000
    )} seconds`
  );
  return {
    props: { initialResult, initialLocal, categorias },
  };
}

export default function SearchPage({
  initialResult,
  initialLocal,
  categorias,
}: {
  categorias?: Categoria[];
  initialLocal?: Localizacoes;
  initialResult?: SearchResponse;
}): React.ReactNode {
  return (
    <SearchPageComponent
      categorias={categorias}
      initialResult={initialResult}
      initialLocal={initialLocal}
    />
  );
}
