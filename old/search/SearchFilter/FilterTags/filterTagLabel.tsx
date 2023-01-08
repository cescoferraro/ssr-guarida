import { capitalizeWordsFirstLetter } from "common/capitalizeWordsFirstLetter";
import { SearchInput } from "typings";

export function filterTagLabel(
  k: keyof SearchInput,
  keyValue?: unknown
): string {
  const keyValueType = typeof keyValue;
  switch (keyValueType) {
    case "string":
      return capitalizeWordsFirstLetter((keyValue || k) as string);
    case "number":
      return `${keyValue} ${String(k).replace("numero", "")}`;
    default:
      return k as string;
  }
}
