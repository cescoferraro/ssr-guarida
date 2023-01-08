import { ChevronRight } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import {
  Box,
  Button,
  Divider,
  experimental_sx,
  IconButton,
  Menu,
  MenuItem as MenuItemMUI,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { center } from "common/center";
import React, { Dispatch, SetStateAction } from "react";

function NewComponent({
  children,
  title,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Box sx={{ flexBasis: "40%", maxWidth: 250 }}>
        <Typography>{title}</Typography>
        <Typography
          sx={{
            wordWrap: "break-word",
          }}
          fontSize={12}
        >
          {children}
        </Typography>
      </Box>
      <Box sx={{ ...center }}>
        <ChevronRight />
      </Box>
    </>
  );
}
const MenuItem = styled(MenuItemMUI)(() =>
  experimental_sx({
    display: "flex",
    justifyContent: "space-between",
  })
);

export function GuaridaAppBarActions({
  setBoleto,
}: {
  setBoleto: Dispatch<SetStateAction<boolean>>;
}) {
  const isSm = useMediaQuery(useTheme().breakpoints.only("sm"));
  const isXs = useMediaQuery(useTheme().breakpoints.only("xs"));
  const smallAtLeast = !(isSm || isXs);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = () => {
    // event: React.MouseEvent<HTMLButtonElement>
    // setAnchorEl(event.currentTarget);
    window.location.href = "https://agenciavirtual.guarida.com.br/";
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Button
        sx={{
          ml: 1,
          py: 4 / 8,
          fontSize: 11,
          textTransform: "none",
          color: "black",
          whiteSpace: "nowrap",
          minWidth: "auto",
          borderRadius: 10,
          boxShadow: "none !important",
          background: "#e7e4e4",
          "&:hover": { background: "#e7e4e4" },
        }}
        onClick={() => setBoleto((s) => !s)}
        startIcon={<ReceiptOutlinedIcon />}
        fullWidth={false}
        variant={"contained"}
      >
        {smallAtLeast ? "2ª Via de Boleto" : "Boleto"}
      </Button>
      <Box sx={{ pl: 1 }}>
        {smallAtLeast ? (
          <Button
            sx={{
              py: 4 / 8,
              fontSize: 11,
              textTransform: "none",
              whiteSpace: "nowrap",
              minWidth: "auto",
              borderRadius: 10,
              ml: 1,
            }}
            onClick={handleClick}
            startIcon={<PersonIcon />}
            fullWidth={false}
            variant={"outlined"}
            color="primary"
          >
            Agência Virtual
          </Button>
        ) : (
          <IconButton
            onClick={handleClick}
            sx={{
              // py: 4 / 8,
              width: 36,
              height: 36,
              fontSize: 11,
              background: "#e7e4e4",
              "&:hover": {
                background: "#e7e4e4",
              },
            }}
          >
            <PersonIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        // sx={{ width: 267 }}
      >
        <MenuItem onClick={handleClose} sx={{ display: "flex" }}>
          <NewComponent title={"Área do Visitante"}>
            <>
              Gerencie e personalize a busca de <br />
              imóveis, favoritos, visitas, propostas e <br />
              notificações
            </>
          </NewComponent>
        </MenuItem>
        <Divider sx={{ my: "0px !important", mx: 2 }} />
        <MenuItem onClick={handleClose} sx={{ display: "flex" }}>
          <NewComponent title={"Área do Proprietário"}>
            <>
              Gerencie seus imóveis, estatísticas e <br /> contatos com seu
              Gestor
            </>
          </NewComponent>
        </MenuItem>
        <Divider sx={{ my: "0px !important", mx: 2 }} />
        <MenuItem onClick={handleClose} sx={{ display: "flex" }}>
          <NewComponent title={"Área do Corretor"} />
        </MenuItem>
        <Divider sx={{ my: "0px !important", mx: 2 }} />
        <MenuItem onClick={handleClose} sx={{ display: "flex" }}>
          <NewComponent title={"Agência Virtual"}>
            <>
              Se você já é cliente Guarida, acesse a<br /> sua conta! Síndicos,
              inquilinos,
              <br /> proprietários, moradores, funcionários
            </>
          </NewComponent>
        </MenuItem>
      </Menu>
    </Box>
  );
}
