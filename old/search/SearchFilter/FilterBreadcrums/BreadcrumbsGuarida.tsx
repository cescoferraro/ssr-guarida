import { Box, Breadcrumbs, Divider, Link, SxProps } from "@mui/material";
import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import { LocalBreadcrumb } from "old/search/SearchFilter/FilterBreadcrums/LocalBreadcrumb";
import { useCampanhasQuery } from "old/search/useCampanhasQuery";
import { useNextParams } from "old/search/useNextParams";
import React from "react";
import { SearchInput } from "typings";

interface IProps {
  sx?: SxProps;
  input: Partial<SearchInput>;
}

export function BreadcrumbsGuarida({ sx, input }: IProps) {
  const p = useNextParams();
  const navigate = useRouter().push;
  const q = useCampanhasQuery();
  const { data } = useGuaridaLocal();
  const isCampanha = p.campanha !== "busca";
  return (
    <Box sx={{ ...sx }}>
      <Box display="flex">
        <Divider orientation="vertical" flexItem />
        <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ pl: 1 }}>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => {
              // , { state: input }
              navigate(`/${p?.negocio}`);
            }}
          >
            {capitalize(p.negocio)}
          </Link>
          {(!isCampanha &&
            data?.breadcrumb
              ?.filter((b) => b.tipo !== "bairro")
              .map((b) => {
                return (
                  <LocalBreadcrumb
                    key={b?.slug}
                    name={b?.nome || ""}
                    onClick={() => {
                      const url = location.pathname.replace(
                        p.local || "",
                        b?.slug || ""
                      );
                      navigate(url, { state: input });
                    }}
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
