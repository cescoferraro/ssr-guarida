import { GuaridaAppBar } from "components/GuaridaAppBar/GuaridaAppBar";
import { GuaridaFooter } from "components/GuaridaFooter/GuaridaFooter";
import { ImovelGrid } from "legacy/search/ImovelGrid/ImovelGrid";
import { NextButton } from "legacy/search/NextButton";
import { SearchContainer } from "legacy/search/SearchContainer";
import { SearchFilters } from "legacy/search/SearchFilter/SearchFilters";
import { useSearchPage } from "legacy/search/useSearchPage";
import React, { useRef } from "react";
import { Categoria, Localizacoes, SearchResponse } from "typings";

type IProps = {
  initialLocal?: Localizacoes;
  categorias?: Categoria[];
  initialResult?: SearchResponse;
};

export const SearchPage = ({
  initialResult,
  initialLocal,
  categorias,
}: IProps) => {
  const ref = useRef<HTMLButtonElement | undefined>();
  const { imoveis, input, query, total, setInput } = useSearchPage(
    initialResult,
    initialLocal,
    categorias
  );
  return (
    <>
      <GuaridaAppBar>
        <SearchFilters
          containerRef={ref}
          input={input}
          total={total}
          setInput={setInput}
        />
      </GuaridaAppBar>
      <SearchContainer ref={ref}>
        <h6>{query.isLoading ? "isLoading" : "notLoading"}</h6>
        <ImovelGrid input={input} imoveis={imoveis} query={query} />
        <NextButton containerRef={ref} query={query} />
        <GuaridaFooter />
      </SearchContainer>
    </>
  );
};
