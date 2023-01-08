import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { chunk } from "lodash";
import { BannerModal } from "old/home/Banners/BannerModal";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import React, { useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { CampanhaImage } from "typings";

// import "./banners.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        backgroundColor: "#000000",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "0.8",
        userSelect: "none",
        border: "none",
      }}
    >
      {children}
    </button>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators } =
    React.useContext(VisibilityContext);
  const initialDisabled = !visibleItemsWithoutSeparators.length;
  const [disabled, setDisabled] = React.useState(
    initialDisabled && !isFirstItemVisible
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <ChevronLeft color="secondary" />
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <ChevronRight color="secondary" />
    </Arrow>
  );
}

export const Banners = () => {
  const [initialized, setInitialized] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState(0);
  const [position, setPosition] = React.useState(0);
  const isBigScreen = useMediaQuery(useTheme().breakpoints.up("md"));
  const q = useCampanhasQuery();
  const optionalParams: CampanhaImage[2][] = chunk(
    q.data
      ?.map((c) => c.attributes?.imagens)
      .flat()
      .filter((c) => ["banner_home", "banner_home_thumb"].includes(c.tipo)),
    2
  );
  useEffect(() => {
    if (!initialized) {
      setOpen(true);
      setIndex(0);
      setInitialized(true);
    }
  }, [optionalParams, initialized]);
  return (
    <>
      <Box sx={{ py: 4 }}>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          onWheel={onWheel}
          onInit={React.useCallback(
            ({
              scrollContainer,
            }: // getItemById,
            scrollVisibilityApiType) => {
              if (scrollContainer.current) {
                scrollContainer.current.scrollLeft = position;
              }
            },
            [position]
          )}
          onScroll={React.useCallback(
            ({ scrollContainer }: scrollVisibilityApiType) =>
              !!scrollContainer.current &&
              setPosition(scrollContainer.current.scrollLeft),
            []
          )}
          scrollContainerClassName={
            isBigScreen ? "bigBannerContainer" : "bannerContainer"
          }
        >
          {optionalParams.map(([b], idx) => {
            const attributes = b?.desktop?.data?.attributes;
            return (
              <Box
                key={attributes?.url}
                height={attributes?.height}
                width={attributes?.width}
                sx={{
                  backgroundImage: `url(${attributes?.url})`,
                  width: attributes?.width,
                  height: attributes?.height,
                  backgroundSize: "auto",
                }}
                onClick={() => {
                  setIndex(idx);
                  setOpen((s) => !s);
                }}
              />
            );
          })}
        </ScrollMenu>
      </Box>
      <BannerModal
        all={optionalParams}
        open={open}
        index={index}
        onClose={() => setOpen((s) => !s)}
      />
    </>
  );
};
