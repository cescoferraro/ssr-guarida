import { Box } from "@mui/material";
import { CategoriaLoginField } from "old/home/Search/SearchAccordion/SearchForm/CategoriaLoginField";
import { LoginLocalField } from "old/home/Search/SearchAccordion/SearchForm/LoginLocalField";
import { LoginSubmitButton } from "old/home/Search/SearchAccordion/SearchForm/LoginSubmitButton";
import { SearchFormContainer } from "old/home/Search/SearchAccordion/SearchForm/SearchFormContainer";
import { useLoginFormik } from "old/home/Search/SearchAccordion/SearchForm/useLoginFormik";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { SearchType } from "typings";

interface IProps {
  tabIndex: SearchType;
  setTabIndex: Dispatch<SetStateAction<SearchType>>;
}

export const SearchForm: React.FC<IProps> = ({ tabIndex }) => {
  const formik = useLoginFormik(tabIndex);
  useEffect(() => {
    formik.setValues({ categoria: null, local: null });
  }, [tabIndex]);
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
