import { Box } from "@mui/material";
import { CategoriaLoginField } from "legacy/home/Search/SearchAccordion/SearchForm/CategoriaLoginField";
import { LoginLocalField } from "legacy/home/Search/SearchAccordion/SearchForm/LoginLocalField";
import { LoginSubmitButton } from "legacy/home/Search/SearchAccordion/SearchForm/LoginSubmitButton";
import { SearchFormContainer } from "legacy/home/Search/SearchAccordion/SearchForm/SearchFormContainer";
import { useLoginFormik } from "legacy/home/Search/SearchAccordion/SearchForm/useLoginFormik";
import React, { Dispatch, SetStateAction } from "react";
import { SearchType } from "typings";

interface IProps {
  tabIndex: SearchType;
  setTabIndex: Dispatch<SetStateAction<SearchType>>;
}

export const SearchForm: React.FC<IProps> = ({ tabIndex }) => {
  const formik = useLoginFormik(tabIndex);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ pt: 2 }}>
        <SearchFormContainer>
          <CategoriaLoginField formik={formik} searchType={tabIndex} />
          <LoginLocalField formik={formik} />
          <LoginSubmitButton formik={formik} />
        </SearchFormContainer>
      </Box>
    </form>
  );
};
