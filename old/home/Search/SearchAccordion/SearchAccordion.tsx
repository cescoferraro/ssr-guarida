import { Close } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { center } from "common/center";
import * as S from "old/home/Search/SearchAccordion/SearchAccordion.styled";
import { SearchByIDForm } from "old/home/Search/SearchAccordion/SearchByIDForm/SearchByIDForm";
import { SearchFormTabs } from "old/home/Search/SearchAccordion/SearchForm/SearchFormTabs";
import { useAccordionPropsCallback } from "old/home/Search/SearchAccordion/useAccordionPropsCallback";

import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { SearchType } from "typings";

interface IProps {
  tabIndex: SearchType;
  setTabIndex: Dispatch<SetStateAction<SearchType>>;
}

export const SearchAccordion = ({ tabIndex, setTabIndex }: IProps) => {
  const [expanded, setExpanded] = React.useState<string>("0");
  const accordionProps = useAccordionPropsCallback(expanded, setExpanded);
  const expandIcon = expanded !== "1" ? <ExpandMoreIcon /> : <Close />;
  return (
    <Box sx={{ ...center, flexDirection: "column", width: "100%" }}>
      <S.AccordionCollapse in={expanded === "0"} mountOnEnter unmountOnExit>
        <S.TopAccordion callback={accordionProps("0")}>
          <AccordionDetails>
            <SearchFormTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
          </AccordionDetails>
        </S.TopAccordion>
      </S.AccordionCollapse>
      <S.AccordionCollapse in={true} mountOnEnter unmountOnExit>
        <S.BottomAccordion expanded={expanded} callback={accordionProps("1")}>
          <AccordionSummary expandIcon={expandIcon}>
            <Typography noWrap sx={{ flexShrink: 0 }}>
              Buscar por código
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SearchByIDForm />
          </AccordionDetails>
        </S.BottomAccordion>
      </S.AccordionCollapse>
    </Box>
  );
};
