import { UseQueryResult } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction } from "react";
import Lightbox from "react-18-image-lightbox";
import { Imovel } from "typings";
// import "./lighbox.css";

interface IProps {
  setState: Dispatch<SetStateAction<{ isOpen: boolean; photoIndex: number }>>;
  query: UseQueryResult<Imovel>;
  state: { isOpen: boolean; photoIndex: number };
}

export function ImovelFotosLightbox({ state, query, setState }: IProps) {
  const imagesList = query?.data?.fotos || [];
  return (
    <>
      {state.isOpen && (
        <Lightbox
          enableZoom={false}
          clickOutsideToClose={true}
          mainSrc={imagesList[state.photoIndex].foto || ""}
          nextSrc={
            imagesList[(state.photoIndex + 1) % imagesList.length].foto || ""
          }
          prevSrc={
            imagesList[
              (state.photoIndex + imagesList.length - 1) % imagesList.length
            ].foto || ""
          }
          onCloseRequest={() => setState((st) => ({ ...st, isOpen: false }))}
          onMovePrevRequest={() =>
            setState((s) => ({
              ...s,
              photoIndex:
                (state.photoIndex + (query?.data?.fotos || []).length - 1) %
                (query?.data?.fotos || []).length,
            }))
          }
          onMoveNextRequest={() =>
            setState((s) => ({
              ...s,
              photoIndex:
                (state.photoIndex + 1) % (query?.data?.fotos || []).length,
            }))
          }
        />
      )}
    </>
  );
}
