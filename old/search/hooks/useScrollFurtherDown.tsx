import React from "react";

export function useScrollFurtherDown(
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>
) {
  setTimeout(() => {
    const current = gridRef?.current;
    if (gridRef.current?.scrollHeight) {
      current?.scroll({
        top: gridRef.current?.scrollHeight - 2055 - 700,
        behavior: "smooth",
      });
    }
  }, 500);
}
