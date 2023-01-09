import { Box, ButtonBase, useTheme } from "@mui/material";
import { center } from "common/center";
import { useIsSmallScreen } from "old/imovel/ImovelBody/ImovelPaper/ImovelPaper";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CampanhaImage } from "typings";
export function ImageAutoplay({
  images,
  imageType,
  screen,
}: {
  imageType?: string;
  screen?: "mobile" | "desktop";
  images: CampanhaImage[];
}) {
  const isSmallScreen = useIsSmallScreen();
  const [current, setCurrent] = useState(0);
  const max = images?.length || 0;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1 > max ? c + 1 : 0));
    }, 2000);
    return () => clearInterval(interval);
  }, [max]);
  const navigate = useRouter().push;
  const theme = useTheme();
  return (
    <Box sx={{ pb: 2, width: "100%", ...center }}>
      {images
        ?.filter((c) => (imageType ? c.tipo === imageType : true))
        ?.map((i) => {
          return {
            ...i[screen ? screen : isSmallScreen ? "mobile" : "desktop"]?.data
              ?.attributes,
            url_destino: i.url_destino,
          };
        })
        ?.filter((_, idx) => idx === current)
        ?.map((a, idx) => (
          <ButtonBase
            onClick={() => {
              if (a?.url_destino) {
                console.log(223);
                navigate(a?.url_destino, undefined, { shallow: true });
              }
            }}
            key={`${a?.url}-${idx}`}
            sx={{ width: "100%" }}
          >
            <Box
              sx={() => ({
                width: a?.width,
                height: a?.height,
                background: theme.palette.secondary.main,
                backgroundImage: `url(${a?.["url"]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              })}
            />
          </ButtonBase>
        ))}
    </Box>
  );
}
