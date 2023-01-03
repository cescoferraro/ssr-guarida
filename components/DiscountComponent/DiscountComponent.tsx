import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, Divider, Typography } from "@mui/material";
import { center } from "common/center";
import React from "react";
import { Imovel } from "typings";

export function DiscountComponent({ imovel }: { imovel?: Imovel }) {
  const hasDiscount = (imovel?.valor_anterior_num || 0) > 0;
  return (
    <>
      {hasDiscount && (
        <Box display="flex" justifyContent="flex-end">
          <Typography sx={{ color: "#7180A9" }} align="right" fontSize={12}>
            {imovel?.valor_anterior_txt}
          </Typography>
          <Box sx={{ ...center, px: 0.5 }}>
            <Divider
              orientation="vertical"
              color={"primary"}
              sx={{ height: 10, borderColor: "#CCCCCC" }}
            />
          </Box>
          <Typography sx={{ color: "#7180A9" }} align="right" fontSize={12}>
            {Math.floor(
              (((imovel?.valor_total_num || 0) -
                (imovel?.valor_anterior_num || 0)) /
                (imovel?.valor_total_num || 0)) *
                100
            )}
            %
            <ArrowDownwardIcon sx={{ width: 8, height: 8 }} />
          </Typography>
        </Box>
      )}
    </>
  );
}
