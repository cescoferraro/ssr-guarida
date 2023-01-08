import { Box, Chip, Skeleton } from "@mui/material";
import { notEmpty } from "common/notEmpty";
import React from "react";
import { Imovel } from "typings";

export const ImovelTags = ({ imovel }: { imovel?: Imovel }) => {
  const hasDiscount = (imovel?.valor_anterior_num || 0) > 0;
  return (
    <Box sx={{ height: 16, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {imovel ? (
          <>
            {[
              imovel?.tag_exclusivo
                ? { label: "Guarida Exclusive", color: "secondary" }
                : undefined,
              hasDiscount
                ? { label: "Melhor Preço", color: "default" }
                : undefined,
            ]
              .filter(notEmpty)
              .filter((_, idx) => idx <= 1)
              .map((s, index) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                    key={`${imovel.id}-${index}-${s.label}`}
                  >
                    <Chip
                      sx={{
                        height: 16,
                        ml: index === 0 ? 0 : 1,
                        borderRadius: 0,
                      }}
                      label={s.label}
                      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                      color={(s.color as any) || "default"}
                    />
                  </Box>
                );
              })}
          </>
        ) : (
          <>
            <Skeleton height={16} width="20%" variant="rectangular" />
            <Skeleton
              sx={{ ml: 2 }}
              height={16}
              width="20%"
              variant="rectangular"
            />
          </>
        )}
      </Box>
    </Box>
  );
};
