import { Container } from "@mui/material";
import { center } from "common/center";
import { GuaridaAppBar } from "components/GuaridaAppBar/GuaridaAppBar";
import { GuaridaToolbar } from "components/GuaridaAppBar/GuaridaToolbar";
import { GuaridaFooter } from "components/GuaridaFooter/GuaridaFooter";
import { CampanhaFiltroDialog } from "old/search/CampanhaFiltroDialog";
import { ImovelGrid } from "old/search/ImovelGrid/ImovelGrid";
import { NextButton } from "old/search/NextButton";
import { SearchBannerCampanha } from "old/search/SearchBannerCampanha";
import { SearchFilters } from "old/search/SearchFilter/SearchFilters";
import { SearchInputContext } from "old/search/searchInputContext";
import { useSearchPage } from "old/search/useSearchPage";
import React from "react";
import { Categoria, LocalizacoesBySlug, SearchResponse } from "typings";

interface IProps {
  categories?: Categoria[];
  local?: LocalizacoesBySlug;
  response?: SearchResponse;
}

export const SearchPage = ({ categories, response, local }: IProps) => {
  const { imoveis, input, query, total, setInput } = useSearchPage({
    local,
    categories,
    response,
  });
  return (
    <SearchInputContext.Provider value={[input, setInput]}>
      <GuaridaAppBar />
      <GuaridaToolbar />
      <SearchFilters query={query} input={input} total={total} />
      <CampanhaFiltroDialog input={input} />
      <Container sx={{ ...center }}>
        <h6>{JSON.stringify(input)}</h6>
      </Container>
      <SearchBannerCampanha />
      <ImovelGrid input={input} imoveis={imoveis} />
      <NextButton query={query} />
      <GuaridaFooter />
    </SearchInputContext.Provider>
  );
};
