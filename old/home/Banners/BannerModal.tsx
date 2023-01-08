import { Close } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { center } from "common/center";
import { useIsSmallScreen } from "old/imovel/ImovelBody/ImovelPaper/ImovelPaper";
import React from "react";
import { useRouter } from "next/router";
import { CampanhaImage } from "typings";

interface IProps {
  all: CampanhaImage[2][];
  open: boolean;
  onClose: () => void;
  index: number;
}

function useView(desktop: CampanhaImage) {
  const b = useIsSmallScreen();
  const desktopElement = desktop?.["desktop"]?.data;
  const mobileElement = desktop?.["mobile"]?.data;
  return b ? (mobileElement ? mobileElement : desktopElement) : desktopElement;
}

export const BannerModal: React.FC<IProps> = ({
  onClose,
  open,
  index,
  all,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, desktop] = all[index] || [];
  const navigate = useRouter().push;
  const view1 = useView(desktop);
  return (
    <Modal open={open} onClose={onClose} sx={{ ...center }}>
      <Box
        sx={{
          width: "100%",
          ...center,
          justifyContent: "space-between",
          outline: "none",
        }}
      >
        <Box sx={{ flexBasis: "100%", ...center }}>
          <Box>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  display: "flex",
                  position: "absolute",
                  right: 10,
                  top: 10,
                }}
              >
                <IconButton onClick={onClose}>
                  <Close />
                </IconButton>
              </Box>
            </Box>
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
              onClick={() => navigate(desktop?.url_destino)}
              src={view1?.attributes?.url}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
