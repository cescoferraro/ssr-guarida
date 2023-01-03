import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import "react-18-image-lightbox/style.css";
import { Foto } from "typings";

interface IProps {
  images: Foto[];
  onClick: (index: number) => void;
  index: number;
  step: number;
}

export const AppSliderImagesDetalhes: React.FC<IProps> = ({
  images,
  onClick,
  index,
  step,
}) => {
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  return (
    <Paper sx={{ zIndex: -10, display: "flex" }}>
      <Box
        onClick={() => onClick(index * step)}
        sx={{
          backgroundImage: `url(${images[0].foto})`,
          flexBasis: isSmallScreen ? "100%" : "50%",
          height: 500,
          backgroundSize: "cover",
          borderRight: "4px solid white",
        }}
      />
      {!isSmallScreen && (
        <>
          <Box
            sx={{
              flexBasis: "25%",
              height: 500,
              borderRight: "4px solid white",
            }}
          >
            <Box
              onClick={() => onClick(index * 5 + 1)}
              sx={{
                backgroundImage: `url(${images[1].foto})`,
                backgroundSize: "cover",
                height: "50%",
                borderBottom: "4px solid white",
              }}
            />
            <Box
              onClick={() => onClick(index * 5 + 2)}
              sx={{
                backgroundImage: `url(${images[2].foto})`,
                backgroundSize: "cover",
                height: "50%",
              }}
            />
          </Box>
          <Box
            sx={{
              flexBasis: "25%",
              height: 500,
              backgroundSize: "cover",
            }}
          >
            <Box
              onClick={() => onClick(index * 5 + 3)}
              sx={{
                backgroundImage: `url(${images[3].foto})`,
                backgroundSize: "cover",
                height: "50%",
                borderBottom: "4px solid white",
              }}
            />
            <Box
              onClick={() => onClick(index * 5 + 4)}
              sx={{
                backgroundImage: `url(${images[4].foto})`,
                backgroundSize: "cover",
                height: "50%",
              }}
            />
          </Box>
        </>
      )}
    </Paper>
  );
};
