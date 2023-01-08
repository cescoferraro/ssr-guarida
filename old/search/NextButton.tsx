import { Box, Button } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { SearchResponse } from "typings";

interface IProps {
  query: UseInfiniteQueryResult<SearchResponse>;
  containerRef: React.MutableRefObject<HTMLButtonElement | undefined>;
}

export function NextButton({ query }: IProps) {
  const view = useInView();
  const next = {
    shouldDisplay: !(!query.hasNextPage && !query.isFetchingNextPage),
    disabled: !query.hasNextPage || query.isFetchingNextPage,
    onClick: () => query.fetchNextPage(),
    text: query.isFetchingNextPage
      ? "Carregando..."
      : query.hasNextPage
      ? "Mostrar mais"
      : "Nothing more to load",
  };
  // useTriggerNextPageEffect(view.inView, query, containerRef);
  return next.shouldDisplay ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Button
        ref={view.ref}
        onClick={next.onClick}
        disabled={next.disabled}
        variant="contained"
        color="secondary"
      >
        {next.text}
      </Button>
    </Box>
  ) : null;
}
