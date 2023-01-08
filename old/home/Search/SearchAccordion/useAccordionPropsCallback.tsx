import { AccordionProps } from "@mui/material/Accordion/Accordion";
import * as React from "react";
import { Dispatch, SetStateAction, useCallback } from "react";

export function useAccordionPropsCallback(
  expanded: string,
  setExpanded: Dispatch<SetStateAction<string>>
): (id: string) => Partial<AccordionProps> {
  return useCallback(
    (id: string): Partial<AccordionProps> => ({
      disableGutters: true,
      expanded: expanded === id,
      onChange: (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? id : "0");
      },
    }),
    [expanded]
  );
}
