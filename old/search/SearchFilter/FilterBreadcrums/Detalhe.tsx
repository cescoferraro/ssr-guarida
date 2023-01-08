import { Box, Breadcrumbs, Divider, Link, SxProps } from "@mui/material";
import { useGuaridaCategoriaQuery } from "common/hooks/useGuaridaCategoriaQuery";
import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import { LocalBreadcrumb } from "old/search/SearchFilter/FilterBreadcrums/LocalBreadcrumb";
import { useNextParams } from "old/search/useNextParams";
import React from "react";

export function Detalhe({
  sx,
  children,
}: {
  children?: React.ReactNode;
  sx?: SxProps;
}) {
  const query = useGuaridaCategoriaQuery();
  const navigate = useRouter().push;
  const p = useNextParams();
  const { data } = useGuaridaLocal();
  const breadcrums = data?.breadcrumb;
  const bairroCrumb = breadcrums?.find((b) => b.tipo === "bairro");
  const campanha = "busca";
  return (
    <Box sx={{ ...sx }}>
      <Box display="flex" sx={{ flexWrap: "no-wrap" }}>
        <Divider orientation="vertical" flexItem />
        <Breadcrumbs
          aria-label="breadcrumb"
          separator="›"
          sx={{ pl: 1, flexWrap: "nowrap" }}
        >
          <Link
            onClick={() => navigate(`/${p?.negocio}`)}
            underline="hover"
            color="inherit"
          >
            {capitalize(p.negocio)}
          </Link>
          {data?.breadcrumb
            ?.filter((b) => b.tipo !== "bairro")
            .map((b) => {
              return (
                <LocalBreadcrumb
                  key={b?.slug}
                  name={b?.nome || ""}
                  onClick={() => {
                    const url = `/${campanha}/${p.negocio}/${b?.slug}`;
                    navigate(url);
                  }}
                />
              );
            }) || []}
          {p.categoria && query?.data && (
            <LocalBreadcrumb
              onClick={() => {
                const url = `/${campanha}/${p.negocio}/${
                  bairroCrumb?.slug || p.local
                }/${query?.data?.map((a) => a.slug)?.join("+")}`;
                navigate(url);
              }}
              name={`${query?.data?.map((a) => a.nome)?.join(", ")}${
                bairroCrumb ? ` em ${bairroCrumb?.nome}` : ""
              }`}
            />
          )}
          {children}
        </Breadcrumbs>
      </Box>
    </Box>
  );
}
