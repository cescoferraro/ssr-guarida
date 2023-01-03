import { Stack, styled } from "@mui/material";

export const Stacked = styled(Stack)`
  padding-bottom: 10px;
  && {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
