import { Container } from "@mui/material";
import { center } from "common/center";
import { GuaridaAppBar } from "components/GuaridaAppBar/GuaridaAppBar";
import { GuaridaToolbar } from "components/GuaridaAppBar/GuaridaToolbar";
import { GuaridaFooter } from "components/GuaridaFooter/GuaridaFooter";
import { BannersCampanhaComponent } from "old/search/BannersCampanhaComponent";
import { CampanhaFiltroDialog } from "old/search/CampanhaFiltroDialog";
import { ImovelGrid } from "old/search/ImovelGrid/ImovelGrid";
import { NextButton } from "old/search/NextButton";
import { SearchFilters } from "old/search/SearchFilter/SearchFilters";
import { useChangeSearchState } from "old/search/SearchFilter/useChangeSearchState";
import { useSearchPage } from "old/search/useSearchPage";
import React from "react";
import { Categoria, LocalizacoesBySlug, SearchResponse } from "typings";

type IProps = {
  initialLocal?: LocalizacoesBySlug;
  categorias?: Categoria[];
  initialResult?: SearchResponse;
};
export const SearchPage = ({
  initialResult,
  initialLocal,
  categorias,
}: IProps) => {
  const {
    imoveis,
    input,
    query,
    loading,
    setLoading,
    total,
    ref,
    needsToSelectFilter,
  } = useSearchPage({
    initialLocal,
    categorias,
    initialResult,
  });
  console.log(input);
  const search = useChangeSearchState(ref, setLoading);
  return (
    <>
      <GuaridaAppBar />

      <GuaridaToolbar />
      <SearchFilters
        query={query}
        containerRef={ref}
        input={input}
        setLoading={setLoading}
        loading={loading}
        total={total}
      />
      <CampanhaFiltroDialog
        search={search}
        input={input}
        needsToSelectFilter={needsToSelectFilter}
      />
      {/*<SearchContainer ref={ref}>*/}
      <Container sx={{ ...center }}>
        <BannersCampanhaComponent imageType="header_busca" />
      </Container>
      <ImovelGrid loading={loading} input={input} imoveis={imoveis} />
      <NextButton containerRef={ref} query={query} />
      <GuaridaFooter />
      {/*</SearchContainer>*/}
    </>
  );
};
