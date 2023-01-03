import { Box } from "@mui/material";
import GoogleMapReact from "google-map-react";
import React from "react";

// noinspection SpellCheckingInspection
const MAPS_KEY = "AIzaSyAsXR0Vkk6iDwLFNotURsgchRiul4Phqak";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// noinspection JSUnusedLocalSymbols
function AppMaps() {
  const state = {
    center: {
      lat: -30.0088088,
      lng: -51.1086698,
    },
    zoom: 11,
  };
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAPS_KEY }}
        defaultCenter={state.center}
        defaultZoom={state.zoom}
      ></GoogleMapReact>
    </Box>
  );
}
