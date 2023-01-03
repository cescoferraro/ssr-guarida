import { experimental_sx, styled } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import { AccordionProps } from "@mui/material/Accordion/Accordion";
import Collapse from "@mui/material/Collapse";

import * as React from "react";

export function TopAccordion({
  children,
  callback,
}: {
  children: NonNullable<React.ReactNode>;
  callback: Partial<AccordionProps>;
}) {
  return (
    <Accordion
      {...callback}
      sx={{
        borderBottomRightRadius: "0px !important",
        borderBottomLeftRadius: "0px !important",
      }}
    >
      {children}
    </Accordion>
  );
}
export function BottomAccordion({
  expanded,
  children,
  callback,
}: {
  children: NonNullable<React.ReactNode>;
  expanded: string;
  callback: Partial<AccordionProps>;
}) {
  return (
    <Accordion
      {...callback}
      sx={{
        borderTopRightRadius: expanded === "1" ? 0 : "0px !important",
        borderTopLeftRadius: expanded === "1" ? 0 : "0px !important",
        width: "100%",
        maxWidth: {
          xs: "80vw",
          sm: "80vw",
          md: "715px",
        },
      }}
    >
      {children}
    </Accordion>
  );
}
export const AccordionCollapse = styled(Collapse)(
  experimental_sx({
    width: "100%",
    maxWidth: {
      xs: "80vw",
      sm: "80vw",
      md: "715px",
    },
  })
);
