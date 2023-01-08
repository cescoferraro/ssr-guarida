import { useMediaQuery, useTheme } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";
import { SearchResponse } from "typings";
import { useScrollFurtherDown } from "./useScrollFurtherDown";

// noinspection JSUnusedGlobalSymbols
export function useTriggerNextPageEffect(
  inView: boolean,
  query: UseInfiniteQueryResult<SearchResponse>,
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>
) {
  const notMobile = useMediaQuery(useTheme().breakpoints.not("xs"));
  React.useEffect(() => {
    if (inView && notMobile) {
      useScrollFurtherDown(gridRef);
      void query?.fetchNextPage();
    }
  }, [inView, notMobile]);
}
