import { Box, Tab, Tabs } from "@mui/material";
import { SearchForm } from "legacy/home/Search/SearchAccordion/SearchForm/SearchForm";
import React, { Dispatch, SetStateAction } from "react";
import { SearchType } from "typings";

export interface SearchActionsFormProps {
  tabIndex: SearchType;
  setTabIndex: Dispatch<SetStateAction<SearchType>>;
}

export const SearchFormTabs: React.FC<SearchActionsFormProps> = ({
  tabIndex,
  setTabIndex,
}) => {
  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={(event, newValue) => setTabIndex(() => newValue)}
        indicatorColor="primary"
        centered
      >
        <Tab label="Alugar" value="alugar" />
        <Tab label="Comprar" value="comprar" />
      </Tabs>
      <Box>
        {tabIndex === "alugar" && (
          <SearchForm tabIndex={tabIndex} setTabIndex={setTabIndex} />
        )}
        {tabIndex === "comprar" && (
          <SearchForm tabIndex={tabIndex} setTabIndex={setTabIndex} />
        )}
      </Box>
    </>
  );
};
