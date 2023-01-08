import { Box } from "@mui/material";
import { useCategorySlugByIDSMutation } from "common/hooks/useCategorySlugByIDSMutation";
import React, { Dispatch, SetStateAction } from "react";
import { Categoria, SearchInput } from "typings";
import { WeirdButton } from "old/search/SearchFilter/FilterDrawer/WeirdButton";

interface IProps {
  drawerState: Partial<SearchInput>;
  setDrawerState: Dispatch<SetStateAction<Partial<SearchInput>>>;
  data: Categoria[] | undefined;
  setLocalCategory: Dispatch<SetStateAction<string | undefined>>;
}

export const CategoryFilter: React.FC<IProps> = ({
  data,
  drawerState,
  setDrawerState,
  setLocalCategory,
}) => {
  const m = useCategorySlugByIDSMutation();
  return (
    <Box>
      {(data || []).map((a) => {
        const cats = drawerState.categorias || [];
        const selected = cats.includes(Number(a?.id));
        return (
          <WeirdButton
            key={a?.nome}
            sx={{ mr: 10 / 8, mb: 10 / 8 }}
            label={a?.nome || ""}
            isSelected={selected}
            onClick={async () => {
              const categoria = selected
                ? drawerState.categorias?.filter((c) => c !== Number(a?.id))
                : [...(drawerState?.categorias || []), Number(a?.id)];
              const slug = await m.mutateAsync(categoria || []);
              setLocalCategory(slug?.slug || "");
              setDrawerState((s) => ({ ...s, categorias: categoria }));
            }}
          />
        );
      })}
    </Box>
  );
};
