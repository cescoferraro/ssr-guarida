import ArrowBackIosIcon from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon/SvgIcon";
import { useChangeSearchState } from "legacy/search/SearchFilter/useChangeSearchState";
import React, { Dispatch, SetStateAction } from "react";
import { SearchInput } from "typings";
import { RoundedSelect } from "./RoundedSelect";

interface IProps {
  gridRef: React.MutableRefObject<HTMLButtonElement | undefined>;
  input: Partial<SearchInput>;
  setInput: Dispatch<SetStateAction<Partial<SearchInput>>>;
}

export const PropertyFilterFooterOrder: React.FC<IProps> = ({
  setInput,
  gridRef,
  input,
}) => {
  const search = useChangeSearchState(gridRef, setInput);
  return (
    <RoundedSelect
      select
      size="small"
      SelectProps={{
        IconComponent: (props: SvgIconProps) => (
          <ArrowBackIosIcon {...props} fontSize={"small"} />
        ),
      }}
      id="demo-simple-select"
      value={input.order}
      onChange={async (event) => {
        const order = event.target.value;
        console.log(order);
        await search({ ...input, order: order });
      }}
    >
      {[
        {
          id: "codigo-desc",
          label: "Mais relevantes",
        },
        {
          id: "distancia-asc",
          label: "Mais próximos",
        },
        {
          id: "preco-asc",
          label: "Maior valor",
        },
        {
          id: "preco-desc",
          label: "Menor valor",
        },
      ].map((d) => (
        <MenuItem key={d.id} value={d.id}>
          {d.label}
        </MenuItem>
      ))}
    </RoundedSelect>
  );
};
