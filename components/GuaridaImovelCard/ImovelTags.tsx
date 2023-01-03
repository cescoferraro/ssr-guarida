import { Box, Chip, Skeleton } from "@mui/material";
import { notEmpty } from "common/notEmpty";
import React from "react";
import { Imovel } from "typings";

export const ImovelTags = ({ imovel }: { imovel?: Imovel }) => {
  const hasDiscount = (imovel?.valor_anterior_num || 0) > 0;
  return (
    <Box sx={{ height: 64, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {imovel ? (
          <>
            {[
              imovel?.tag_exclusivo
                ? { label: "Guarida Exclusive", color: "primary" }
                : undefined,
              hasDiscount
                ? { label: "Melhor Preço", color: "default" }
                : undefined,
            ]
              .filter(notEmpty)
              .map((s, index) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={`${imovel.id}-${index}-${s.label}`}
                  >
                    <Chip
                      sx={{
                        height: 16,
                        mt: index === 0 ? 0 : 1,
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
          <Box sx={{ px: 12 }}>
            <Skeleton height={16} width="100%" variant="rectangular" />
            <Skeleton
              sx={{ mt: 2 }}
              height={16}
              width="100%"
              variant="rectangular"
            />
            <Skeleton
              sx={{ mt: 2 }}
              height={16}
              width="100%"
              variant="rectangular"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
