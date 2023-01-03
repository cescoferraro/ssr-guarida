// /* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any */
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  Link,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { center } from "common/center";
import { useGuaridaCategoriaQuery } from "common/hooks/useGuaridaCategoriaQuery";
import { guaridaCurrentLocal } from "common/hooks/guaridaCurrentLocal";
import { useGuaridaLocal } from "common/hooks/useGuaridaLocal";
import {useRouter} from "next/router";
import React from "react";
// import { useParams } from "react-router-dom";
import { Cidade, SearchInput } from "typings";

interface IProps {
  input: Partial<SearchInput>;
}

export const FilterBreadcrums: React.FC<IProps> = () => {
  const theme = useTheme();
  const find = guaridaCurrentLocal(useGuaridaLocal().data);
  const favFeatureEnabled = false;
  const query = useGuaridaCategoriaQuery(true);
  const params  = useRouter().query
  const uf = (find as Cidade)?.uf;
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", pt: 1, px: 2 }}
    >
      <Box display="flex">
        <Box sx={{ ...center }}>
          <IconButton size="large" edge="start" color="default" sx={{ pr: 1 }}>
            <HomeIcon />
          </IconButton>
        </Box>
        <Box
          sx={{ ...center, display: { xs: "none", sm: "none", md: "flex" } }}
        >
          <Box display="flex">
            <Divider orientation="vertical" flexItem />
            <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ pl: 1 }}>
              <Link underline="hover" color="inherit">
                Buscar Imóveis
              </Link>
              <Link underline="hover" color="inherit">
                {find?.nome}
                {uf ? ` ${uf}` : ""}
              </Link>
              {params.categoria && query?.data && (
                <Link underline="hover" color="inherit">
                  {`${query?.data?.map((a) => a.nome).join(", ")}`}
                </Link>
              )}
            </Breadcrumbs>
          </Box>
        </Box>
      </Box>
      {favFeatureEnabled && (
        <Box sx={{ ...center, pr: 1 / 2 }}>
          <Box sx={{ ...center }}>
            <Typography>Favoritos</Typography>
          </Box>
          <Box>
            <IconButton size="large" color="default">
              <FavoriteIcon sx={{ fill: theme.palette.secondary.main }} />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};
