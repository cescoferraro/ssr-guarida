import { Box, Breadcrumbs, Divider, Link, SxProps } from "@mui/material";
import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";
import { components } from "guarida";
import { capitalize } from "lodash";
import { LocalBreadcrumb } from "old/search/SearchFilter/FilterBreadcrums/LocalBreadcrumb";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import { useNextParams } from "old/search/useNextParams";
import React from "react";

interface IProps {
  sx?: SxProps;
}

type BreadCrumb = components["schemas"]["BreadcrumbItem"];

export function BreadcrumbsGuarida({ sx }: IProps) {
  const p = useNextParams();
  const q = useCampanhasQuery();
  const { data } = useGuaridaLocal();
  const isCampanha = p.campanha !== "busca";

  const url = (b: BreadCrumb) =>
    location.pathname.replace(p.local || "", b?.slug || "");
  return (
    <Box sx={{ ...sx }}>
      <Box display="flex">
        <Divider orientation="vertical" flexItem />
        <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ pl: 1 }}>
          <Link underline="hover" color="inherit" href={`/${p?.negocio}`}>
            {capitalize(p.negocio as string)}
          </Link>
          {(!isCampanha &&
            data?.breadcrumb
              ?.filter((b) => b.tipo !== "bairro")
              .map((b) => {
                return (
                  <LocalBreadcrumb
                    key={b?.slug}
                    name={b?.nome || ""}
                    href={url(b) || ""}
                  />
                );
              })) ||
            []}
          {isCampanha ? (
            <Link underline="hover" color="inherit">
              {
                q?.data?.find((a) => a?.attributes.slug === p.campanha)
                  ?.attributes?.titulo
              }
            </Link>
          ) : null}
        </Breadcrumbs>
      </Box>
    </Box>
  );
}
