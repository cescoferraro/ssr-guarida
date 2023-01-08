import { Box, Tab, Tabs } from "@mui/material";
import { SearchForm } from "old/home/Search/SearchAccordion/SearchForm/SearchForm";
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
        indicatorColor="secondary"
        centered
      >
        <Tab
          sx={{
            color: "black !important",
            opacity: tabIndex === "alugar" ? 1 : 0.5,
          }}
          label="Alugar"
          value="alugar"
        />
        <Tab
          sx={{
            color: "black !important",
            opacity: tabIndex === "comprar" ? 1 : 0.5,
          }}
          label="Comprar"
          value="comprar"
        />
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
