import { Box, Container } from "@mui/material";
import * as S from "old/home/Search/HomeSearch.styled";
import { SearchType } from "typings";
import { SearchAccordion } from "old/home/Search/SearchAccordion/SearchAccordion";
import React from "react";

export function Search() {
  const [tabIndex, setTabIndex] = React.useState<SearchType>("alugar");
  return (
    <S.BackgroundImage tabIndex={tabIndex}>
      <Container sx={{ height: "100%" }}>
        <S.Container>
          <Box sx={{ width: { md: 700 }, pb: 50 / 8 }}>
            <S.Title />
            <SearchAccordion tabIndex={tabIndex} setTabIndex={setTabIndex} />
            <S.AnuncieButton />
          </Box>
        </S.Container>
      </Container>
    </S.BackgroundImage>
  );
}
