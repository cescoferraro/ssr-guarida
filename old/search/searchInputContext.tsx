import React, { createContext, Dispatch, SetStateAction } from "react";
import { SearchInput } from "typings";

type ContextResponse = [
  Partial<SearchInput>,
  Dispatch<SetStateAction<Partial<SearchInput>>>
];
export const SearchInputContext = createContext<ContextResponse>(
  undefined as unknown as ContextResponse
);

export const useSearchInputContext = () => React.useContext(SearchInputContext);
