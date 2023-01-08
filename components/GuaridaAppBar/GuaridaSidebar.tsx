/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars */
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import FoundationOutlinedIcon from "@mui/icons-material/FoundationOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import RssFeedOutlinedIcon from "@mui/icons-material/RssFeedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  SxProps,
} from "@mui/material";
import { StoreComponent } from "components/GuaridaFooter/StoreComponent";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useCallback } from "react";

const currentAppUrl: string = process.env.URL || "";

const itens = [
  {
    key: "home",
    icon: <HouseOutlinedIcon />,
    label: "Página Inicial",
    action: "/",
  },
  {
    key: "rent",
    icon: <HomeOutlinedIcon />,
    label: "Alugar",
    action: "/alugar",
  },
  {
    key: "buy",
    icon: <HomeOutlinedIcon />,
    label: "Comprar",
    action: "/comprar",
  },
  {
    key: "announce",
    icon: <CottageOutlinedIcon />,
    label: "Anunciar",
    action: currentAppUrl + "/anunciar",
  },
  {
    key: "condominiums",
    icon: <MapsHomeWorkOutlinedIcon />,
    label: "Condomínios",
    action: currentAppUrl + "/condominios",
  },
  {
    key: "insurance",
    icon: <VolunteerActivismOutlinedIcon />,
    label: "Seguros",
    action: "https://www.guasegs.com.br/",
  },
  {
    key: "support",
    icon: <SupportAgentOutlinedIcon />,
    label: "Fale Conosco",
    action: currentAppUrl + "/institucional/fale-conosco",
  },
  {
    key: "emergency",
    icon: <NotificationsActiveOutlinedIcon />,
    label: "Emergência Condominial",
    action: currentAppUrl + "/condominios/emergencia-condominial",
  },
  {
    key: "help",
    icon: <HelpOutlineOutlinedIcon />,
    label: "Perguntas Frequentes",
    action: "https://g.guarida.com.br/faq",
  },
  {
    key: "place",
    icon: <PlaceOutlinedIcon />,
    label: "Agências",
    action: currentAppUrl + "/institucional/agencias",
  },
  {
    key: "rate",
    icon: <AutoAwesomeOutlinedIcon />,
    label: "Avalie Nossos Serviços",
    action:
      "https://forms.office.com/pages/responsepage.aspx?id=nnAi80MDLkWoRqOkFh7OFwNgTTY7-H1Oj-GcO6A6PE9URUxYTTNZRlM0MTFWQkRRVTI2OUVROEZNRC4u",
  },
  {
    key: "carrier",
    icon: <ContactPageOutlinedIcon />,
    label: "Guarida Carreiras",
    action: "https://guaridacarreiras.gupy.io/",
  },
  {
    key: "realtor",
    icon: <HailOutlinedIcon />,
    label: "Seja um corretor associado",
    action: "https://g.guarida.com.br/corretor-associado",
  },
  {
    key: "blog",
    icon: <RssFeedOutlinedIcon />,
    label: "Blog",
    action: "https://blog.guarida.com.br/",
  },
  {
    key: "institutional",
    icon: <FoundationOutlinedIcon />,
    label: "Institucional",
    action: currentAppUrl + "/institucional",
  },
];

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const mt: SxProps = { sx: 56 / 8, sm: 64 / 8, md: 100 / 8 };

export const GuaridaSidebar: React.FC<IProps> = ({ open, setOpen }) => {
  const onClose = useCallback(() => setOpen((s) => !s), [setOpen]);
  const navigate = useRouter().push;
  return (
    <SwipeableDrawer
      sx={{ "&": { mt } }}
      PaperProps={{
        sx: { backgroundColor: "transparent", mt, height: "100%" },
      }}
      BackdropProps={{ sx: { mt } }}
      transitionDuration={500}
      anchor={"left"}
      open={open}
      onClose={onClose}
      onOpen={onClose}
    >
      <Box sx={{ background: "white", height: "100%" }}>
        <List sx={{ height: "100%", p: 0 }}>
          {itens.map((i) => (
            <ListItem
              key={i.key}
              disablePadding
              style={{ borderBottom: "1px solid #E5E5E5" }}
            >
              <ListItemButton onClick={() => navigate(i.action)}>
                <ListItemIcon>{i.icon}</ListItemIcon>
                <ListItemText primary={i.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <StoreComponent sx={{ py: 8 }} />
        </List>
      </Box>
    </SwipeableDrawer>
  );
};
